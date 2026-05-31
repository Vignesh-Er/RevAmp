import React, { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ctaButtonPulse } from '../animations/variants';

interface CTAButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  loading = false,
  disabled = false
}) => {
  // Select button structure based on Type Scale & Contrast constraints
  const getStyles = () => {
    let base = 'font-nunito font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 inline-flex items-center justify-center select-none ';
    
    // Size sizing models matching Type Scale specs
    switch (size) {
      case 'sm':
        base += 'px-4 py-2 text-xs ';
        break;
      case 'lg':
        base += 'px-8 py-4 text-base ';
        break;
      case 'md':
      default:
        base += 'px-6 py-3 text-sm ';
        break;
    }

    // Custom coloring profiles
    if (disabled || loading) {
      base += 'bg-[#6B6B75]/20 text-[#6B6B75] border border-transparent cursor-not-allowed ';
      return base;
    }

    switch (variant) {
      case 'secondary':
        base += 'bg-transparent text-[#17171D] border-2 border-[#17171D] hover:bg-[#17171D] hover:text-white ';
        break;
      case 'ghost':
        base += 'bg-transparent text-[#6B6B75] border border-transparent hover:text-[#17171D] ';
        break;
      case 'primary':
      default:
        base += 'bg-[#FCC509] text-[#17171D] border border-transparent hover:bg-[#17171D] hover:text-white ';
        break;
    }

    return base;
  };

  const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  const buttonContent = (
    <>
      {loading && <Spinner />}
      {children}
    </>
  );

  // If CTA has a pulsing variant and is primary, apply motion animation
  const pulseProps = variant === 'primary' && !disabled && !loading ? {
    animate: ctaButtonPulse.animate,
    transition: ctaButtonPulse.transition
  } : {};

  if (href && !disabled && !loading) {
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a
          {...pulseProps}
          className={`${getStyles()} ${className}`}
          onClick={onClick as any}
        >
          {buttonContent}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      {...pulseProps}
      disabled={disabled || loading}
      className={`${getStyles()} ${className}`}
      onClick={onClick}
    >
      {buttonContent}
    </motion.button>
  );
};

export default CTAButton;
