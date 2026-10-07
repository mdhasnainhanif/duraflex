'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkle } from '@phosphor-icons/react';

const CATEGORIES = [
  {
    title: 'Orthopedic Mattresses',
    tagline: 'Clinically proven spinal alignment & lumbar care',
    badge: 'Doctor Recommended',
    image: '/images/categories/ortho.jpg',
    href: '/products?category=dura-ortho',
    color: 'from-blue-600/90 to-indigo-900/90',
  },
  {
    title: 'Cooling Gel Memory Foam',
    tagline: 'Active temperature regulation for hot Pakistani summers',
    badge: 'Zero Heat Trap',
    image: '/images/categories/cooling.jpg',
    href: '/products?category=cooling-gel',
    color: 'from-sky-600/90 to-blue-900/90',
  },
  {
    title: 'Dura Cloud Ultra Soft',
    tagline: 'Hotel-luxury plush cushioning with deep body cradling',
    badge: 'Cloud Feel',
    image: '/images/categories/cloud.jpg',
    href: '/products?category=dura-cloud',
    color: 'from-purple-600/90 to-indigo-950/90',
  },
  {
    title: 'Memory Foam Mattresses',
    tagline: 'Zero motion transfer — sleep undisturbed by your partner',
    badge: 'Motion Isolation',
    image: '/images/categories/memory.jpg',
    href: '/products?category=memory-foam',
    color: 'from-violet-600/90 to-purple-950/90',
  },
  {
    title: 'Orthopedic & Gel Pillows',
    tagline: 'Ergonomic neck support for side and back sleepers',
    badge: 'Cervical Care',
    image: '/images/categories/pillows.jpg',
    href: '/products?category=pillows',
    color: 'from-emerald-600/90 to-teal-950/90',
  },
  {
    title: 'Dura Mom & Baby Care',
    tagline: 'Maternity body support pillows & organic crib mattresses',
    badge: 'Safe & Pure',
    image: '/images/categories/mom-baby.jpg',
    href: '/products?category=dura-mom',
    color: 'from-rose-600/90 to-pink-950/90',
  },
];

export const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F8F9FD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
              <Sparkle weight="fill" />
              <span>Engineered Sleep Collections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Explore Our Sleep Science Range
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-2 max-w-2xl">
              From medically certified orthopedic support to cool memory foam and ergonomic maternal care, find the exact mattress built for your anatomy.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover group"
          >
            <span>Browse Complete Catalog</span>
            <ArrowRight weight="bold" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-slate-200/80 flex flex-col justify-end min-h-[340px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-slate-200">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-85 group-hover:opacity-90 transition-opacity duration-300`} />
              </div>

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30 tracking-wide">
                  {cat.badge}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 p-6 text-white space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:translate-x-0.5 transition-transform">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 line-clamp-2 leading-relaxed">
                  {cat.tagline}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-white tracking-wider uppercase">
                  <span>Explore Models</span>
                  <ArrowRight weight="bold" className="transition-transform group-hover:translate-x-1.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
