# COPY-PASTE READY COPY DECK (REACT & HTML DEVELOPER SPRINT)
**File Identifier:** `COPY_PASTE_READY_COPY_DECK.md`

This document contains pre-formatted, production-ready React component blocks, structural layouts, and metadata definitions. Frontend developers can copy-paste these segments directly into the Next.js marketing application and Vite LMS dashboards.

---

## 1. SEO Schema & Robots Optimization Blocks

### Automated Robots Configuration
```typescript
// apps/web-marketing/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/portal-dashboard/', '/api/'],
    },
    sitemap: 'https://www.digimationflight.com/sitemap.xml',
  };
}
```

### Course Structured Metadata Component
```tsx
// apps/web-marketing/app/components/CourseSchema.tsx
import React from 'react';

interface CourseSchemaProps {
  name: string;
  description: string;
  courseCode: string;
  price: string;
}

export default function CourseSchema({ name, description, courseCode, price }: CourseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Digimation Flight",
      "url": "https://www.digimationflight.com",
      "sameAs": [
        "https://www.linkedin.com/company/digimation-flight"
      ]
    },
    "educationalLevel": "Advanced",
    "isAccessibleForFree": false,
    "offers": {
      "@type": "Offer",
      "category": "Subscription",
      "price": price,
      "priceCurrency": "INR"
    },
    "courseCode": courseCode
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## 2. Bento Grid Hero Section Component (React + Tailwind)
Strict contrast pairs enforced: All readable typography defaults to `#17171D` on Rose White light elements, while Gold `#FCC509` acts as outline accents and badges.

```tsx
// apps/web-marketing/app/components/HeroBento.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBento() {
  return (
    <section className="min-h-screen bg-[#FFF9FA] text-[#17171D] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Core Value Proposition Card (Span 8) */}
        <motion.div 
          className="md:col-span-8 p-8 md:p-12 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FCC509]/10 text-[#17171D] border border-[#FCC509]/30 uppercase tracking-widest mb-6">
              RevampX 2026 Edition
            </span>
            <h1 className="font-outfit font-extrabold text-4xl md:text-6xl text-[#17171D] leading-tight tracking-tight mb-6">
              Bridging the Gap Between <span className="bg-gradient-to-r from-amber-500 to-[#FCC509] bg-clip-text text-transparent">Academic Theory</span> and Enterprise Readiness.
            </h1>
            <p className="font-inter text-gray-600 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
              Digimation Flight is India’s fast-growing educational technology and skills development platform. We engineer career readiness by pairing industry-led curricula with advanced GenAI tools.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-[#FCC509] text-[#17171D] font-bold rounded-xl hover:bg-[#17171D] hover:text-white transition duration-200 shadow-sm">
              Analyze Your Resume Free
            </button>
            <button className="px-8 py-4 bg-white text-[#17171D] font-bold rounded-xl border border-gray-200 hover:border-gray-400 transition duration-200">
              Explore Course Catalog
            </button>
          </div>
        </motion.div>

        {/* Dynamic Metric Counter Card (Span 4) */}
        <motion.div 
          className="md:col-span-4 p-8 rounded-3xl bg-[#17171D] text-white border border-gray-800 shadow-lg flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <h3 className="font-outfit font-bold text-xl text-white mb-2">Our Placement Engine</h3>
            <p className="font-inter text-gray-400 text-sm mb-6">Verified career transitions over our 21-month operational timeframe.</p>
          </div>
          <div className="space-y-6">
            <div>
              <span className="font-outfit font-extrabold text-4xl text-[#FCC509]">1,250+</span>
              <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Careers Transformed</p>
            </div>
            <div>
              <span className="font-outfit font-extrabold text-4xl text-[#FCC509]">91.2%</span>
              <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Transition & Placement Rate</p>
            </div>
            <div>
              <span className="font-outfit font-extrabold text-4xl text-[#FCC509]">35+</span>
              <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Vetted Tech Mentors</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
```

---

## 3. Student Success Testimonial Component (React + Tailwind)

```tsx
// apps/web-marketing/app/components/Testimonials.tsx
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Riya Kapoor',
    course: 'Web Development',
    tier: 'Advanced Master Program',
    story: 'Riya transitioned from a traditional commerce background with no prior programming knowledge. By enrolling in the 16-week Advanced Master Program in Web Development, she mastered the MERN stack and worked on three live client capstone projects. The intensive mock interviews organized by Digimation Flight’s placement cell prepared her to clear a rigorous technical interview at a fast-growing SaaS startup in Bangalore in just four months.',
    quote: 'I went from writing my first line of JS to landing a Full-Stack developer role in 4 months!',
    metric: '6.5 LPA Package at SaaS Startup'
  },
  {
    name: 'Arjun Nair',
    course: 'Data Science & AI',
    tier: 'Advanced Master Program',
    story: 'Arjun, a pre-final year B.Tech student, utilized the AI Resume & Skills Gap Analyzer on Digimation Flight’s platform. It flagged critical gaps in his Python profiling and data warehousing knowledge. He registered for the Data Science & AI tier and completed hands-on projects in Machine Learning pipelines. With the portfolio built during the course, he secured a highly competitive summer internship at a leading analytics firm.',
    quote: 'The AI Gap Analyzer pointed out exactly what my resume lacked. The course filled the gap perfectly.',
    metric: 'INR 25k/mo Summer Internship Secured'
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#FFF9FA] px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#17171D] text-center mb-12">Verified Student Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <motion.div 
              key={index}
              className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="font-outfit font-bold text-lg text-[#17171D]">{t.name}</h4>
                    <p className="text-xs text-gray-500 font-semibold uppercase">{t.course} — {t.tier}</p>
                  </div>
                  <div className="flex text-amber-400">⭐⭐⭐⭐⭐</div>
                </div>
                <blockquote className="font-outfit italic text-base text-[#17171D] border-l-4 border-[#FCC509] pl-4 mb-4 font-semibold">
                  "{t.quote}"
                </blockquote>
                <p className="font-inter text-gray-600 text-sm leading-relaxed mb-6">
                  {t.story}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Hired Outcome</span>
                <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold border border-amber-200">
                  {t.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```
This paste-ready code catalog enables instantaneous platform mock-ups and rapid visual builds.
