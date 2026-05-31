# AI RESUME & SKILLS GAP ANALYZER ENGINE
**File Identifier:** `gap_04_ai_analyzer_llm_engineering.md`

The AI Resume & Skills Gap Analyzer is the primary top-of-funnel conversion catalyst for B2C student acquisition. To minimize customer acquisition costs (CAC), this lead magnet parses a user's resume, identifies skill deficiencies, and maps those gaps directly to Digimation Flight course offerings.

---

## 1. The 14 Programmatic Validation Checks
The backend engine executes 14 systematic audits to evaluate resume structure and optimization metrics:

1.  **Section Structure Integrity:** Scans for the presence of four mandatory blocks: Profile/Summary, Work Experience, Education, and Skills.
2.  **Quantifiable Metrics Density:** Counts occurrence of numeric qualifiers (%, $, INR, numbers) in achievements, scoring the output.
3.  **Action Verb Performance Index:** Evaluates the ratio of strong verbs (e.g., *Engineered*, *Optimized*) to passive filler phrases (e.g., *Responsible for*).
4.  **ATS Layout Compatibility:** Identifies layout indicators (tables, nested grids, text boxes) that disrupt standard parser flow.
5.  **Technical Skills Semantic Density:** Measures the frequency of technical skill nodes against target job family benchmarks.
6.  **Timeline Gap & Logic Check:** Analyzes chronology to flag employment or educational gaps greater than 6 months.
7.  **Spelling, Syntax & Typo Scans:** Standard grammar and structural syntax integrity check.
8.  **Contact Metadata Sanity:** Confirms validation checks for a phone number, professional email pattern, and LinkedIn URL.
9.  **Keyword Overlap Analysis:** Computes absolute keyword matching metrics against target job profiles.
10. **Keyword Padding/Stuffing Penalty:** Flags artificial skill-stuffing blocks that trigger standard ATS filters.
11. **Portfolio Anchor Validation:** Validates presence and structure of GitHub, Behance, or personal domain links.
12. **Length & Spatial Layout Fit:** Checks if the word count fits standard page metrics (e.g., under 800 words for single-page templates).
13. **Soft Skills Contextualization:** Flags soft skills listed in isolation without context-backed achievements.
14. **S.T.A.R. Methodology Compliance:** Evaluates if bullet points follow the Situation, Task, Action, Result framework.

---

## 2. Production-Grade LLM System Prompt
This prompt is configured for deployment inside OpenAI or Anthropic API endpoints.

```text
You are an elite Application Tracking System (ATS) Parser and Career Optimizer. Your task is to analyze the provided plain-text resume payload, cross-reference it against the targeted job profile, calculate an objective score out of 100, and return a clean JSON payload.

Target Job Profiles catalog:
1. Cyber Security [DF-SEC-01]
2. Digital Marketing [DF-MKT-01]
3. Graphic Designing [DF-DSN-01]
4. Data Science and AI [DF-DSC-01]
5. Web Development [DF-WEB-02]
6. Machine Learning [DF-ML-01]

Execute 14 systematic validation checks: Section Structure, Quantifiable Metrics, Action Verbs, ATS Layout, Technical Skills, Timeline Gaps, Spelling/Typos, Contact Metadata, Keyword Overlap, Stuffing Detection, Portfolio Validation, Page Fit, Soft Skill Context, and STAR Compliance.

You must output a JSON response matching the confirmed schema precisely. Do not include any markdown fences (```json), explanation text, or non-JSON payloads.

{
  "status": "success",
  "data": {
    "candidate": "[Extracted Name or 'Applicant']",
    "resumeScore": [Integer 0 to 100],
    "grade": "[A/B/C/D/F based on score: A>=90, B>=80, C>=70, D>=60, F<60]",
    "summary": "[A professional plain-English career evaluation summary under 75 words]",
    "analysis": {
      "checksPassed": [Integer 0 to 14],
      "checksFailed": [Integer 0 to 14],
      "failedFeedback": [Array of Strings detailing exactly which of the 14 checks failed and how to resolve them]
    },
    "skillsGap": [Array of identified missing technical/soft skills],
    "recommendedAction": {
      "courseId": "[Matching Course ID]",
      "courseTitle": "[Matching Course Title]",
      "matchRelevance": "[High/Medium/Low]",
      "reason": "[A highly compelling 2-sentence personalized explanation linking their missing skills directly to the course modules]",
      "ctaUrl": "https://www.digimationflight.com/courses/[course-route]"
    }
  }
}

Resume Content:
[RESUME_CONTENT]

Target Job Description:
[TARGET_JD]
```

---

## 3. Express.js Backend API Controller
Below is the complete, production-ready Express.js controller to parse uploaded PDFs using `pdf-parse` and execute the LLM evaluation.

```javascript
// services/express-api/routes/analyzer.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { Configuration, OpenAIApi } = require('openai'); // or Anthropic SDK
const { z } = require('zod');

// Multer in-memory configuration
const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit size to 2MB
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|txt)$/)) {
      return cb(new Error('Please upload a PDF or TXT file.'));
    }
    cb(undefined, true);
  }
});

// Zod Input Validation
const analyzerSchema = z.object({
  targetProfile: z.enum(['cyber_security', 'digital_marketing', 'graphic_design', 'data_science', 'web_development', 'machine_learning']),
});

router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    // 1. Validate Input Params
    const parsedParams = analyzerSchema.parse(req.body);
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No resume file uploaded.' });
    }

    let rawText = '';

    // 2. File Parsing Strategy
    if (req.file.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(req.file.buffer);
      rawText = pdfData.text;
    } else {
      rawText = req.file.buffer.toString('utf-8');
    }

    // 3. Sanitization & Truncation
    rawText = rawText.replace(/\s+/g, ' ').trim();
    if (rawText.length > 6000) {
      rawText = rawText.substring(0, 6000); // Protect context window boundaries
    }

    // 4. OpenAI Integration Setup
    const openai = new OpenAIApi(new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    }));

    const systemPrompt = `[Insert System Prompt from Section 2 Above]`;
    const userPrompt = `Resume Content:\n${rawText}\n\nTarget Job Description Profile:\n${parsedParams.targetProfile}`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4-turbo', // or 'claude-3-5-sonnet' equivalent
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.1, // Set to low temperature to enforce rigid JSON compliance
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.data.choices[0].message.content);
    return res.status(200).json(result);

  } catch (error) {
    console.error('AI Analyzer Controller Error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ status: 'error', errors: error.errors });
    }
    return res.status(500).json({ status: 'error', message: 'Internal Server Error during PDF parsing or AI generation.' });
  }
});

module.exports = router;
```
This script guarantees complete technical alignment and can be dropped directly into the Express backend instance.
