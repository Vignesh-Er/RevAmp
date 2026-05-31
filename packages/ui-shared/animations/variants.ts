import { Variants, Transition } from 'framer-motion';

// Helper to check for prefers-reduced-motion in browser context
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Transition wrapper to apply duration 0 when prefers-reduced-motion is active
export const withReducedMotion = (transition: Transition): Transition => {
  if (prefersReducedMotion()) {
    return { ...transition, duration: 0, delay: 0 };
  }
  return transition;
};

// Staggered bento entrance variants
export const bentoContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: withReducedMotion({
      staggerChildren: 0.08,
      delayChildren: 0.05
    })
  }
};

export const bentoItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: withReducedMotion({
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    })
  }
};

// Scroll Reveal Transition
export const fadeUpReveal: Variants = {
  initial: { opacity: 0, y: 40 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: withReducedMotion({
      duration: 0.6,
      ease: 'easeOut'
    })
  }
};

// Course / Testimonial Hover Lifts
export const cardHoverLift = {
  hover: {
    y: -4,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

// CTA Button Pulse Animation
export const ctaButtonPulse = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(252, 197, 9, 0.4)',
      '0 0 0 12px rgba(252, 197, 9, 0)',
      '0 0 0 0 rgba(252, 197, 9, 0)'
    ]
  },
  transition: {
    duration: 2.4,
    repeat: Infinity,
    ease: 'easeOut'
  }
};

// Glass Card Entrance Animation
export const glassCardEntry: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: withReducedMotion({
      duration: 0.4,
      ease: 'easeOut'
    })
  }
};

// Navbar Link Hovers
export const navLinkHover: Variants = {
  initial: { width: 0, left: '50%' },
  hover: {
    width: '100%',
    left: '0%',
    transition: { duration: 0.25, ease: 'easeInOut' }
  }
};
