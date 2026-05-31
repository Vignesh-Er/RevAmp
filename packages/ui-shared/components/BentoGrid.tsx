'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { bentoContainer, bentoItem } from '../animations/variants';
import GlassCard from './GlassCard';
import HeroSection from './HeroSection';
import StatsCounter from './StatsCounter';
import CTAButton from './CTAButton';
import { BookOpen, Sparkles, UserCheck, ArrowRight } from 'lucide-react';

export const BentoGrid: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="bento-overview">
      <motion.div
        variants={bentoContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-auto"
      >
        
        {/* Row 1, Tile 1: Hero Tile (col 1-8, row 1) */}
        <motion.div
          variants={bentoItem}
          className="md:col-span-6 lg:col-span-8 bg-white border border-gray-100 rounded-glass-24 shadow-sm overflow-hidden"
        >
          <HeroSection />
        </motion.div>

        {/* Row 1, Tile 2: Stats Tile (col 9-12, row 1) */}
        <motion.div
          variants={bentoItem}
          className="md:col-span-6 lg:col-span-4"
        >
          <GlassCard variant="stats" className="w-full h-full">
            <StatsCounter />
          </GlassCard>
        </motion.div>

        {/* Row 2, Tile 1: Course Preview Tile (col 1-4, row 2) */}
        <motion.div
          variants={bentoItem}
          className="md:col-span-3 lg:col-span-4"
        >
          <GlassCard variant="course" className="p-8 h-full flex flex-col justify-between">
            <div>
              <div className="p-3 bg-[#FCC509]/10 rounded-xl w-fit mb-6 text-[#17171D] border border-[#FCC509]/30">
                <BookOpen size={24} />
              </div>
              <h3 className="font-syne font-bold text-xl text-[#17171D] mb-3">
                Industry-Led Catalogs
              </h3>
              <p className="font-nunito text-[#3D3D45] text-sm leading-relaxed mb-6">
                Master high-demand tech domains: Data Science & AI, Web Dev, Cyber Security, and ML. Courses are modeled from live job descriptions.
              </p>
            </div>
            <CTAButton variant="ghost" size="sm" href="#courses" className="self-start pl-0 flex items-center gap-2 hover:translate-x-1 duration-200">
              View All 6 Domains <ArrowRight size={16} />
            </CTAButton>
          </GlassCard>
        </motion.div>

        {/* Row 2, Tile 2: Testimonial Preview Tile (col 5-8, row 2) */}
        <motion.div
          variants={bentoItem}
          className="md:col-span-3 lg:col-span-4"
        >
          <GlassCard variant="testimonial" className="p-8 h-full flex flex-col justify-between">
            <div>
              <div className="p-3 bg-[#FCC509]/10 rounded-xl w-fit mb-6 text-[#17171D] border border-[#FCC509]/30">
                <UserCheck size={24} />
              </div>
              <h3 className="font-syne font-bold text-xl text-[#17171D] mb-3">
                Proof in Placements
              </h3>
              <p className="font-nunito text-[#3D3D45] text-sm leading-relaxed mb-6">
                "Within 4 months of starting the Advanced Master Program, I had an offer letter from a startup in Noida." — Riya Kapoor
              </p>
            </div>
            <CTAButton variant="ghost" size="sm" href="#testimonials" className="self-start pl-0 flex items-center gap-2 hover:translate-x-1 duration-200">
              Read Career Outcomes <ArrowRight size={16} />
            </CTAButton>
          </GlassCard>
        </motion.div>

        {/* Row 2, Tile 3: AI Analyzer Teaser Tile (col 9-12, row 2) */}
        <motion.div
          variants={bentoItem}
          className="md:col-span-6 lg:col-span-4"
        >
          <GlassCard variant="partnership" className="p-8 h-full flex flex-col justify-between">
            <div>
              <div className="p-3 bg-[#FCC509]/10 rounded-xl w-fit mb-6 text-[#17171D] border border-[#FCC509]/30">
                <Sparkles size={24} />
              </div>
              <h3 className="font-syne font-bold text-xl text-[#17171D] mb-3">
                AI Resume Grading
              </h3>
              <p className="font-nunito text-[#3D3D45] text-sm leading-relaxed mb-6">
                Curious about your market value? Run our automated resume grader against 14 recruiter compliance checks.
              </p>
            </div>
            <CTAButton variant="primary" size="sm" href="#ai-analyzer" className="self-start">
              Test Your Score Now
            </CTAButton>
          </GlassCard>
        </motion.div>

        {/* Row 3, Tile 1: CTA Banner Tile (col 1-12, row 3) */}
        <motion.div
          variants={bentoItem}
          className="md:col-span-6 lg:col-span-12"
        >
          <div className="bg-[#1E1E25] text-white p-8 md:p-12 rounded-glass-24 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="font-syne font-bold text-2xl md:text-3xl text-white mb-2 leading-tight">
                Ready to Transition Your Career?
              </h3>
              <p className="font-nunito text-[#6B6B75] text-sm md:text-base max-w-xl leading-relaxed">
                Connect with our careers counselor team. Get a personalized roadmap matching your experience, goals, and target salary brackets.
              </p>
            </div>
            <CTAButton variant="primary" size="lg" href="#courses" className="whitespace-nowrap w-full md:w-auto">
              Get Started Today
            </CTAButton>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default BentoGrid;

