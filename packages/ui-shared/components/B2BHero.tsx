'use client';
import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from './CTAButton';
import { bentoItem } from '../animations/variants';

export const B2BHero: React.FC = () => {
  return (
    <section className="bg-[#FFF9FA] text-[#17171D] py-20 px-4 md:px-8 border-b border-[#17171D]/5">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* Category Label */}
        <motion.span
          variants={bentoItem}
          initial="hidden"
          animate="show"
          className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#FCC509]/10 text-[#17171D] border border-[#FCC509]/30 uppercase tracking-widest"
        >
          Institutional Partnerships
        </motion.span>

        {/* Big Bold Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-syne font-bold text-4xl md:text-6xl text-[#17171D] leading-tight tracking-tight max-w-4xl"
        >
          Equip Your Students for the <span className="bg-[#FCC509] text-[#17171D] px-2 py-0.5 rounded-lg select-none">Careers</span> They Deserve
        </motion.h1>

        {/* Supporting Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-nunito text-[#3D3D45] text-lg md:text-xl leading-relaxed max-w-3xl"
        >
          Digimation Flight partners with colleges and universities to deliver industry-aligned skill development, internship pipelines, and placement-ready graduates — under your institution's banner or ours.
        </motion.p>

        {/* Action Call buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
        >
          <CTAButton variant="primary" size="lg" href="#b2b-form">
            Request a Partnership Demo
          </CTAButton>
          <CTAButton variant="secondary" size="lg" href="#models">
            Explore Partnership Models
          </CTAButton>
        </motion.div>

        {/* Trust disclaimer / regulatory validation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-nunito text-xs text-[#6B6B75] max-w-lg leading-relaxed pt-4"
        >
          All programs are structured to align with UGC competency frameworks and AICTE skill development mandates.
        </motion.p>

      </div>
    </section>
  );
};

export default B2BHero;
