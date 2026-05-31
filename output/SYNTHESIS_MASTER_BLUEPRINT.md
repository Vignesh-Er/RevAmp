# SYNTHESIS MASTER BLUEPRINT — DIGIMATION FLIGHT WEBSITE REDESIGN
**File Identifier:** `SYNTHESIS_MASTER_BLUEPRINT.md`

This Master Blueprint synthesizes the strategic, technical, and compliance deliverables created during the production sprint for the RevampX Challenge 2026 website redesign. Designed to satisfy enterprise development standards, the new architecture transitions Digimation Flight from its current digital state into a high-performance, legally defensible, and conversion-optimized education hub.

---

## 1. System Integration Flow (The Unified Architecture)
This visual schema illustrates how data moves from user acquisition, through AI analysis and compliance checkpoints, to CRM capture and conversions.

```text
                                USER VISITS WEBSITE
                                         │
                                         ▼
                     ┌──────────────────────────────────────┐
                     │     CookieYes CMP Consent Banner     │
                     └──────────────────────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼ (Consent Granted)                             ▼ (Consent Denied / Minor Gate)
     ┌──────────────────────┐                        ┌──────────────────────┐
     │  Enable GA4, Clarity │                        │   Disable Telemetry  │
     │   Telemetry Scripts  │                        │  Block Tracking Pixels│
     └──────────────────────┘                        └──────────────────────┘
                 │                                               │
                 └───────────────────────┬───────────────────────┘
                                         │
                                         ▼
                     ┌──────────────────────────────────────┐
                     │   AI Resume & Skills Gap Analyzer    │
                     │  - parsed text buffer (pdf-parse)    │
                     │  - OpenAI API evaluating 14 JDs      │
                     └──────────────────────────────────────┘
                                         │
                                         ▼
                     ┌──────────────────────────────────────┐
                     │         JSON Output Payload          │
                     │ - Displays ATS Grade (A-F), missing  │
                     │   skills, and recommended courses    │
                     └──────────────────────────────────────┘
                                         │
                                         ▼
                     ┌──────────────────────────────────────┐
                     │    HubSpot CRM Contact Sync API      │
                     │ - Auto-syncs Clarity session link    │
                     │ - Triggers Brevo WhatsApp webhook    │
                     └──────────────────────────────────────┘
                                         │
                                         ▼
                     ┌──────────────────────────────────────┐
                     │  Inside Sales Counseling Outreach    │
                     │ - Qualifies leads & coordinates CRM  │
                     │ - Direct course enrollment conversion │
                     └──────────────────────────────────────┘
```

---

## 2. Directory Structure of Deliverables
All generated assets are organized inside the `./output` folder of the monorepo:

*   **[gap_01_trust_social_proof.md](file:///e:/Hackathon/RevAmp/output/gap_01_trust_social_proof.md):** Replaces "0+ empty counters" with realistic, cohort-based metrics. Contains high-fidelity success profiles (Riya Kapoor & Arjun Nair) and corporate partner integrations.
*   **[gap_02_website_copy_FULL.md](file:///e:/Hackathon/RevAmp/output/gap_02_website_copy_FULL.md):** Complete copy deck for the public marketing pages, B2C courses (6 domains), two learning tiers, and trust anchors.
*   **[gap_03_visual_design_system.md](file:///e:/Hackathon/RevAmp/output/gap_03_visual_design_system.md):** Spatial UI style guide. Details Bento Grid rules, CSS backdrop-filters, brand color pairing contrast audits, typography, and Framer Motion micro-interactions.
*   **[gap_04_ai_analyzer_llm_engineering.md](file:///e:/Hackathon/RevAmp/output/gap_04_ai_analyzer_llm_engineering.md):** Technical specification for the GenAI lead magnet, defining 14 programmatic validation checks, the LLM system prompt, and Express.js backend parsing endpoints.
*   **[gap_05_performance_engineering.md](file:///e:/Hackathon/RevAmp/output/gap_05_performance_engineering.md):** Web performance configurations (LCP < 1.5s, CLS < 0.05). Contains Next.js SSR rules, Vite SPA code splitting configs, and full React Context provider code for DPDPA 2023 consent gating.
*   **[gap_06_b2b_landing_page.md](file:///e:/Hackathon/RevAmp/output/gap_06_b2b_landing_page.md):** Visual layout and copy deck for B2B institutional partnerships (7 models), containing production-grade React lead capture forms connected to HubSpot tracking API.
*   **[gap_07_hackathon_submission_assets.md](file:///e:/Hackathon/RevAmp/output/gap_07_hackathon_submission_assets.md):** Compilation of slides, pitch deck outlines, and deployment guides required for the final Unstop Unboxing review.
*   **[gap_08_mobile_whatsapp_spec.md](file:///e:/Hackathon/RevAmp/output/gap_08_mobile_whatsapp_spec.md):** Viewport parameters, media queries, and webhook specifications for automated WhatsApp outreach (HubSpot to Brevo) filtering out minors.

---

## 3. Today's Action Timeline (Hackathon Deadline Alignment)
*Target Milestone: Final Unstop submission window closing May 31, 2026.*

*   **09:00 - 11:00 AM (Visual Alignment):** Implement the Bento Grid visual system in Next.js `page.tsx` and enforce strict WCAG 2.1 color rules (Zero Gold-on-White text pairings).
*   **11:00 AM - 01:00 PM (Core Engineering):** Deploy Next.js marketing page layouts and Vite dashboard portal manual chunk splitting rules. Ensure all routes configure static indexing schema structure.
*   **01:00 - 03:00 PM (AI Analyzer Integration):** Build backend routes to receive PDF resume buffers via `pdf-parse`. Deploy OpenAI completions wrapper testing the 14 programmatic evaluation checks.
*   **03:00 - 04:30 PM (Compliance & Telemetry Gating):** Inject the `DPDPProvider` into layout wraps. Verify CookieYes CMP blocking headers and validate minor restriction logic for child privacy gates.
*   **04:30 - 06:00 PM (HubSpot & CRM Webhooks):** Bind lead ingestion endpoints to HubSpot contact tracking API. Verify that webhook triggers correctly dispatch WhatsApp outbound messages via Brevo templates.
*   **06:00 PM (Final QA, Review & Unstop Submit):** Run PageSpeed Insights auditing tools (LCP < 1.5s, CLS < 0.05). Compile presentation slides and submit final concept assets on Unstop before the deadline.
