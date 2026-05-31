# PERFORMANCE ENGINEERING AND INDIA DPDP ACT 2023 COMPLIANCE
**File Identifier:** `gap_05_performance_engineering.md`

Gaining competitive advantage during the RevampX Challenge requires matching outstanding design with optimized performance. Websites that load within 1 second convert three times higher than those that take 5 seconds. Additionally, strict adherence to the Digital Personal Data Protection Act (DPDP Act, 2023) is a mandatory architecture boundary for operations in India.

---

## 1. Web Performance Budget & Optimization Spec
To hit our target of **Largest Contentful Paint (LCP) under 1.5 seconds** and **Cumulative Layout Shift (CLS) under 0.05**, the Next.js marketing application and Vite LMS portal apply the following parameters:

### Next.js Marketing Optimization
1.  **Server-Side Rendering (SSR) & Static Site Generation (SSG):** All course landing pages and B2B catalogs are pre-rendered statically. No dynamic hydration blocks occur in critical rendering paths.
2.  **Next.js Image Component (`next/image`):** Images are served in WebP/AVIF formats, resized based on viewport breakpoints, and use explicit `width` and `height` properties to prevent cumulative shifts. Crucially, the Hero graphic is flagged with `priority`.
3.  **Dynamic Imports (`next/dynamic`):** The AI Resume & Skills Gap Analyzer widget is dynamically imported with `ssr: false`, preventing heavy libraries (`pdf-parse`, React dropzones) from bloating the initial JS bundle.
4.  **Font Optimization (`next/font`):** Inter and Outfit Google Fonts are imported natively through Next.js font packages, caching the font files locally and setting `display: swap` to prevent Flash of Unseen Text (FOUT).

### Vite Single-Page Application (SPA) Code Splitting
```javascript
// apps/portal-dashboard/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Splitting vendor packages for maximum CDN edge caching
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('framer-motion')) return 'vendor-motion';
            return 'vendor-helpers';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500,
  }
});
```

---

## 2. India DPDP Act 2023 & Rules 2025 Compliance
Under India's DPDPA 2023, data processing must be backed by granular, explicit consent. Non-compliance carries administrative fines up to INR 250 crore. Our technical implementation integrates **CookieYes** and features a strict **Child Privacy Gate**.

### Production Consent Gating Provider
This React Context provider blocks Google Analytics 4 (GA4), Microsoft Clarity, and Meta Pixel scripts until affirmative consent is logged. It also checks if the user is identified as a minor (under 18) to completely prevent tracking.

```tsx
// packages/ui-shared/src/components/DPDPProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type ConsentStatus = 'granted' | 'denied' | 'pending';

interface DPDPContextType {
  consent: {
    analytics: ConsentStatus;
    marketing: ConsentStatus;
    essential: boolean;
  };
  isUnder18: boolean;
  setChildGate: (isMinor: boolean) => void;
  updateConsent: (categories: { analytics: ConsentStatus; marketing: ConsentStatus }) => void;
}

const DPDPContext = createContext<DPDPContextType | undefined>(undefined);

export const DPDPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [analyticsConsent, setAnalyticsConsent] = useState<ConsentStatus>('pending');
  const [marketingConsent, setMarketingConsent] = useState<ConsentStatus>('pending');
  const [isUnder18, setIsUnder18] = useState<boolean>(false);

  useEffect(() => {
    // 1. Recover consent records from local storage
    const storedAnalytics = localStorage.getItem('_dpdp_consent_analytics') as ConsentStatus || 'pending';
    const storedMarketing = localStorage.getItem('_dpdp_consent_marketing') as ConsentStatus || 'pending';
    const storedMinorStatus = localStorage.getItem('_dpdp_is_minor') === 'true';

    setAnalyticsConsent(storedAnalytics);
    setMarketingConsent(storedMarketing);
    setIsUnder18(storedMinorStatus);

    // 2. Direct telemetry scripts based on recovered values
    executeScriptGating(storedAnalytics, storedMarketing, storedMinorStatus);
  }, []);

  const setChildGate = (isMinor: boolean) => {
    setIsUnder18(isMinor);
    localStorage.setItem('_dpdp_is_minor', String(isMinor));
    if (isMinor) {
      // DPDP Section 9: Complete ban on tracking, profiling, and targeted ads for children
      setAnalyticsConsent('denied');
      setMarketingConsent('denied');
      localStorage.setItem('_dpdp_consent_analytics', 'denied');
      localStorage.setItem('_dpdp_consent_marketing', 'denied');
      executeScriptGating('denied', 'denied', true);
    }
  };

  const updateConsent = (categories: { analytics: ConsentStatus; marketing: ConsentStatus }) => {
    if (isUnder18) return; // Prevent minor preferences modification

    setAnalyticsConsent(categories.analytics);
    setMarketingConsent(categories.marketing);
    localStorage.setItem('_dpdp_consent_analytics', categories.analytics);
    localStorage.setItem('_dpdp_consent_marketing', categories.marketing);

    // Persist verifiable consent audit log in database
    logConsentAudit(categories.analytics, categories.marketing);

    executeScriptGating(categories.analytics, categories.marketing, false);
  };

  const executeScriptGating = (analytics: ConsentStatus, marketing: ConsentStatus, minor: boolean) => {
    if (minor || analytics !== 'granted') {
      window['ga-disable-UA-XXXXXX-Y'] = true; // Disable GA4 tracking
      window['clarity']?.('consent', false);    // Block Microsoft Clarity
    } else {
      window['ga-disable-UA-XXXXXX-Y'] = false;
      window['clarity']?.('consent', true);
    }
    
    if (minor || marketing !== 'granted') {
      // Block Meta / Facebook Pixel
      window['fbq']?.('consent', 'revoke');
    } else {
      window['fbq']?.('consent', 'grant');
    }
  };

  const logConsentAudit = async (analytics: ConsentStatus, marketing: ConsentStatus) => {
    try {
      await fetch('/api/dpdp/consent-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          analyticsConsent: analytics,
          marketingConsent: marketing,
          clientFingerprint: navigator.userAgent
        })
      });
    } catch (err) {
      console.error('DPDP Audit Log Failed:', err);
    }
  };

  return (
    <DPDPContext.Provider value={{ consent: { analytics: analyticsConsent, marketing: marketingConsent, essential: true }, isUnder18, setChildGate, updateConsent }}>
      {children}
    </DPDPContext.Provider>
  );
};

export const useDPDP = () => {
  const context = useContext(DPDPContext);
  if (!context) throw new Error('useDPDP must be used within DPDPProvider');
  return context;
};
```

---

## 3. Cryptographically Secure Consent Database Schema
Consent records must be stored securely to establish verifiable proof of compliance under audit.

```javascript
// packages/db-schemas/src/consentLog.js
const mongoose = require('mongoose');

const ConsentLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  consentFingerprint: { type: String, required: true }, // Encrypted hash of client parameters
  analyticsConsent: { type: String, enum: ['granted', 'denied'], required: true },
  marketingConsent: { type: String, enum: ['granted', 'denied'], required: true },
  isMinor: { type: Boolean, default: false, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  ipHash: { type: String, required: true } // SHA256 hashed IP for data minimization compliance
});

module.exports = mongoose.model('ConsentLog', ConsentLogSchema);
```
By utilizing this performance-optimized framework, the platform satisfies the requirements of speed and law.
