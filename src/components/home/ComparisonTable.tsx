'use client';

import React from 'react';
import { Sparkle, Check, X } from '@phosphor-icons/react';

const COMPARISON_ROWS = [
  {
    feature: 'In-Home Sleep Trial',
    duraflex: '100 Nights Risk-Free in your bedroom',
    traditional: 'None (only 2 mins lying down in a dusty showroom)',
    highlight: true,
  },
  {
    feature: 'Sag & Indentation Warranty',
    duraflex: '10-Year Sag-Free Replacement Guarantee',
    traditional: '1–2 Years Pro-rated with tricky exclusions',
    highlight: false,
  },
  {
    feature: 'Cooling & Temperature Control',
    duraflex: 'Cryo-Gel Infused Memory Foam + TENCEL™ cover',
    traditional: 'Synthetic polyester fabric trapping hot body heat',
    highlight: true,
  },
  {
    feature: 'Motion Isolation (Zero Disturbance)',
    duraflex: 'Deep absorbing foam absorbs 100% of movements',
    traditional: 'Springs squeak and bounce across the entire bed',
    highlight: false,
  },
  {
    feature: 'Middleman Retail Markups',
    duraflex: 'Zero! Direct from our high-tech Pakistani factory',
    traditional: '40% - 60% added by dealers & middlemen',
    highlight: true,
  },
  {
    feature: 'Packaging & Delivery',
    duraflex: 'Clean vacuum-compressed box, free doorstep delivery',
    traditional: 'Bulky uncovered mattress strapped to rooftop transport',
    highlight: false,
  },
];

export const ComparisonTable: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F8F9FD]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkle weight="fill" />
            <span>Why Sleep With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Dura Flex vs Traditional Mattresses
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            See why thousands of Pakistani sleepers are switching from legacy spring and bonded mattresses to Dura Flex sleep science.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-navy text-white p-4 sm:p-6 text-sm sm:text-base font-bold items-center">
            <div className="col-span-5 sm:col-span-4 text-white/80">Key Feature</div>
            <div className="col-span-4 sm:col-span-4 text-primary-light flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span>Dura Flex</span>
            </div>
            <div className="col-span-3 sm:col-span-4 text-slate-400 font-semibold">
              Traditional Stores
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 p-4 sm:p-6 text-xs sm:text-sm items-center transition-colors ${
                  row.highlight ? 'bg-primary-light/15' : 'hover:bg-[#F8F9FD]'
                }`}
              >
                {/* Feature Name */}
                <div className="col-span-5 sm:col-span-4 font-bold text-slate-900 pr-2">
                  {row.feature}
                </div>

                {/* Dura Flex (Positive) */}
                <div className="col-span-4 sm:col-span-4 flex items-start gap-2 pr-2 text-navy font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check weight="bold" size={12} />
                  </div>
                  <span>{row.duraflex}</span>
                </div>

                {/* Traditional (Negative) */}
                <div className="col-span-3 sm:col-span-4 flex items-start gap-2 text-slate-500 font-normal">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X weight="bold" size={12} />
                  </div>
                  <span>{row.traditional}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
