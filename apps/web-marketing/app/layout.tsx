import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Syne, Nunito } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-syne',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Digimation Flight | AI, Tech & Digital Skills Training',
  description: 'Founded in August 2024, Digimation Flight is India’s fast-growing educational technology platform delivering job-ready AI, tech, and digital marketing training with real mentors.',
  openGraph: {
    title: 'Digimation Flight | AI, Tech & Digital Skills Training',
    description: 'Bridges the gap between academic theory and enterprise readiness. Learn Web Dev, Data Science, Cyber Security, and Machine Learning.',
    url: 'https://www.digimationflight.com',
    type: 'website',
  },
};

// Target course schema.org JSON-LD as locking structural data
const structuredSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Advanced Master Program in Web Development",
  "description": "In-depth mentor sessions, advanced portfolio projects, and direct placement support for full-stack developers.",
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
    "price": "14999",
    "priceCurrency": "INR"
  },
  "courseCode": "DF-WEB-02"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieYesToken = process.env.NEXT_PUBLIC_COOKIEYES_ID || 'dummy-token';

  return (
    <html lang="en" className={`${syne.variable} ${nunito.variable}`}>
      <head>
        {/* Schema.org Structured Metadata */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredSchema) }}
        />
        
        {/* CookieYes Compliance Platform Consent Script */}
        <Script
          id="cookieyes-banner"
          src={`https://cdn-cookieyes.com/client_data/${cookieYesToken}/script.js`}
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased bg-[#FFF9FA] text-[#17171D]">
        {children}
      </body>
    </html>
  );
}
