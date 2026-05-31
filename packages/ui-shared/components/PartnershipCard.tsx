'use client';
import React from 'react';
import { GlassCard } from './GlassCard';
import { CheckCircle2, Users, Target } from 'lucide-react';

interface PartnershipCardProps {
  name: string;
  mechanics: string;
  benefit: string;
  buyer: string;
  outcomeClaim?: string;
  modelNumber: number;
}

export const PartnershipCard: React.FC<PartnershipCardProps> = ({
  name,
  mechanics,
  benefit,
  buyer,
  outcomeClaim,
  modelNumber
}) => {
  return (
    <GlassCard variant="partnership" className="p-8 h-full flex flex-col justify-between hover:shadow-md transition-shadow duration-300 border-l-4 border-l-[#FCC509]/30">
      <div>
        {/* Model ID Indicator */}
        <div className="flex justify-between items-center mb-6">
          <span className="px-2.5 py-0.5 bg-[#17171D] text-[#FFF9FA] rounded-md text-[10px] font-bold font-nunito uppercase tracking-widest">
            Model 0{modelNumber}
          </span>
          <span className="text-xs font-nunito font-semibold text-[#6B6B75]">
            Target: {buyer}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-syne font-bold text-xl text-[#17171D] mb-4 leading-snug">
          {name}
        </h3>

        {/* Mechanics Column */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-2">
            <Target size={16} className="text-[#FCC509] shrink-0 mt-0.5" />
            <p className="font-nunito text-sm text-[#3D3D45] leading-relaxed">
              <strong className="text-[#17171D]">Mechanics:</strong> {mechanics}
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 size={16} className="text-[#1B8A4E] shrink-0 mt-0.5" />
            <p className="font-nunito text-sm text-[#3D3D45] leading-relaxed">
              <strong className="text-[#17171D]">Core Benefit:</strong> {benefit}
            </p>
          </div>
        </div>
      </div>

      {/* Outcome Stat / Claim block */}
      {outcomeClaim && (
        <div className="mt-4 pt-4 border-t border-[#17171D]/5 flex items-center space-x-2 bg-[#FFEEF0] p-3 rounded-lg border border-[#FCC509]/10">
          <Users size={16} className="text-[#FCC509]" />
          <p className="font-nunito text-xs text-[#17171D] font-semibold leading-snug">
            {outcomeClaim}
          </p>
        </div>
      )}

    </GlassCard>
  );
};

export default PartnershipCard;
