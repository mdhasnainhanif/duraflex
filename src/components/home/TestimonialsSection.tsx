'use client';

import React from 'react';
import { Sparkle, Star, CheckCircle, Quotes } from '@phosphor-icons/react';
import { testimonials } from '@/data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkle weight="fill" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Over 12,000+ Happy Sleepers Across Pakistan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Read unedited feedback from real customers sleeping on Dura Flex mattresses in Lahore, Karachi, Islamabad, and nationwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.slice(0, 6).map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} weight="fill" size={16} />
                    ))}
                  </div>
                  <Quotes weight="fill" className="text-slate-200 text-2xl" />
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              {/* Author & City footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-sm">{t.author}</span>
                    {t.verified && (
                      <span title="Verified Purchase" className="inline-flex">
                        <CheckCircle weight="fill" className="text-emerald-500 text-sm" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{t.city}, Pakistan</p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-primary bg-primary-light px-2.5 py-1 rounded-full">
                    {t.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
