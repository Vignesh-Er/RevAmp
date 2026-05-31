# B2B INSTITUTIONAL PARTNERSHIP PORTAL
**File Identifier:** `gap_06_b2b_landing_page.md`

To drive institutional growth alongside B2C enrollment, the redesigned platform establishes a dedicated B2B channel targeting colleges and universities. This portal positions Digimation Flight as a primary partner in addressing compliance, student engagement, and employment metrics under the National Education Policy (NEP 2020) framework.

---

## 1. High-Converting Copy Deck for Academic Buyers
This professional copy deck is structured to address the operational concerns of academic buyers, including Training and Placement Officers (TPOs), Deans, and Vice Chancellors.

### Hero Section Copy
*   **Target Audience Badge:** FOR COLLEGES, UNIVERSITIES, & ACADEMIC COUNCILS
*   **Headline:** Fueling Campus Employability Through Industry-Integrated Education.
*   **Subhead:** Digimation Flight collaborates with forward-thinking academic institutions to deliver NEP 2020-aligned skill courses, white-labeled LMS engines, outsourced placement readiness, and automated internship programs.
*   **Primary CTA Button:** Request Institutional Brochure
*   **Secondary CTA Button:** Schedule an Academic Alignment Call

### Value Proposition Matrix (Bento Grid Layout)
1.  **NEP 2020 Compliance Gaps:** We map our modular certification programs directly to UGC credit transfer standards, ensuring effortless academic integration.
2.  **Immediate Employability Lift:** Outsource placement preparation to industry practitioners. We raise campus placement metrics by up to 34%.
3.  **LMS Infrastructure Support:** Deploy a custom-branded student learning portal without operational overhead.
4.  **Verified Internship pipelines:** Connect final-year candidates with verified startup and SME internship tracks, complete with automated progression audits.

---

## 2. The 7 Institutional Partnership Models Spec
A grid configuration detailing the operational scope, advantages, and target buyers for each B2B alignment channel.

```json
[
  {
    "modelId": "DF-B2B-01",
    "name": "Official Enrollment Channel",
    "mechanics": "Custom-branded cohort landing pages are deployed. Special registration links are distributed via internal college communications.",
    "benefit": "Referral models, joint revenue-sharing, and higher student trust and enrollment velocity.",
    "buyer": "Private & Semi-Autonomous Colleges"
  },
  {
    "modelId": "DF-B2B-02",
    "name": "Semester-Based Skill Programs",
    "mechanics": "Structured 8-to-16-week courses are run concurrently with academic semesters, incorporating live weekend expert sessions.",
    "benefit": "Value-added skill certifications that fit seamlessly into current class schedules.",
    "buyer": "Academic Deans & Curriculum Directors"
  },
  {
    "modelId": "DF-B2B-03",
    "name": "White-Label College-Branded Programs",
    "mechanics": "Course curriculum, LMS instances, and active trainers are deployed under the college's name.",
    "benefit": "Complete institutional ownership of branding with zero tech stack setup overhead.",
    "buyer": "Colleges Seeking Long-Term Contract Control"
  },
  {
    "modelId": "DF-B2B-04",
    "name": "Placement Readiness as a Service",
    "mechanics": "Outsourced bootcamps covering aptitude tests, business communication, resume profiling, and mock technical interviews.",
    "benefit": "Immediate and measurable lift in college employment statistics.",
    "buyer": "Training & Placement Officers (TPOs)"
  },
  {
    "modelId": "DF-B2B-05",
    "name": "Internship Aggregation & Management",
    "mechanics": "A pipeline of vetted startups and SMEs are sourced. Student onboarding, timesheets, and completion tracking are automated.",
    "benefit": "Streamlined compliance audits and verified internship credentials.",
    "buyer": "College Internship Committees"
  },
  {
    "modelId": "DF-B2B-06",
    "name": "Co-Certified / Credit-Linked Programs",
    "mechanics": "Curriculums are co-created with industry leaders and mapped directly to internal college credit allocation schemes.",
    "benefit": "Official credit transfers linked to certified industry readiness.",
    "buyer": "Vice Chancellors & Academic Councils"
  },
  {
    "modelId": "DF-B2B-07",
    "name": "Industry Projects & Capstone Programs",
    "mechanics": "Final-year students execute actual business challenges under joint evaluation by faculty and Digimation Flight engineers.",
    "benefit": "Superb addition to student portfolios and graduation project evaluation metrics.",
    "buyer": "Department Heads & Faculty Mentors"
  }
]
```

---

## 3. Technical Lead Capture & CRM Pipeline Integration
To ensure no institutional inquiries are lost, the lead capture form connects directly to HubSpot CRM. The interface utilizes a glassmorphic design that dynamically loads CRM tracking headers after consent is granted.

```tsx
// apps/web-marketing/app/b2b-institutions/components/B2BForm.tsx
'use client';
import React, { useState } from 'react';

export default function B2BForm() {
  const [formData, setFormData] = useState({
    collegeName: '',
    buyerRole: 'TPO',
    contactPerson: '',
    email: '',
    phone: '',
    studentStrength: '500-1000',
    preferredModel: 'DF-B2B-04'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // 1. Submit lead details to our Express API
      const response = await fetch('/api/b2b/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Network error');

      // 2. Trigger HubSpot tracking context if cookie consent was given
      if (window['_hsq']) {
        window['_hsq'].push(['identify', {
          email: formData.email,
          company: formData.collegeName,
          firstname: formData.contactPerson
        }]);
        window['_hsq'].push(['trackPageView']);
      }

      setStatus('success');
    } catch (err) {
      console.error('B2B Form Submit Error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="glass-tile-light p-8 max-w-xl mx-auto my-12">
      <h3 className="font-outfit font-bold text-2xl text-[#17171D] mb-4">Partner with Digimation Flight</h3>
      <p className="font-inter text-[#17171D] mb-6 text-sm">Align your institution with modern industry standards. Our deans will contact you within 24 hours.</p>
      
      {status === 'success' ? (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
          <strong>Thank you for contacting us!</strong> Academic alignment representatives have received your request and are preparing a custom proposal.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[#17171D] mb-1">Institution Name</label>
            <input type="text" required className="w-full p-3 rounded-lg border border-gray-200 focus:outline-[#FCC509]" value={formData.collegeName} onChange={e => setFormData({...formData, collegeName: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#17171D] mb-1">Your Role</label>
              <select className="w-full p-3 rounded-lg border border-gray-200 focus:outline-[#FCC509]" value={formData.buyerRole} onChange={e => setFormData({...formData, buyerRole: e.target.value})}>
                <option value="TPO">Training & Placement Officer</option>
                <option value="Dean">Dean / Director</option>
                <option value="ViceChancellor">Vice Chancellor</option>
                <option value="Faculty">Faculty Coordinator</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-[#17171D] mb-1">Preferred Model</label>
              <select className="w-full p-3 rounded-lg border border-gray-200 focus:outline-[#FCC509]" value={formData.preferredModel} onChange={e => setFormData({...formData, preferredModel: e.target.value})}>
                <option value="DF-B2B-01">Enrollment Channel</option>
                <option value="DF-B2B-02">Semester Skill Courses</option>
                <option value="DF-B2B-03">White-Labeled LMS</option>
                <option value="DF-B2B-04">Placement Prep</option>
                <option value="DF-B2B-05">Internship Aggregation</option>
                <option value="DF-B2B-06">Credit-Linked Courses</option>
                <option value="DF-B2B-07">Capstone Projects</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-[#17171D] mb-1">Contact Name</label>
            <input type="text" required className="w-full p-3 rounded-lg border border-gray-200 focus:outline-[#FCC509]" value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-[#17171D] mb-1">Institutional Email</label>
            <input type="email" required className="w-full p-3 rounded-lg border border-gray-200 focus:outline-[#FCC509]" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <button type="submit" disabled={status === 'submitting'} className="w-full py-3 bg-[#FCC509] text-[#17171D] font-bold rounded-lg hover:bg-black hover:text-white transition duration-200">
            {status === 'submitting' ? 'Submitting Inquiry...' : 'Submit Partnership Inquiry'}
          </button>
        </form>
      )}
    </div>
  );
}
```
Deploying this portal allows Digimation Flight to scale institutional partnerships.
