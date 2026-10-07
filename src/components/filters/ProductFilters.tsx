'use client';

import React from 'react';
import {
  Funnel,
  X,
  ArrowsDownUp,
  MagnifyingGlass,
  Check,
} from '@phosphor-icons/react';
import type { ProductCategory, FirmnessLevel } from '@/types/product';

export interface FilterState {
  category: ProductCategory | 'all';
  firmness: FirmnessLevel | 'all';
  minPrice: number;
  maxPrice: number;
  size: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
  searchQuery: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const CATEGORY_OPTIONS: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'dura-ortho', label: 'Orthopedic Mattresses' },
  { id: 'cooling-gel', label: 'Cooling Gel Foam' },
  { id: 'memory-foam', label: 'Memory Foam' },
  { id: 'dura-cloud', label: 'Dura Cloud Plush' },
  { id: 'dura-foam', label: 'Dura Foam Classic' },
  { id: 'pillows', label: 'Ergonomic Pillows' },
  { id: 'accessories', label: 'Protectors & Bedding' },
  { id: 'dura-mom', label: 'Dura Mom (Maternity)' },
  { id: 'dura-baby', label: 'Dura Baby (Cribs)' },
];

const FIRMNESS_OPTIONS: { id: FirmnessLevel | 'all'; label: string }[] = [
  { id: 'all', label: 'Any Firmness' },
  { id: 'Soft', label: 'Plush / Soft (1-4)' },
  { id: 'Medium', label: 'Medium (5-6)' },
  { id: 'Medium-Firm', label: 'Medium-Firm (7-8)' },
  { id: 'Firm', label: 'Extra Firm (8-10)' },
];

const SIZE_OPTIONS = [
  { id: 'all', label: 'Any Size' },
  { id: '78x36', label: 'Single (78" x 36")' },
  { id: '78x42', label: 'Single Extra (78" x 42")' },
  { id: '78x60', label: 'Semi-Double (78" x 60")' },
  { id: '78x66', label: 'Queen (78" x 66")' },
  { id: '78x72', label: 'King (78" x 72")' },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const update = (updates: Partial<FilterState>) => {
    onChange({ ...filters, ...updates });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.firmness !== 'all' ||
    filters.size !== 'all' ||
    filters.maxPrice < 120000 ||
    filters.searchQuery !== '';

  const FilterBody = (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
          Search Products
        </label>
        <div className="relative">
          <MagnifyingGlass
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => update({ searchQuery: e.target.value })}
            placeholder="e.g. Ortho, Cool Gel, Pillow..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => update({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
          Sleep Category
        </label>
        <div className="space-y-1">
          {CATEGORY_OPTIONS.map((c) => {
            const active = filters.category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => update({ category: c.id })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left ${
                  active
                    ? 'bg-primary text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{c.label}</span>
                {active && <Check weight="bold" size={14} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Firmness */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
          Firmness Level
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {FIRMNESS_OPTIONS.map((f) => {
            const active = filters.firmness === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => update({ firmness: f.id })}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-colors ${
                  active
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span>{f.label}</span>
                {active && <span className="w-2 h-2 rounded-full bg-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bed Size */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
          Mattress Dimension
        </label>
        <div className="space-y-1">
          {SIZE_OPTIONS.map((s) => {
            const active = filters.size === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => update({ size: s.id })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                  active
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span>{s.label}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Max Budget
          </label>
          <span className="text-xs font-bold text-primary">
            Rs. {filters.maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={5000}
          max={120000}
          step={5000}
          value={filters.maxPrice}
          onChange={(e) => update({ maxPrice: Number(e.target.value) })}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>Rs. 5,000</span>
          <span>Rs. 120,000+</span>
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm sticky top-28 h-fit">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Funnel weight="bold" className="text-primary" />
            <h3 className="font-extrabold text-slate-900 text-base">Filters</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {totalResults} items
          </span>
        </div>
        {FilterBody}
      </aside>

      {/* Mobile Trigger Button */}
      <div className="lg:hidden flex items-center justify-between gap-3 w-full bg-white p-3 rounded-2xl border border-slate-200 mb-6 shadow-sm">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors"
        >
          <Funnel weight="bold" className="text-primary" />
          <span>Filters {hasActiveFilters && '• Active'}</span>
        </button>

        <span className="text-xs font-medium text-slate-500">
          {totalResults} products found
        </span>
      </div>

      {/* Mobile Drawer Modal */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Funnel weight="bold" className="text-primary" />
                  <h3 className="font-bold text-slate-900 text-base">Filter Products</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>
              {FilterBody}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="mt-6 w-full py-3 bg-navy text-white font-bold rounded-2xl text-sm"
            >
              Apply Filters ({totalResults} Results)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
