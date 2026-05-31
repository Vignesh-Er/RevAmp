'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import CTAButton from './CTAButton';
import MobileNav from './MobileNav';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Programs', href: '#courses' },
    { label: 'Services', href: '#services' },
    { label: 'For Institutions', href: '/b2b-institutions' },
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FFF9FA]/80 backdrop-blur-lg border-b border-[#17171D]/10 py-3 shadow-md' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Digimation Flight Wordmark */}
          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center space-x-2">
              <span className="font-syne font-bold text-2xl tracking-tight text-[#17171D] select-none">
                DIGIMATION<span className="text-[#FCC509]">FLIGHT</span>
              </span>
            </a>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} passHref legacyBehavior>
                <a className="font-nunito font-medium text-sm text-[#3D3D45] hover:text-[#17171D] transition-colors duration-200">
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Desktop Right Side CTA Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <CTAButton variant="ghost" size="sm">
              Sign In
            </CTAButton>
            <CTAButton variant="primary" size="sm" href="#courses">
              Get Started
            </CTAButton>
          </div>

          {/* Mobile Hamburguer Trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#17171D] p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav 
            links={navLinks} 
            onClose={() => setIsMobileMenuOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
