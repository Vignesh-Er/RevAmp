import express, { Request, Response } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { OpenAI } from 'openai';
import crypto from 'crypto';
import { Lead } from '../../../packages/db-schemas/schemas/lead.schema';
import { strictRateLimiter } from '../middleware/security';

const router = express.Router();

// Multer memory-storage setup with filters
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF resume files are allowed.'));
    }
  }
});

// Configure OpenAI SDK instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

// System Prompt from finalized context facts
const systemPrompt = `You are a senior technical recruiter and ATS (Applicant Tracking System) specialist with 12 years of experience hiring software engineers, data scientists, cybersecurity professionals, digital marketers, and designers at Indian tech companies, startups, and MNCs. Your role is to evaluate submitted resumes against real-world Indian tech hiring standards as of 2026 and produce a structured JSON report that helps candidates understand their exact employability gaps and the specific skill improvements that will fix them.
You will receive a resume in plain text format. You must evaluate it against exactly 14 validation checks and produce a JSON response that matches the schema below precisely. Do not include any text outside the JSON object. Do not include markdown code fences. Return only the raw JSON.
OUTPUT SCHEMA:
{
"status": "success",
"data": {
"candidate": "string",
"resumeScore": 85,
"grade": "B",
"summary": "string under 80 words",
"analysis": {
"checksPassed": 10,
"checksFailed": 4,
"failedFeedback": ["string"]
},
"skillsGap": ["string"],
"recommendedAction": {
"courseId": "string",
"courseTitle": "string",
"matchRelevance": "string",
"reason": "string",
"ctaUrl": "string"
}
}
}
THE 14 VALIDATION CHECKS (evaluate each one and include failed checks in failedFeedback):
Check 1 — Contact Completeness: Verify presence of full name, email address, phone number, and at least one professional link (LinkedIn URL, GitHub URL, or portfolio URL). Fail if any of these are missing.
Check 2 — Quantified Achievements: Verify that at least 40% of bullet points under work experience or project sections contain a measurable metric (numbers, percentages, timeframes, scale indicators). Fail if fewer than 40% are quantified.
Check 3 — Action Verb Opening: Verify that bullet points begin with strong past-tense action verbs. Fail if more than 30% of bullets begin with weak openers ('Responsible for', 'Worked on', 'Helped with', 'Assisted in').
Check 4 — Section Structure: Verify presence of these essential sections: Education, Experience or Projects, Skills, and at minimum one of: Certifications, Achievements, or Extracurriculars. Fail if two or more sections are absent.
Check 5 — Skills Keyword Density: Verify that the resume contains at least 6 of the top 10 required skills for that role in the Indian 2026 job market. Fail if fewer than 6 are present.
Check 6 — ATS-Hostile Formatting Signals: Detect signals that indicate the resume was formatted in a way that ATS systems cannot parse: presence of tables, text boxes, headers and footers, and image-based content. Fail if any ATS-hostile formatting is detected.
Check 7 — Resume Length Appropriateness: Under 2 years: 1 page (400-600 words). 2-5 years: 1-2 pages (600-1000 words). 5+ years: 2 pages max (up to 1400 words). Fail if over.
Check 8 — Date Format Consistency: Verify date formatting is consistent throughout. Fail if multiple incompatible formats are mixed.
Check 9 — Gap Handling: Fail if unexplained gaps > 6 months are detected.
Check 10 — Skills Depth: Fail if more than 25 ungrouped technologies are listed with no proficiency markers.
Check 11 — Portfolio: Fail if no GitHub, Kaggle, Behance, or Dribbble URL is present.
Check 12 — Grammar and Quality: Fail if > 5 capitalization, tense mixing, or pronoun errors are found.
Check 13 — Continuing Education: Fail if no upskilling signal from the past 24 months is present.
Check 14 — Summary Quality: Fail if summary is absent or contains generic fluff.
TONE: Direct, encouraging, and professional. Mention actual content from the resume. Never hallucinate.`;

// Apply Strict Rate Limiting (5 requests per hour)
router.post('/', strictRateLimiter, upload.single('resume'), async (req: Request, res: Response) => {
  try {
    let resumeText = '';
    const targetRole = (req.body.targetRole as string) || 'web_development';

    // 1. Ingestion check
    if (req.file) {
      // PDF Processing
      const parsedData = await pdfParse(req.file.buffer);
      resumeText = parsedData.text;
    } else if (req.body.resumeText) {
      // Plain text fallback
      resumeText = req.body.resumeText;
    } else {
      return res.status(400).json({ status: 'error', message: 'No file uploaded or resume text provided.' });
    }

    // 2. Edge Case: Empty file check
    if (!resumeText.trim()) {
      return res.status(400).json({ status: 'error', message: 'The uploaded file appears to be blank.' });
    }

    // 3. Sanitization & Truncation (8,000 character limit)
    resumeText = resumeText.replace(/\s+/g, ' ').trim();
    if (resumeText.length > 8000) {
      resumeText = resumeText.substring(0, 8000);
    }

    // 4. Construct user prompt template
    const userPrompt = `Please analyze the following resume and provide your evaluation in the exact JSON format specified in your instructions. Do not include any text outside the JSON object.
Target role context: ${targetRole}
Resume content:
${resumeText}
Execute all 14 validation checks. Calculate the resume score based on checks passed. Return only the JSON.`;

    // 5. Query OpenAI completion
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Cost-effective 2026 enterprise standard
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.1, // Rigid structure adherence
      response_format: { type: "json_object" }
    });

    let rawJson = response.choices[0].message.content || '{}';

    // Clean JSON response (strip markdown fences if LLM added them)
    rawJson = rawJson.replace(/```json/gi, '').replace(/```/g, '').trim();
    const resultObj = JSON.parse(rawJson);

    // 6. DB Lead Logging (Ingests whatever metadata is parsed from resume)
    const newLead = new Lead({
      name: resultObj.data.candidate || 'Anonymous Candidate',
      email: `${targetRole}_lead_${crypto.randomBytes(3).toString('hex')}@digimationflight.com`, // Placeholders until formal conversion flow
      phone: '',
      resumeScore: resultObj.data.resumeScore,
      grade: resultObj.data.grade,
      primarySkillGap: resultObj.data.skillsGap,
      recommendedCourse: resultObj.data.recommendedAction.courseTitle,
      leadStage: 'new'
    });

    await newLead.save();

    return res.status(200).json(resultObj);

  } catch (error: any) {
    console.error('API Resume Analyzer Route Error:', error);
    
    // Check for API timeout/overloaded limits
    if (error.status === 429) {
      return res.status(429).json({ status: 'error', message: 'OpenAI API capacity limits reached. Please retry in a few moments.' });
    }

    return res.status(500).json({ status: 'error', message: 'Internal Server error while analyzing the document.' });
  }
});

export default router;
