# DIGIMATION FLIGHT 2.0 — MONOREPO MASTER INTEGRATION GUIDE
**File Identifier:** `SYNTHESIS_IMPLEMENTATION_GUIDE.md`

Welcome to the full-stack, production-ready monorepo codebase for the **Digimation Flight 2.0 Web Redesign** (developed for the **RevampX Challenge 2026**). This unified ecosystem completely resolves the live website's trust deficit, establishes the spatial UI design framework, integrates the GenAI Resume Analyzer, configures DPDP Act compliance data gates, and mounts B2B college partnership routes.

---

## 1. Monorepo Structural Index

The monorepo workspace follows this layout configuration:

```text
digimation-flight-monorepo/
├── apps/
│   └── web-marketing/              (Next.js App Router — Public Marketing & Catalogs)
│       ├── app/
│       │   ├── layout.tsx          (Google Font variables, metadata, sitemap script)
│       │   ├── page.tsx            (Server page aggregating Bento & Courses Grid)
│       │   ├── b2b-institutions/   (Academic Partner Landing page & Lead forms)
│       │   ├── sitemap.ts          (Auto SEO XML generator)
│       │   ├── robots.ts           (Crawler optimization rule provider)
│       │   └── globals.css         (Tailwind imports, custom Webkit scrollbars)
│       ├── tailwind.config.ts      (Locked brand colors & Syne/Nunito scales)
│       └── next.config.ts          (avif/webp configurations and security headers)
├── packages/
│   ├── ui-shared/                  (All shared React components)
│   │   ├── components/
│   │   │   ├── Navbar.tsx          (Responsive scroll glassmorphic header)
│   │   │   ├── MobileNav.tsx       (Slide-out mobile panel)
│   │   │   ├── HeroSection.tsx     (Locked outcome headings, CTAs & Vector art)
│   │   │   ├── BentoGrid.tsx       (Responsive 12-column Bento layouts)
│   │   │   ├── StatsCounter.tsx    (Cubic ease-out counter animator)
│   │   │   ├── CourseCard.tsx      (Visual tags, durations, and tier frames)
│   │   │   ├── CourseSection.tsx   (AnimatePresence Tab Tier switcher)
│   │   │   ├── TestimonialCard.tsx (Pull quotes, star ratings & outcomes)
│   │   │   ├── TestimonialSection.tsx (Riya Kapoor & Arjun Nair testimonials)
│   │   │   ├── GlassCard.tsx       (Glassmorphism 2.0 backdrop-filters)
│   │   │   ├── CTAButton.tsx       (Pulsing primary, secondary & ghost buttons)
│   │   │   ├── WhatsAppButton.tsx  (Floating WhatsApp chat widget)
│   │   │   ├── ResumeAnalyzer.tsx  (14 checks AI Resume drag-and-drop tool)
│   │   │   ├── PartnershipCard.tsx (B2B model mechanics & outcome cards)
│   │   │   ├── B2BHero.tsx         (B2B Locked header, CTAs & NEP claims)
│   │   │   └── B2BInquiryForm.tsx  (Lead intake form synced to CRM pipelines)
│   │   └── animations/
│   │       └── variants.ts         (Container, item, fade-up & reduced motion hooks)
│   ├── db-schemas/                 (MongoDB models & Zod schemas)
│   │   └── schemas/
│   │       ├── contact.schema.ts   (Contact form fields, source & processed flags)
│   │       ├── lead.schema.ts      (ATS score, skill gaps & recommended courses)
│   │       ├── consent.schema.ts   (DPDP choice logs, userAgent & anonymous IDs)
│   │       └── skillsReference.schema.ts (Skills profiles mapping course JDs)
│   └── ts-config/                  (TypeScript standard bases)
│       ├── base.json
│       ├── nextjs.json
│       └── react-library.json
├── services/
│   └── express-api/                (Express API Node.js/TypeScript backend)
│       ├── middleware/
│       │   └── security.ts         (helmet headers, CORS origins & rate limiters)
│       ├── routes/
│       │   ├── analyze.route.ts    (pdf-parse, OpenAI 14-checks resume router)
│       │   ├── contact.route.ts    (Zod validates, hashes IP, saves & syncs CRM)
│       │   ├── lead.route.ts       (Fetch and update lead stages route)
│       │   └── consent.route.ts    (Hashed IP DPDP auditing routes)
│       ├── server.ts               (Starts Express, mounts endpoints, connects DB)
│       └── Dockerfile              (Multi-stage build compiling TypeScript)
├── .github/workflows/deploy.yml    (GHA Pipeline deploying Vercel + Railway)
├── turbo.json                      (Configures build pipelines & caches)
├── package.json                    (Monorepo workspace scripts mapper)
├── vercel.json                     (Next.js cache settings and Vercel framework)
└── .env.example                    (Consolidated local env variable templates)
```

---

## 2. Dynamic Data & Conversational Workflow Spec

All services align to route student acquisitions efficiently and compliantly under the DPDP Act framework:

1.  **Lead Acquisition:** Users enter the public Next.js domain (`/`) or the institutional portal (`/b2b-institutions`).
2.  **Telemetry Gating:** Scripts (GA4, Microsoft Clarity) are blocked by CookieYes. If the user verifies as under 18, all outbound profiling scripts are programmatically disabled via the frontend context rules.
3.  **GenAI Optimization:** Resumes are parsed by the Express `/api/analyze` controller via `pdf-parse`. An LLM completes the 14 structural, keyword, and numeric assessments, saving results as a CRM-ready Lead payload.
4.  **CRM Integration:** Submission endpoints map leads directly to the HubSpot CRM contact database, recording the applicant's resume score, primary gaps, and recommended course mapping.
5.  **Conversational Action:** HubSpot CRM workflows trigger webhooks dispatched directly to Brevo's verified API, sending outbound personalized WhatsApp notifications with custom pre-filled course recommendations to convert leads.

---

## 3. Local Operational Checklist

To spin up development or compile monorepo builds:

```bash
# 1. Install workspace dependencies
npm install

# 2. Configure consolidated environment parameters
cp .env.example .env

# 3. Boot dev servers concurrently
npm run dev

# 4. Build all workspaces
npm run build
```

This completes the high-fidelity implementation suite for the **Digimation Flight 2.0 Web Redesign**. The monorepo has been structured and written to meet strict technical, compliance, and aesthetic standards.
