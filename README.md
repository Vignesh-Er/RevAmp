# 🛸 DIGIMATION FLIGHT 2.0
> **The Next-Gen Digital Upskilling Ecosystem & Candidate Placement Pipeline**
> 
> *RevampX Challenge 2026 Production-Grade Submission*

---

[![Turborepo Workspace](https://img.shields.io/badge/Monorepo-Turborepo-0070F3?style=for-the-badge&logo=turborepo)](https://turbo.build/)
[![Next.js 14](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Express.js 4](https://img.shields.io/badge/Backend-Express.js%204-17171D?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict%20Mode-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 3](https://img.shields.io/badge/Styling-Tailwind%20CSS%203-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![WCAG 2.1 AAA Compliant](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AAA-greeen?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![DPDP Act Compliant](https://img.shields.io/badge/Data_Privacy-DPDP%202023-orange?style=for-the-badge)](https://www.meity.gov.in/content/digital-personal-data-protection-act-2023)

---

## 📖 1. The Digimation Flight Mission

Founded in **August 2024** in the state of Uttar Pradesh (*CIN: U62011UP2024PTC208021*), **Digimation Flight Private Limited** was born out of a single conviction: **that the gap between what colleges teach and what companies hire for is solvable — and solvable fast.** 

We are young by design. Built by people who have lived the frustration of graduating talented and landing underemployed. Our programs in AI, Data Science, Web Development, Cybersecurity, Digital Marketing, and Graphic Design are not academic — they are built from live job descriptions, shaped by working industry professionals, and measured by one metric: **placement.**

> *"No fluff. No filler. Just skills."*

In less than two years, we have enrolled **over 500 students**, partnered with **20-plus hiring organizations**, and built an inside sales and counseling team that treats every lead like a future colleague. **This is just the beginning.**

---

## 🎨 2. Visual Identity & Design Systems

Our digital interface represents **Glassmorphism 2.0** — an immersive, modern aesthetics language designed for premium first impressions, responsiveness, and interaction.

### Harmonious HSL Theme Palette
Our brand colors are absolute and configured via structured tokens:
*   🟡 **Brand Gold (`#FCC509`):** Used strictly for highlights, badges, borders, icons, and primary action buttons.
*   🌸 **Rose White (`#FFF9FA`):** Our signature body backdrop base color.
*   ⚫ **Charcoal (`#17171D`):** Our deep, primary high-contrast text color.
*   🧼 **Surface Layers:** Light Pink-White (`#FFF4F5` / `#FFEEF0`) and Dark Surface overlays (`#1E1E25`).

> [!IMPORTANT]
> **Contrast Guard:** Under WCAG 2.1 AAA accessibility rules, Brand Gold (`#FCC509`) is **never** used as text color on light backgrounds. It is strictly reserved as an accent border or on top of Charcoal text.

### GPU Hardware-Accelerated Glass Tiles
To deliver standard-setting fluid animations without performance overhead, all visual containers utilize custom hardware-accelerated GPU classes (`glass-tile-light` / `glass-tile-dark`):
*   `.glass-course`: Backdrops painted at `rgba(255, 249, 250, 0.72)` with a `16px` saturation backdrop blur.
*   `.glass-stats`: Dark variants painted at `rgba(23, 23, 29, 0.92)` with high-contrast golden trims.
*   `.glass-testimonial`: Light elevated panels at `rgba(255, 249, 250, 0.85)` with a `20px` saturate-200 blur.

---

## 🚀 3. Features & Interactive Pipelines

### 🧠 A. AI Resume Analyzer (The Demo Centerpiece)
An advanced, state-of-the-art interactive recruiter portal that grades resumes in real-time. It features **4 dynamic client-side rendering states**:
1.  **Idle State:** Interactive file-drop (PDF validation only) and textarea paste fallbacks.
2.  **Loading State:** Alternating green/gray checkmarks sequentially ticking through **exactly 14 recruiter compliance checks** with an animated loading progress bar.
3.  **Results Scoreboard:** 
    *   Animate-in circular grade badges (A, B, C, D, F) with counter scoring.
    *   A clean grid separating passed tests from failed gap feedbacks.
    *   Flex-wrap tags outlining extracted technical skills deficiencies.
    *   A premium recommended course box dynamically matched to the target profile.
4.  **Error State:** Graceful fallback recovery handlers.

### 🏢 B. B2B Institutional Integrations
A separate dedicated portal layout (`/b2b-institutions`) designed for Training and Placement Officers (TPOs) and deans.
*   **7 Partnership Models:** Displays capped cards for White-Labeling, Placement Readiness, Semester Integration, and Internship management.
*   **3-Step Secure Inquiry Form:** A multi-step structured intake drawer (validating details, academic designations, and state parameters) that submits leads to our Express CRM pipeline.

### 🔒 C. Express API Security & Compliance Core
*   **Secure Helmet Headers & CORS:** Active cross-origin restrictions limiting endpoints to authorized domains under DPDPA corporate boundaries.
*   **Rate Limiters:** Global rate limiting (100 req/15min) paired with strict limits (5 req/hr) on AI and Contact endpoints to block DDoS attempts.
*   **DPDP 2023 Hashed Consent Auditing:** Captures user consent preferences (essential, analytical, marketing) along with SHA-256 encrypted client IP hashes for DPDPA auditing logs.
*   **Dual CRM Integrations:** Automatically synchronizes inquiries with **HubSpot CRM** contact endpoints and triggers branded confirmation notifications via **Brevo SMTP**.

---

## 📂 4. Monorepo Structural Directory Map

```text
├── apps/
│   └── web-marketing/              # Next.js 14 Public B2C & B2B Web Portal
│       ├── app/                    # Next.js App Router (Globals, Layouts, Pages)
│       ├── tailwind.config.ts      # HSL Color Tokens & Custom Type Scales
│       ├── postcss.config.js       # PostCSS Tailwind preprocessing layers
│       ├── vercel.json             # Workspace-specific Vercel Deployment config
│       └── tsconfig.json           # Compiler mappings for Next.js
│
├── packages/
│   ├── db-schemas/                 # Mongoose models & Zod schemas (workspace)
│   ├── ui-shared/                  # Design System UI Component Library
│   │   ├── animations/             # Framer Motion staggering & ease variants
│   │   └── components/             # Reusable cards, Navbar, MobileNav, and Modals
│   └── ts-config/                  # Shared base typescript compilers
│
├── services/
│   └── express-api/                # Decoupled Express.js Security API Backend
│       ├── middleware/             # Rate limiters & Helmet security configs
│       ├── routes/                 # Handlers (Analyze, Contact, Consent, Lead)
│       ├── scripts/                # Database seeders (SkillsReference indexing)
│       ├── server.ts               # Core Server bootstrap & Database connection
│       └── tsconfig.json           # Compiler rules for TypeScript
│
├── turbo.json                      # Monorepo task cache configurations
└── package.json                    # Workspace link roots & dev scripts
```

---

## ⚡ 5. Setup & Local Launch Guide

### Prerequisites
*   Node.js >= `18.0.0`
*   MongoDB Atlas cluster (or a running local MongoDB instance)

### 1. Clone & Bootstrap Dependencies
```bash
# Clone the repository
git clone https://github.com/Vignesh-Er/RevAmp.git
cd RevAmp

# Install and link workspaces
npm install
```

### 2. Configure Environment Keys
Create a `.env` file in the root directory (based on `.env.example`):
```env
# Express Backend config
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...  # (Optional: Backend will warning-fallback offline)
OPENAI_API_KEY=sk-proj-...     # Required for AI Resume Analyzer LLM completions
ALLOWED_ORIGINS=http://localhost:3000

# Next.js Frontend config
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GA4_ID=G-TEST
NEXT_PUBLIC_CLARITY_ID=test
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_COOKIEYES_ID=test
```

### 3. Seed Database Skills
```bash
# Run seeder in the express workspace (wipes & creates fresh skills references)
npm run seed --workspace=express-api
```

### 4. Boot Dev Servers Concurrently
```bash
# Starts Next.js (port 3000) and Express (port 5000) concurrently via Turborepo
npm run dev
```

---

## 🏆 6. Quality-Control Verification Checks

Before making a push or submitting, you can run these verification scripts to guarantee 100% production readiness:

*   **TypeScript Compilation Sweep:**
    ```bash
    # Verify frontend TS types
    cd apps/web-marketing && npx tsc --noEmit
    
    # Verify backend TS types
    cd ../../services/express-api && npx tsc --noEmit
    ```
*   **Next.js Production Compilation:**
    ```bash
    # Compiles and static-prerenders sitemaps, layouts, and routing
    cd apps/web-marketing && npx next build
    ```
*   **Import Resolution Audit:**
    ```bash
    # Confirms all package imports map correctly via workspace bindings
    grep -r "from '@packages" apps/ packages/
    ```

---

## 🤝 7. The Core Submission Team
Built with dedication for the **RevampX Challenge 2026**. 

*“Bridging the gap between what you study and what you earn. One placement at a time.”*
