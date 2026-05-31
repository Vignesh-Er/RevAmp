'use client';
import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import { fadeUpReveal } from '../animations/variants';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Riya Kapoor',
      course: 'Advanced Master Program — Full-Stack Web Development',
      tier: 'advanced-master' as const,
      story: "I'd been applying for developer roles for six months before joining Digimation Flight. Within four months of starting the Advanced Master Program, I had a portfolio with three real projects, a GitHub profile that hiring managers actually looked at, and an offer letter from a product startup in Noida. The mock interviews were brutal — in the best possible way. Nothing in the actual interview surprised me.",
      pullQuote: "The mock interviews were brutal — in the best way. Nothing surprised me after that.",
      achievement: "Placed as Junior Full-Stack Developer within 4 months",
      rating: 5
    },
    {
      name: 'Arjun Nair',
      course: 'Foundation Program — Data Science and AI',
      tier: 'foundation' as const,
      story: "I'm from a non-CS background — Economics graduate, no coding experience. The Foundation Program started from zero, which is exactly what I needed. The instructors were patient but didn't treat us like we were fragile. Three months in, I had built an end-to-end ML model. The platform connected me with a fintech startup for an internship where I'm now analyzing real transaction data. I had no idea this was possible from my background.",
      pullQuote: "Three months in, I built an end-to-end ML model. I had no idea this was possible.",
      achievement: "Secured Data Analyst Internship at a fintech startup within 3 months",
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto" id="testimonials">
      
      {/* Header Info */}
      <motion.div
        variants={fadeUpReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-col items-center text-center space-y-6 mb-16"
      >
        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#FCC509]/10 text-[#17171D] border border-[#FCC509]/30 uppercase tracking-widest">
          Alumni Outcomes
        </span>
        <h2 className="font-syne font-bold text-3xl md:text-5xl text-[#17171D] max-w-2xl leading-tight">
          Proof Is in the Placement
        </h2>
      </motion.div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            variants={fadeUpReveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-80px' }}
          >
            <TestimonialCard
              name={t.name}
              course={t.course}
              tier={t.tier}
              story={t.story}
              pullQuote={t.pullQuote}
              achievement={t.achievement}
              rating={t.rating}
            />
          </motion.div>
        ))}

        {/* Dynamic Outlined Invitation Card (Tile 3) */}
        <motion.div
          variants={fadeUpReveal}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-80px' }}
          className="h-full"
        >
          <div className="p-8 h-full rounded-glass-24 border-2 border-dashed border-[#FCC509]/40 bg-transparent flex flex-col justify-between items-center text-center min-h-[350px]">
            <div className="my-auto flex flex-col items-center space-y-6">
              <div className="p-4 bg-[#FCC509]/10 rounded-full text-[#17171D]">
                <Sparkles size={32} className="animate-pulse" />
              </div>
              <h3 className="font-syne font-bold text-2xl text-[#17171D]">
                Your Story Here
              </h3>
              <p className="font-nunito text-[#3D3D45] text-sm max-w-xs leading-relaxed">
                Connect with our advisors, analyze your resume, and start your path toward securing an outstanding technical placement today.
              </p>
            </div>
            
            <Link href="#courses" passHref legacyBehavior>
              <a className="w-full py-3 bg-[#17171D] text-[#FFF9FA] font-bold font-nunito uppercase rounded-xl hover:bg-[#FCC509] hover:text-[#17171D] transition-colors duration-300 text-sm">
                Apply for Next Cohort
              </a>
            </Link>
          </div>
        </motion.div>

      </div>

    </section>
  );
};

export default TestimonialSection;
