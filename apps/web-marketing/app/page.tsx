import React from 'react';
import Navbar from '../../../packages/ui-shared/components/Navbar';
import BentoGrid from '../../../packages/ui-shared/components/BentoGrid';
import CourseSection from '../../../packages/ui-shared/components/CourseSection';
import TestimonialSection from '../../../packages/ui-shared/components/TestimonialSection';
import ResumeAnalyzer from '../../../packages/ui-shared/components/ResumeAnalyzer';
import Footer from '../../../packages/ui-shared/components/Footer';
import WhatsAppButton from '../../../packages/ui-shared/components/WhatsAppButton';

export default async function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FFF9FA]">
      
      {/* Universal Sticky Header Navigation */}
      <Navbar />

      {/* Main Core Section Flow */}
      <main className="pt-24 pb-16">
        
        {/* Bento Grid Header Hub */}
        <BentoGrid />

        {/* Course Catalogs & Tiers Grid */}
        <CourseSection />

        {/* AI Resume Analyzer Section */}
        <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto" id="ai-analyzer">
          <ResumeAnalyzer />
        </section>

        {/* Testimonial Placements Section */}
        <TestimonialSection />

      </main>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Universal Brand Footer */}
      <Footer />

    </div>
  );
}
