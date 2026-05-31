import React from 'react';
import Navbar from '../../../../packages/ui-shared/components/Navbar';
import B2BHero from '../../../../packages/ui-shared/components/B2BHero';
import PartnershipCard from '../../../../packages/ui-shared/components/PartnershipCard';
import B2BInquiryForm from '../../../../packages/ui-shared/components/B2BInquiryForm';
import Footer from '../../../../packages/ui-shared/components/Footer';
import WhatsAppButton from '../../../../packages/ui-shared/components/WhatsAppButton';

export const metadata = {
  title: 'Digimation Flight | Academic Partnerships & UGC Credits Skill Development',
  description: 'Outsource your university internship aggregate and placement readiness to Digimation Flight. Fully compliant with UGC competency and NEP 2020 frameworks.',
};

export default async function B2BInstitutionsPage() {
  const models = [
    {
      name: "Official Enrollment Channel",
      mechanics: "College-specific cohort pages are deployed; registration links distributed via internal university communication systems.",
      benefit: "Referral and revenue-sharing mechanisms; high student trust and enrollment velocity.",
      buyer: "Private & Semi-Autonomous Colleges",
      outcomeClaim: "Partner colleges report 3x higher student engagement vs standalone enrollment."
    },
    {
      name: "Semester-Based Skill Programs",
      mechanics: "Structured 8-to-16-week courses are run concurrently with academic semesters, incorporating live expert evaluation sessions.",
      benefit: "Value-added skill certificates run alongside regular classes, improving NAAC documentation.",
      buyer: "Academic Deans & Curriculum Directors"
    },
    {
      name: "White-Label / College-Branded Programs",
      mechanics: "Full course delivery under your college name; backend content, expert trainers, and LMS portal instances managed by Digimation Flight.",
      benefit: "Complete institutional ownership of brand presence with minimal setup overhead.",
      buyer: "Colleges Seeking Long-Term Brand-Controlled Contracts"
    },
    {
      name: "Placement Readiness as a Service",
      mechanics: "Outsourced training covering aptitude tests, business communication, resume profiling, and mock technical interview recordings.",
      benefit: "Immediate, measurable lift in university employment statistics.",
      buyer: "Training & Placement Officers (TPO)"
    },
    {
      name: "Internship Aggregation & Management",
      mechanics: "A pipeline of vetted startup and SME internship tracks is sourced. Onboarding, timesheets, and completion tracking are automated.",
      benefit: "Eliminates manual compliance burden and streamlines internship verification audits.",
      buyer: "College Internship Committees"
    },
    {
      name: "Co-Certified / Credit-Linked Programs",
      mechanics: "Skill programs co-certified with industry leaders, structured to map directly to internal college credit transfer frameworks.",
      benefit: "UGC and AICTE framework compliance, boosting university rankings.",
      buyer: "Vice Chancellors & Academic Councils"
    },
    {
      name: "Industry Projects & Capstone Programs",
      mechanics: "Final-year students execute actual business challenges from our startup network, under joint evaluation by faculty and our engineers.",
      benefit: "Demonstrable graduate readiness, resulting in high placement scores.",
      buyer: "Department Heads & Faculty Mentors"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#FFF9FA] text-[#17171D] overflow-x-hidden">
      
      {/* Sticky Header Nav */}
      <Navbar />

      <main className="pt-24 pb-16">
        
        {/* Institutional Hero Banner */}
        <B2BHero />

        {/* 7 Models Grid */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto" id="models">
          <div className="text-center space-y-4 mb-16">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#FCC509]/10 text-[#17171D] border border-[#FCC509]/30 uppercase tracking-widest">
              Partnership Portfolio
            </span>
            <h2 className="font-syne font-bold text-3xl md:text-5xl text-[#17171D]">
              7 Tailored Collaboration Channels
            </h2>
            <p className="font-nunito text-[#3D3D45] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Unlock academic alignment, compliance tracking, and immediate employability boosts with our comprehensive partnership models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model, idx) => (
              <PartnershipCard
                key={idx}
                name={model.name}
                mechanics={model.mechanics}
                benefit={model.benefit}
                buyer={model.buyer}
                outcomeClaim={model.outcomeClaim}
                modelNumber={idx + 1}
              />
            ))}
          </div>
        </section>

        {/* Intake Lead Capture Form */}
        <section className="py-12 px-4">
          <B2BInquiryForm />
        </section>

      </main>

      {/* Outbound WhatsApp Chat Widget */}
      <WhatsAppButton />

      {/* Brand Footer */}
      <Footer />

    </div>
  );
}
