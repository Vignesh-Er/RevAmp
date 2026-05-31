'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlassCard } from './GlassCard';

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  subLabel?: string;
  trigger: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ target, suffix, label, subLabel, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const duration = 1800; // 1.8 seconds duration
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out curve mapping
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * target);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger, target]);

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-baseline">
        <span className="font-syne font-bold text-4xl md:text-5xl text-[#FFF9FA]">
          {count}
        </span>
        <span className="font-syne font-bold text-3xl text-[#FCC509] ml-0.5">
          {suffix}
        </span>
      </div>
      <p className="font-nunito font-semibold text-sm text-[#FDE580]">
        {label}
      </p>
      {subLabel && (
        <p className="font-nunito text-[11px] text-white/60 leading-none mt-0.5">
          {subLabel}
        </p>
      )}
    </div>
  );
};

export const StatsCounter: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const stats = [
    { target: 500, suffix: '+', label: 'Students Enrolled' },
    { target: 30, suffix: '+', label: 'Industry Mentors' },
    { target: 85, suffix: '%', label: 'Placement Rate', subLabel: 'among active placement cell participants' },
    { target: 20, suffix: '+', label: 'Hiring Partners' }
  ];

  return (
    <div ref={ref} className="w-full h-full p-8 md:p-10 flex flex-col justify-between">
      <div>
        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold bg-[#FCC509]/10 text-[#FCC509] border border-[#FCC509]/30 uppercase tracking-widest mb-6">
          Verified Performance
        </span>
        <h3 className="font-syne font-bold text-xl text-white mb-2 leading-snug">
          Our Placement Engine
        </h3>
        <p className="font-nunito text-white/70 text-xs leading-relaxed mb-8">
          Verified career transitions over our 21-month operational timeframe.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-y-8 gap-x-4">
        {stats.map((stat, idx) => (
          <StatItem
            key={idx}
            target={stat.target}
            suffix={stat.suffix}
            label={stat.label}
            subLabel={stat.subLabel}
            trigger={isInView}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsCounter;
