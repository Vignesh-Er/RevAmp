# MOBILE-FIRST RESPONSIVENESS AND WHATSAPP AUTOMATION PIPELINE
**File Identifier:** `gap_08_mobile_whatsapp_spec.md`

Mobile devices drive over 60% of all EdTech web traffic in India, but mobile conversion rates trail desktop by 42%. Bridging this gap requires strict adherence to a mobile-first design system and the deployment of high-engagement conversational channels like WhatsApp. This document compiles these responsive visual rules and conversational automation workflows.

---

## 1. Mobile-First Responsive Design Specification
To eliminate cumulative layout shifts (CLS) and ensure a fluid user experience across diverse mobile viewports, the platform implements a strict fluid grid system.

### Viewport Layout Guidelines
*   **Touch Targets:** All buttons, form elements, and interactive Bento Grid borders maintain a minimum clickable area of **48px x 48px** to comply with WCAG 2.1 touch guidelines.
*   **Dynamic Typography Scaling:** Typography utilizes CSS `clamp()` functions to prevent hard scaling and text wrapping breaks.
*   **Media Query Schema:**
    *   *Mobile Portrait:* `< 640px` (All Bento Tiles reflow into a single column, width `100%`).
    *   *Mobile Landscape / Tablet:* `640px - 1024px` (Grid tiles scale to 2-columns; side menus collapse into responsive slide-out trays).
    *   *Desktop:* `> 1024px` (Full 12-column Bento Grid activation).

### Responsive CSS Framework Implementation
```css
/* Responsive mobile-first base settings */
img, video {
  max-width: 100%;
  height: auto;
}

/* Touch-friendly target layout */
.interactive-action {
  min-height: 48px;
  min-width: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
}

/* Dynamic Font Clamps */
.text-responsive-heading {
  font-size: clamp(1.75rem, 4vw, 3rem);
}

.text-responsive-body {
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
}
```

---

## 2. Automated WhatsApp Conversational Pipeline
Email outreach suffers from low open rates (typically < 15%) among Indian students. WhatsApp campaigns consistently deliver **98% open rates** and **45%+ response rates**.

```text
┌────────────────────────┐       ┌───────────────────────────┐       ┌────────────────────────┐
│  AI Analyzer Lead Form │ ────> │ Express Backend Processes │ ────> │ Sync Contact to HubSpot│
│  (Student Details)     │       │ Resume PDF & Grades       │       │ Timeline via Contacts  │
└────────────────────────┘       └───────────────────────────┘       └────────────────────────┘
                                                                                  │
                                                                                  ▼
┌────────────────────────┐       ┌───────────────────────────┐       ┌────────────────────────┐
│ Target Enrolment       │ <──── │ Brevo WhatsApp API        │ <──── │ Webhook Triggered by   │
│ Outbound Call (Inside) │       │ Sends Personalized PDF    │       │ HubSpot Workflow Rules │
└────────────────────────┘       └───────────────────────────┘       └────────────────────────┘
```

### Technical Webhook Payload Specification (HubSpot to Brevo Webhook)
When a student registers or uploads a resume, a webhook is fired to Brevo to trigger a personalized WhatsApp message.

*   **Trigger Event:** HubSpot Contact Property Update (`resume_score` updated, `age_gate` not minor).
*   **Brevo API Endpoint:** `https://api.brevo.com/v3/whatsapp/sendMessage`
*   **Method:** `POST`

#### Webhook Header Parameters
```json
{
  "api-key": "xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "Content-Type": "application/json"
}
```

#### JSON Request Payload (Brevo Template Integration)
```json
{
  "senderNumber": "919876543210",
  "templateId": 104,
  "recipient": {
    "phone": "919988776655"
  },
  "params": {
    "STUDENT_NAME": "Arjun Nair",
    "RESUME_SCORE": "72%",
    "RESUME_GRADE": "B",
    "RECOMMENDED_COURSE": "Advanced Master Program in Web Development",
    "GAP_REASON": "cloud deployment and containerization technologies (Docker, AWS)",
    "DASHBOARD_URL": "https://www.digimationflight.com/courses/web-development"
  }
}
```

---

## 3. Production WhatsApp Router Controller (Express.js Middleware)
This backend middleware filters out minors and triggers WhatsApp notifications when a student completes their profile analysis.

```javascript
// services/express-api/routes/whatsappRouter.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/trigger-whatsapp', async (req, res) => {
  const { studentName, phone, score, grade, recommendedCourse, isMinor } = req.body;

  // 1. Strict DPDP Compliance Gate: Block outbound telemetry/automation directed at minors
  if (isMinor) {
    return res.status(200).json({ 
      status: 'ignored', 
      message: 'Outbound automated profiling and WhatsApp tracking restricted for users verified as minors under DPDPA Section 9.' 
    });
  }

  // 2. Format Phone Number (India Prefix Enforcement)
  let formattedPhone = phone.replace(/[^0-9]/g, '');
  if (formattedPhone.length === 10) {
    formattedPhone = `91${formattedPhone}`;
  }

  try {
    // 3. Dispatch payload to Brevo WhatsApp API Gateway
    const response = await axios.post('https://api.brevo.com/v3/whatsapp/sendMessage', {
      senderNumber: process.env.BREVO_WHATSAPP_SENDER,
      templateId: 104,
      recipient: {
        phone: formattedPhone
      },
      params: {
        STUDENT_NAME: studentName,
        RESUME_SCORE: `${score}%`,
        RESUME_GRADE: grade,
        RECOMMENDED_COURSE: recommendedCourse
      }
    }, {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({ status: 'success', messageId: response.data.messageId });

  } catch (error) {
    console.error('WhatsApp API Webhook Error:', error.response?.data || error.message);
    return res.status(500).json({ status: 'error', message: 'Failed to dispatch outbound WhatsApp campaign notification.' });
  }
});

module.exports = router;
```
This automated flow bridges the mobile transition deficit and drives direct user action.
