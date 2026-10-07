'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkle, ArrowRight } from '@phosphor-icons/react';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import type { ProductCategory } from '@/types/product';

const TABS: { id: string; label: string; category?: ProductCategory }[] = [
  { id: 'all', label: 'All Bestsellers' },
  { id: 'ortho', label: 'Orthopedic Support', category: 'dura-ortho' },
  { id: 'cooling', label: 'Cooling Gel', category: 'cooling-gel' },
  { id: 'memory', label: 'Memory Foam', category: 'memory-foam' },
  { id: 'pillows', label: 'Ergonomic Pillows', category: 'pillows' },
];

export const BestSellersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    const tabObj = TABS.find((t) => t.id === activeTab);
    return tabObj?.category ? p.category === tabObj.category : true;
  }).slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-white" id="bestsellers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkle weight="fill" />
            <span>Customer Favorites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Pakistan&apos;s Most-Loved Mattresses
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Tested and rated 4.8+ stars by over 12,000 households. Crafted for superior pressure relief, zero heat retention, and lifetime durability.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-navy text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-primary transition-all shadow-md hover:shadow-lg group"
          >
            <span>Explore All 24+ Mattress Models</span>
            <ArrowRight weight="bold" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};
