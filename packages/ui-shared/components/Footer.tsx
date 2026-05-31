'use client';
import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#17171D] text-[#FFF9FA] border-t border-gray-800 py-16 px-4 md:px-8" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* About Column (Span 6) */}
        <div className="md:col-span-6 flex flex-col space-y-6">
          <span className="font-syne font-bold text-2xl tracking-tight">
            DIGIMATION<span className="text-[#FCC509]">FLIGHT</span>
          </span>
          <p className="font-nunito text-[#6B6B75] text-sm leading-relaxed max-w-md">
            Digimation Flight was founded in August 2024 with a single conviction: that the gap between what colleges teach and what companies hire for is solvable — and solvable fast. We are young by design. Built by people who have lived the frustration of graduating talented and landing underemployed. Our programs in AI, Data Science, Web Development, Cybersecurity, Digital Marketing, and Graphic Design are not academic — they are built from live job descriptions, shaped by working industry professionals, and measured by one metric: placement. In less than two years, we have enrolled over 500 students, partnered with 20-plus hiring organizations, and built an inside sales and counseling team that treats every lead like a future colleague. This is just the beginning.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#6B6B75] hover:text-[#FCC509] transition-colors duration-200">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#6B6B75] hover:text-[#FCC509] transition-colors duration-200">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#6B6B75] hover:text-[#FCC509] transition-colors duration-200">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#6B6B75] hover:text-[#FCC509] transition-colors duration-200">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Programs Navigation Link Group (Span 2) */}
        <div className="md:col-span-2">
          <h4 className="font-syne font-bold text-sm uppercase text-[#FCC509] tracking-wider mb-6">
            Programs
          </h4>
          <ul className="space-y-3 font-nunito text-sm text-[#3D3D45] text-gray-400">
            <li><Link href="#courses" className="hover:text-white transition-colors duration-200">Web Development</Link></li>
            <li><Link href="#courses" className="hover:text-white transition-colors duration-200">Data Science & AI</Link></li>
            <li><Link href="#courses" className="hover:text-white transition-colors duration-200">Cyber Security</Link></li>
            <li><Link href="#courses" className="hover:text-white transition-colors duration-200">Machine Learning</Link></li>
            <li><Link href="#courses" className="hover:text-white transition-colors duration-200">Graphic Designing</Link></li>
            <li><Link href="#courses" className="hover:text-white transition-colors duration-200">Digital Marketing</Link></li>
          </ul>
        </div>

        {/* Company Navigation Link Group (Span 2) */}
        <div className="md:col-span-2">
          <h4 className="font-syne font-bold text-sm uppercase text-[#FCC509] tracking-wider mb-6">
            Company
          </h4>
          <ul className="space-y-3 font-nunito text-sm text-gray-400">
            <li><Link href="#about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
            <li><Link href="/b2b-institutions" className="hover:text-white transition-colors duration-200">For Institutions</Link></li>
            <li><Link href="#careers" className="hover:text-white transition-colors duration-200">Careers</Link></li>
            <li><Link href="#blog" className="hover:text-white transition-colors duration-200">Blog</Link></li>
            <li><Link href="#contact" className="hover:text-white transition-colors duration-200">Contact Us</Link></li>
          </ul>
        </div>

        {/* Legal Link Group (Span 2) */}
        <div className="md:col-span-2">
          <h4 className="font-syne font-bold text-sm uppercase text-[#FCC509] tracking-wider mb-6">
            Legal
          </h4>
          <ul className="space-y-3 font-nunito text-sm text-gray-400">
            <li><Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link></li>
            <li><Link href="/dpdp-notice" className="hover:text-white transition-colors duration-200">DPDP Act Notice</Link></li>
          </ul>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-nunito">
        <p>© 2026 Digimation Flight Private Limited. All Rights Reserved. CIN: U62011UP2024PTC208021.</p>
        <p className="mt-2 md:mt-0">Registered Office: Arya Nagar, Kosi Kalan, Mathura, Uttar Pradesh, 281403.</p>
      </div>
    </footer>
  );
};

export default Footer;
