import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { glassCardEntry } from '../animations/variants';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'course' | 'stats' | 'testimonial' | 'partnership';
  className?: string;
  onClick?: () => void;
  id?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'course',
  className = '',
  onClick,
  id
}) => {
  // Select style maps based on Glassmorphism 2.0 Specifications
  const getVariantStyles = () => {
    switch (variant) {
      case 'stats':
        return 'glass-stats glass-tile-dark rounded-glass-16 shadow-lg text-white';
      case 'testimonial':
        return 'glass-testimonial glass-tile-light rounded-glass-24 shadow-md text-charcoal';
      case 'partnership':
        return 'glass-course glass-tile-light rounded-glass-20 shadow-sm text-charcoal';
      case 'course':
      default:
        return 'glass-course glass-tile-light rounded-glass-20 shadow-md text-charcoal hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300';
    }
  };

  return (
    <motion.div
      id={id}
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
