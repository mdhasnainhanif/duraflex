'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Truck,
  Moon,
  ArrowRight,
  WhatsappLogo,
  Star,
  CheckCircle,
  Sparkle,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold tracking-wide border border-slate-200">
              <Sparkle weight="fill" className="text-primary text-sm" />
              <span>Pakistan&apos;s #1 Orthopedic Sleep Brand</span>
            </div>

            {/* Main Headline - SOLID HIGH CONTRAST COLORS, NO CLIPPED TEXT */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Wake Up Reborn.{' '}
              <span className="block text-primary mt-1">
                Engineered for Pain-Free Sleep.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Experience therapeutic spinal alignment, cooling gel memory foam, and zero partner disturbance. Delivered compressed in an easy-to-carry box straight to your bedroom across Pakistan.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto pt-1">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto shadow-md hover:shadow-lg font-bold">
                  <span>Explore Mattresses</span>
                  <ArrowRight weight="bold" />
                </Button>
              </Link>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Dura Flex! I'd like help choosing the right mattress for my sleep position and budget."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-sm hover:shadow"
              >
                <WhatsappLogo weight="fill" size={20} />
                <span>Chat with Sleep Expert</span>
              </a>
            </div>

            {/* Clean Trust Row */}
            <div className="pt-4 grid grid-cols-3 gap-3 w-full border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Moon weight="fill" className="text-primary text-xl flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">100 Nights</h4>
                  <p className="text-[11px] text-slate-500">Free In-Home Trial</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck weight="fill" className="text-emerald-600 text-xl flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">10 Years</h4>
                  <p className="text-[11px] text-slate-500">Sag-Free Warranty</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Truck weight="fill" className="text-indigo-600 text-xl flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Free Shipping</h4>
                  <p className="text-[11px] text-slate-500">All Pakistani Cities</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Mattress Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">
                {/* Visual Image */}
                <div className="relative aspect-[4/3] w-full bg-white">
                  <Image
                    src="/images/new/14-ultraortho-front-978x589_d8f48ebe-6bfd-4334-b234-c9fc9de87a07.jpg"
                    alt="Dura Flex Orthopedic Mattress"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain p-4"
                  />
                  
                  {/* Clean Top Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-slate-200/60 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Bestseller • Orthopedic Pro
                  </div>
                </div>

                {/* Clean Details Footer */}
                <div className="p-6 bg-white space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Dura Ortho Spinal Pro</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      7-Zone medical core designed with orthopedic specialists for pain-free posture.
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs py-2 border-y border-slate-100">
                    <span className="text-slate-600">Firmness Feel:</span>
                    <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                      Medium-Firm (7.5/10)
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-xs text-slate-400 line-through">Rs. 42,000</span>
                      <div className="text-xl font-extrabold text-navy">Rs. 34,500</div>
                    </div>
                    <Link href="/products/dura-ortho-pro">
                      <Button size="sm" className="font-bold">
                        View Mattress
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
