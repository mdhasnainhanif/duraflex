'use client';

import React from 'react';
import { Sparkle, WhatsappLogo, Question } from '@phosphor-icons/react';
import { Accordion } from '@/components/ui/Accordion';
import { faqs } from '@/data/faqs';
import { SITE_CONFIG } from '@/lib/constants';

export const HomeFaqSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkle weight="fill" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Everything you need to know about our 100-night trial, 10-year warranty, Cash on Delivery, and delivery across Pakistan.
          </p>
        </div>

        {/* Accordion */}
        <div className="mb-12">
          <Accordion items={faqs.slice(0, 6)} />
        </div>

        {/* WhatsApp Help Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Question weight="fill" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Still have a question?</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Our sleep specialists in Lahore and Karachi are online on WhatsApp right now.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Hi Dura Flex, I have a question regarding mattress delivery and trial period.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex-shrink-0"
          >
            <WhatsappLogo weight="fill" size={20} />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
