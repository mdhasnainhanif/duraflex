'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useUIStore } from '@/store/ui.store';
import { ANNOUNCEMENT_MESSAGES } from '@/lib/constants';
import { X } from '@phosphor-icons/react';

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isAnnouncementVisible, dismissAnnouncement } = useUIStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (!isAnnouncementVisible) return null;

  return (
    <div
      className="relative bg-navy text-white text-center py-2.5 px-4 text-xs sm:text-sm font-medium overflow-hidden"
      role="banner"
      aria-label="Announcement"
    >
      <div
        className={`transition-all duration-300 ${isAnimating ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'}`}
      >
        {ANNOUNCEMENT_MESSAGES[currentIndex]}
      </div>
      <button
        type="button"
        onClick={dismissAnnouncement}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={14} weight="bold" />
      </button>
    </div>
  );
};
