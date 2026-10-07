'use client';

import React from 'react';
import { Package, ArrowsOutSimple, Clock, Bed, Sparkle } from '@phosphor-icons/react';

const STEPS = [
  {
    step: '01',
    icon: Package,
    title: 'Delivered in a Compact Box',
    desc: 'Vacuum-sealed using advanced German compression technology into a sleek box that easily fits in any elevator or narrow stairway.',
  },
  {
    step: '02',
    icon: Bed,
    title: 'Position on Your Bed Base',
    desc: 'Carry the box effortlessly to your bedroom and position the rolled mattress directly onto your bed frame, divan, or slatted base.',
  },
  {
    step: '03',
    icon: ArrowsOutSimple,
    title: 'Slice & Watch it Expand',
    desc: 'Use the included safety cutter to gently open the plastic seal. Hear the whoosh as fresh air expands the foam layers right before your eyes.',
  },
  {
    step: '04',
    icon: Clock,
    title: 'Ready for Sleep in Hours',
    desc: 'Your mattress is comfortable to sleep on in just 2 hours, and achieves its 100% full anatomical loft and firmness within 24 hours.',
  },
];

export const BedInBoxSteps: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkle weight="fill" />
            <span>Effortless Unboxing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            How The Dura Flex Bed-in-a-Box Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            No bulky rope-tied mattresses hanging off pickup trucks. We deliver hygienic, compressed sleep luxury straight to your doorstep.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50 border border-slate-200/80 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg hover:border-primary/40 transition-all duration-300 group"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon weight="fill" size={24} />
                  </div>
                  <span className="text-3xl font-black text-slate-300 group-hover:text-primary-light transition-colors">
                    {s.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-[11px] font-bold text-primary">
                  <span>STEP {s.step} COMPLETED</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
