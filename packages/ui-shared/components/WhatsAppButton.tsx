'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const prefilledMessage = encodeURIComponent(
    "Hi! I visited the Digimation Flight website and I'd like to learn more about your programs."
  );
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;

  const handleWhatsAppClick = () => {
    // Dispatch GA4 Event on click if gtag exists (consent-aware)
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'floating_button',
      });
    }
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-xl hover:bg-[#128C7E] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="fill-current text-white" />
      {/* Tooltip */}
      <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#17171D] text-[#FFF9FA] text-xs font-nunito font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md">
        Need Help? Chat on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
