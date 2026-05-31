'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { CTAButton } from './CTAButton';
import { cardHoverLift } from '../animations/variants';
import { Clock, CheckCircle } from 'lucide-react';

interface CourseCardProps {
  domain: string;
  tier: 'foundation' | 'advanced-master';
  title: string;
  description: string;
  skills: string[];
  duration: string;
  ctaText: string;
  ctaUrl: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  domain,
  tier,
  title,
  description,
  skills,
  duration,
  ctaText,
  ctaUrl
}) => {
  // Border color highlighting according to Tier type
  const borderStyles = tier === 'advanced-master'
    ? 'border-l-4 border-l-[#FCC509]'
    : 'border-l-4 border-l-[#FCC509]/30';

  return (
    <motion.div
      whileHover={cardHoverLift.hover}
      className="h-full"
    >
      <GlassCard variant="course" className={`p-8 h-full flex flex-col justify-between ${borderStyles}`}>
        <div>
          {/* Tag & Domain Header */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-nunito font-semibold uppercase tracking-wider text-[#6B6B75]">
              {domain}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              tier === 'advanced-master'
                ? 'bg-[#FCC509]/20 text-[#17171D] border border-[#FCC509]/40'
                : 'bg-gray-100 text-[#3D3D45] border border-gray-200'
            }`}>
              {tier === 'advanced-master' ? 'Advanced Master' : 'Foundation'}
            </span>
          </div>

          {/* Title and Description */}
          <h3 className="font-syne font-bold text-xl text-[#17171D] mb-3 leading-snug">
            {title}
          </h3>
          <p className="font-nunito text-[#3D3D45] text-sm leading-relaxed mb-6">
            {description}
          </p>

          {/* Skills Covered Grid */}
          <div className="mb-6">
            <p className="text-[11px] font-nunito font-bold uppercase text-[#6B6B75] tracking-wider mb-2">
              Skills You'll Master
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-[#FFEEF0] text-[#3D3D45] text-xs font-nunito font-semibold rounded-lg flex items-center gap-1"
                >
                  <CheckCircle size={10} className="text-[#1B8A4E]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Duration details & Action CTA button */}
        <div className="pt-6 border-t border-[#17171D]/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center text-xs text-[#6B6B75] font-nunito">
            <Clock size={14} className="mr-1" />
            <span>Duration: {duration}</span>
          </div>
          <CTAButton variant="primary" size="sm" href={ctaUrl}>
            {ctaText}
          </CTAButton>
        </div>

      </GlassCard>
    </motion.div>
  );
};

export default CourseCard;
