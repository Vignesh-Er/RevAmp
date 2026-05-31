'use client';
import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from './CTAButton';
import { bentoItem } from '../animations/variants';

export const HeroSection: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between p-8 md:p-12">
      
      {/* Text Column (col 1-8 content) */}
      <motion.div
        variants={bentoItem}
        className="w-full lg:w-3/5 flex flex-col justify-center space-y-6"
      >
        <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold bg-[#FCC509]/10 text-[#17171D] border border-[#FCC509]/30 uppercase tracking-widest">
          RevampX Challenge 2026
        </span>
        <h1 className="font-syne font-bold text-3xl md:text-5xl lg:text-5xl text-[#17171D] leading-tight tracking-tight">
          Turn Your Skills Into a <span className="bg-[#FCC509] text-[#17171D] px-2 py-0.5 rounded-lg select-none">Career</span> That Pays
        </h1>
        <p className="font-nunito text-[#3D3D45] text-base md:text-lg leading-relaxed max-w-xl">
          Digimation Flight delivers job-ready AI, tech, and digital marketing training with real mentors, real projects, and a placement cell that actually works.
        </p>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <CTAButton variant="primary" size="md" href="#ai-analyzer">
            Analyze My Resume Free
          </CTAButton>
          <CTAButton variant="secondary" size="md" href="#courses">
            Explore Programs
          </CTAButton>
        </div>

        <p className="font-nunito text-xs text-[#6B6B75] italic">
          No fluff. No filler. Just skills.
        </p>
      </motion.div>

      {/* Hero Visual Element (Overlapping overlapping geometric composition) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="w-full lg:w-2/5 mt-8 lg:mt-0 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 400 400"
          className="w-72 h-72 md:w-80 md:h-80 select-none drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background grid representation */}
          <line x1="50" y1="0" x2="50" y2="400" stroke="rgba(23, 23, 29, 0.04)" strokeWidth="1" />
          <line x1="150" y1="0" x2="150" y2="400" stroke="rgba(23, 23, 29, 0.04)" strokeWidth="1" />
          <line x1="250" y1="0" x2="250" y2="400" stroke="rgba(23, 23, 29, 0.04)" strokeWidth="1" />
          <line x1="350" y1="0" x2="350" y2="400" stroke="rgba(23, 23, 29, 0.04)" strokeWidth="1" />
          
          {/* Overlapping Abstract Shapes Suggesting Motion and Growth */}
          {/* Charcoal Black Base Rectangle */}
          <rect
            x="80"
            y="120"
            width="180"
            height="180"
            rx="24"
            fill="#17171D"
          />
          {/* Yellowish Gold Highlight Circle */}
          <circle
            cx="280"
            cy="160"
            r="70"
            fill="#FCC509"
          />
          {/* Rose White Core Element */}
          <rect
            x="140"
            y="180"
            width="120"
            height="120"
            rx="16"
            fill="#FFF9FA"
            stroke="rgba(23, 23, 29, 0.08)"
            strokeWidth="2"
          />
          {/* Gold Dim Accent Ring */}
          <circle
            cx="140"
            cy="280"
            r="30"
            stroke="#D4A608"
            strokeWidth="6"
            strokeDasharray="10 6"
          />
          {/* Arrow / Chevron suggestion growth */}
          <path
            d="M200 210L230 240H170L200 210Z"
            fill="#17171D"
          />
        </svg>
      </motion.div>

    </div>
  );
};

export default HeroSection;
