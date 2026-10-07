import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkle,
  ShieldCheck,
  Moon,
  Truck,
  Heart,
  ArrowsClockwise,
  CheckCircle,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Dura Flex – Sleep Science & Craftsmanship in Pakistan',
  description:
    'Discover the Dura Flex mission: engineering certified orthopedic and cooling gel mattresses direct from our state-of-the-art factory to bedrooms across Pakistan.',
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/40 via-white to-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
            <Sparkle weight="fill" />
            <span>Our Origin & Purpose</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-navy tracking-tight leading-tight">
            We Spent 3 Years Reimagining How Pakistan Sleeps
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
            For decades, buying a mattress in Pakistan meant guessing in a dusty showroom, paying 50% dealer markups, and dealing with saggy foam after just 2 years. Dura Flex was born to end that.
          </p>
        </div>
      </section>

      {/* The Story & Mission */}
      <section className="py-12 sm:py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Factory Direct To Your Door
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">
                Sleep Health is Not a Luxury. It&apos;s a Human Necessity.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                You spend one-third of your entire life on a mattress. Chronic morning back aches, stiffness, and disrupted sleep don&apos;t just ruin your night — they diminish your focus, energy, and overall health.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                At Dura Flex, we partnered with orthopedic physical therapists and materials engineers to develop high-density anatomical foams and breathable cryo-gels formulated specifically for hot, humid Pakistani climates.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-2xl font-black text-navy">12,000+</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Bedrooms Transformed</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-2xl font-black text-primary">98.4%</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Keep Their Mattress</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
              <Image
                src="/images/categories/ortho.jpg"
                alt="Dura Flex mattress manufacturing and design"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="py-16 sm:py-24 bg-[#F8F9FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
              The 4 Dura Flex Guarantees
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Every single product that leaves our factory floor is backed by four non-negotiable promises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                <ShieldCheck weight="fill" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">10-Year Sag Guarantee</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our high-density foam cores undergo 100,000-stroke roller compression testing to ensure they will never develop center sagging.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
                <Moon weight="fill" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">100-Night Sleep Trial</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Take up to 100 nights in the comfort of your own home to evaluate your new mattress. If your body isn&apos;t delighted, return it for 100% refund.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xl">
                <Truck weight="fill" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Free Doorstep Shipping</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Compressed, rolled, and sealed in an easy-to-carry box, delivered free to Karachi, Lahore, Islamabad, and across Pakistan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                <Heart weight="fill" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Zero Middlemen Price</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                By shipping straight from our Pakistani factory directly to your door, we eliminate costly showroom rents and dealer commissions.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link href="/products">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                <span>Shop Our Sleep Range</span>
                <ArrowRight weight="bold" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
