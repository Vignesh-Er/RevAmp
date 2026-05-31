'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import CTAButton from './CTAButton';
import MobileNav from './MobileNav';

// Inline Interactive Sign-In Modal Component
interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);

    // Simulate standard OIDC / Auth token ingestion pipeline
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setEmail('');
        setPassword('');
        onClose();
        alert('Welcome back to your Digimation Flight Placements Dashboard! This is a mock success state for the RevampX Challenge 2026.');
      }, 1500);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#17171D]/40 backdrop-blur-sm"
          />

          {/* Modal Container Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-[#FFF9FA]/95 backdrop-blur-xl border border-[#17171D]/10 rounded-glass-24 shadow-2xl p-8 z-10 text-[#17171D] overflow-hidden"
          >
            {/* Close Accent Trigger */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#6B6B75] hover:text-[#17171D] hover:bg-[#17171D]/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-4"
              >
                <div className="p-3 bg-[#1B8A4E]/20 text-[#1B8A4E] rounded-full animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="font-syne font-bold text-xl text-[#17171D]">
                  Access Authorized
                </h3>
                <p className="font-nunito text-xs text-[#3D3D45] max-w-xs">
                  Preparing secure sandbox session parameters. Redirecting to Candidate Placement Hub...
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Header info */}
                <div className="text-center space-y-2">
                  <span className="font-syne font-bold text-sm tracking-tight text-[#17171D]">
                    DIGIMATION<span className="text-[#FCC509]">FLIGHT</span>
                  </span>
                  <h3 className="font-syne font-bold text-2xl text-[#17171D] pt-2">
                    Candidate Portal
                  </h3>
                  <p className="font-nunito text-[#6B6B75] text-xs">
                    Access your mock skills roadmap & placements tracker.
                  </p>
                </div>

                {/* Form controls */}
                <form onSubmit={handleSubmit} className="space-y-4 font-nunito text-xs text-[#17171D]">
                  <div className="space-y-1.5">
                    <label className="block font-bold uppercase text-[#6B6B75] tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-3.5 text-[#6B6B75]" />
                      <input
                        type="email"
                        required
                        placeholder="candidate@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-[#17171D]/15 focus:outline-none focus:border-[#FCC509] bg-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold uppercase text-[#6B6B75] tracking-wider">Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-3.5 text-[#6B6B75]" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-[#17171D]/15 focus:outline-none focus:border-[#FCC509] bg-white text-xs"
                      />
                    </div>
                  </div>

                  <CTAButton
                    variant="primary"
                    size="md"
                    loading={loading}
                    className="w-full flex items-center justify-center gap-2 mt-6 py-4"
                  >
                    <Sparkles size={14} /> Authenticate & Enter
                  </CTAButton>
                </form>

                {/* Divider */}
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-[#17171D]/8"></div>
                  <span className="flex-shrink mx-4 text-[10px] text-[#6B6B75] font-nunito font-semibold uppercase tracking-wider">
                    Or secure sign in
                  </span>
                  <div className="flex-grow border-t border-[#17171D]/8"></div>
                </div>

                {/* SSO Mocks */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setSuccess(true);
                      setTimeout(() => {
                        setSuccess(false);
                        onClose();
                        alert('Google Single-Sign-On completed successfully!');
                      }, 1200);
                    }}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#17171D]/10 bg-white hover:bg-gray-50 transition-colors font-nunito text-xs font-semibold text-[#3D3D45] cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    Google
                  </button>
                  <button
                    onClick={() => {
                      setSuccess(true);
                      setTimeout(() => {
                        setSuccess(false);
                        onClose();
                        alert('LinkedIn Single-Sign-On completed successfully!');
                      }, 1200);
                    }}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#17171D]/10 bg-white hover:bg-gray-50 transition-colors font-nunito text-xs font-semibold text-[#3D3D45] cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

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
            <CTAButton 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSignInOpen(true)}
            >
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
            onSignInClick={() => {
              setIsMobileMenuOpen(false);
              setIsSignInOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Interactive Authentication Drawer */}
      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
      />
    </>
  );
};

export default Navbar;
