'use client';
import React from 'react';
import { GlassCard } from './GlassCard';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  course: string;
  tier: 'foundation' | 'advanced-master';
  story: string;
  pullQuote: string;
  achievement: string;
  rating: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  course,
  tier,
  story,
  pullQuote,
  achievement,
  rating
}) => {
  return (
    <GlassCard variant="testimonial" className="p-8 h-full flex flex-col justify-between hover:shadow-lg transition-all duration-300">
      <div>
        {/* Testimonial Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="font-syne font-bold text-lg text-[#17171D] leading-snug">
              {name}
            </h4>
            <p className="font-nunito text-xs text-[#6B6B75] font-semibold uppercase tracking-wider mt-0.5">
              {course} • {tier === 'advanced-master' ? 'Advanced Master' : 'Foundation'}
            </p>
          </div>
          {/* Star Ratings */}
          <div className="flex space-x-0.5 text-[#FCC509]">
            {Array.from({ length: rating }).map((_, idx) => (
              <svg
                key={idx}
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Highlighted Pull Quote */}
        <div className="relative mb-6">
          <Quote size={32} className="absolute -top-3 -left-3 text-[#FCC509]/30 -z-10" />
          <blockquote className="font-syne font-semibold text-lg text-[#17171D] pl-5 italic leading-snug">
            "{pullQuote}"
          </blockquote>
        </div>

        {/* Narrative Outcome Story */}
        <p className="font-nunito text-[#3D3D45] text-sm leading-relaxed mb-6 pl-5">
          {story}
        </p>
      </div>

      {/* Footer Achievements Pill */}
      <div className="pt-6 border-t border-[#17171D]/5 flex justify-between items-center">
        <span className="text-[10px] font-nunito font-bold uppercase text-[#6B6B75] tracking-wider">
          Hired Outcome
        </span>
        <span className="px-3 py-1 bg-[#FCC509]/20 text-[#17171D] border border-[#FCC509]/40 rounded-full text-xs font-bold font-nunito">
          {achievement}
        </span>
      </div>

    </GlassCard>
  );
};

export default TestimonialCard;
