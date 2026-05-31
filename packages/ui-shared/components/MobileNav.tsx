'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CTAButton from './CTAButton';

interface LinkItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  links: LinkItem[];
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ links, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-[68px] left-0 w-full h-[calc(100vh-68px)] z-40 bg-[#FFF9FA]/95 backdrop-blur-xl border-t border-[#17171D]/10 px-6 py-8 flex flex-col justify-between"
    >
      <div className="flex flex-col space-y-6">
        {links.map((link) => (
          <Link key={link.label} href={link.href} passHref legacyBehavior>
            <a 
              onClick={onClose} 
              className="font-syne font-bold text-2xl text-[#17171D] hover:text-[#FCC509] transition-colors duration-200"
            >
              {link.label}
            </a>
          </Link>
        ))}
      </div>

      <div className="flex flex-col space-y-4 pb-12">
        <CTAButton variant="secondary" size="lg" className="w-full" onClick={onClose}>
          Sign In
        </CTAButton>
        <CTAButton variant="primary" size="lg" href="#courses" className="w-full" onClick={onClose}>
          Get Started
        </CTAButton>
      </div>
    </motion.div>
  );
};

export default MobileNav;
