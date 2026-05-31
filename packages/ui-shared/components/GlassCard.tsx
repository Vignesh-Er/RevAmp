import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { glassCardEntry } from '../animations/variants';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'course' | 'stats' | 'testimonial' | 'partnership';
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'course',
  className = '',
  onClick
}) => {
  // Select style maps based on Glassmorphism 2.0 Specifications
  const getVariantStyles = () => {
    switch (variant) {
      case 'stats':
        return 'bg-charcoal/92 backdrop-blur-md border border-[#FCC509]/20 rounded-glass-16 shadow-lg text-white';
      case 'testimonial':
        return 'bg-[#FFF9FA]/85 backdrop-blur-[20px] saturate-200 border border-[#FCC509]/15 rounded-glass-24 shadow-md text-charcoal';
      case 'partnership':
        return 'bg-[#FFF9FA]/75 backdrop-blur-lg border border-[#17171D]/10 rounded-glass-20 shadow-sm text-charcoal';
      case 'course':
      default:
        return 'bg-[#FFF9FA]/72 backdrop-blur-[16px] saturate-[180%] border border-[#17171D]/6 rounded-glass-20 shadow-md text-charcoal hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300';
    }
  };

  return (
    <motion.div
      variants={glassCardEntry}
      initial="hidden"
      animate="visible"
      className={`relative overflow-hidden ${getVariantStyles()} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
