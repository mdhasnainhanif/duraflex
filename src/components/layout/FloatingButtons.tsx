'use client';

import React from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { SITE_CONFIG } from '@/lib/constants';

export const WhatsAppFloatButton: React.FC = () => (
  <a
    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi! I\'d like to know more about Dura Flex mattresses.')}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-24 right-5 z-[300] flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#1ebe57] transition-all hover:scale-105 active:scale-95"
    aria-label="Chat on WhatsApp"
  >
    <WhatsappLogo size={22} weight="fill" />
    <span className="text-sm font-bold hidden sm:inline">Talk to us</span>
  </a>
);

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollTop}
      className="fixed bottom-5 right-5 z-[300] w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-glow hover:bg-primary-hover hover:scale-110 active:scale-95 transition-all"
      aria-label="Back to top"
    >
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
};
