# HACKATHON ELEVATED SPRINT — TODAY'S ACTION LIST
**File Identifier:** `TODAY_ACTION_LIST.md`

*   **Hackathon Deadline:** May 31, 2026 (TODAY)
*   **Mission Goal:** Complete the Digimation Flight 2.0 digital ecosystem and submit final assets to the Unstop platform.
*   **Operational Directives:** Execute these tasks sequentially to ensure immediate deployment readiness.

---

## 1. Visual & Frontend Engineering (Next.js & Tailwind)
- `[ ]` **Implement Bento Grid Layout:** Construct the grid modules in `apps/web-marketing/app/page.tsx` utilizing Tailwind `grid-cols-12` syntax.
- `[ ]` **Enforce WCAG 2.1 Contrast Pairs:** Audit colors to ensure absolutely no Yellowish Gold (`#FCC509`) text appears on Rose White (`#FFF9FA`) backgrounds. Ensure all body copy pairs Charcoal Black (`#17171D`) on light backgrounds.
- `[ ]` **Inject Framer Motion Animations:** Apply transition values to components in `packages/ui-shared/src/components/HeroBento.tsx` for low-latency entrance states.
- `[ ]` **Render Structured Metadata:** Insert `<CourseSchema />` components into Next.js catalogs to output schema.org JSON-LD scripts for SEO indexing.

## 2. Core Backend & AI Parser Integration (Express & Node.js)
- `[ ]` **Create Resume Upload Endpoint:** Deploy route `/api/analyze` in `services/express-api/routes/analyzer.js` configured with `multer` to accept in-memory buffers.
- `[ ]` **Integrate `pdf-parse` Buffer Handling:** Parse incoming PDF streams into clean string structures, truncating inputs to 6,000 characters to prevent context overflow.
- `[ ]` **Deploy the 14-Check OpenAI Wrapper:** Write the ChatCompletion call using the detailed system prompt, low temperature (0.1), and structured JSON output mode.
- `[ ]` **Define Dynamic Course Mapping:** Create MongoDB aggregation rules to map missing technical nodes directly to course catalog routes.

## 3. Data Gating & DPDP Act 2023 Setup
- `[ ]` **Inject the `DPDPProvider` Context:** Wrap Next.js and React SPA root layouts with the context wrapper in `packages/ui-shared/src/components/DPDPProvider.tsx`.
- `[ ]` **Implement CookieYes CMP script:** Embed CookieYes blocking headers, configuring the script to intercept GA4, Microsoft Clarity, and Facebook pixel initializations.
- `[ ]` **Verify the Under-18 Minor Gate:** Test child privacy gate switches to confirm that outbound automated profiling and WhatsApp tracking are completely disabled for minors under DPDPA Section 9.
- `[ ]` **Log verifications to Audit Logs:** Connect backend logs to MongoDB Schema `ConsentLog` to capture encrypted SHA-256 client choices.

## 4. B2B & Conversational Pipeline (HubSpot & Brevo)
- `[ ]` **Connect Lead Capture Form:** Embed React `<B2BForm />` in B2B landing pages and test direct submissions to `/api/b2b/inquiry`.
- `[ ]` **Configure HubSpot tracking context:** Inject tracking scripts into form submit events to capture Microsoft Clarity session recording URLs on HubSpot timelines.
- `[ ]` **Establish Brevo WhatsApp Webhook:** Mount Route `/api/trigger-whatsapp` in the Express backend, verifying that standard HubSpot contact property updates correctly dispatch Brevo templates to verified phone numbers.

## 5. QA, Benchmarking & Unstop Submission
- `[ ]` **Audit Web Performance:** Run Lighthouse audits to confirm Largest Contentful Paint (LCP) is under 1.5 seconds and Cumulative Layout Shift (CLS) is under 0.05.
- `[ ]` **Execute Security Audits:** Run scans to verify Express API routes configure Helmet security headers, CORS domain limits, and Express-rate-limiting (100 requests per 15 mins).
- `[ ]` **Prepare Presentation Slides:** Populate pitch templates with the 10-slide outline compiled in the hackathon submission assets deck.
- `[ ]` **Record 3-Minute Demo Video:** Narrate the visual demo utilizing the demo video script storyboard.
- `[ ]` **Submit Final Concept on Unstop:** Compress the final submission, link the GitHub monorepo repository, upload the pitch deck and video URL, and complete the final RevampX Challenge submission form!
