'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductFilters, type FilterState } from '@/components/filters/ProductFilters';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { Sparkle, ArrowsDownUp } from '@phosphor-icons/react';
import type { ProductCategory } from '@/types/product';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'all';

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    firmness: 'all',
    minPrice: 0,
    maxPrice: 120000,
    size: 'all',
    sortBy: 'featured',
    searchQuery: '',
  });

  const handleReset = () => {
    setFilters({
      category: 'all',
      firmness: 'all',
      minPrice: 0,
      maxPrice: 120000,
      size: 'all',
      sortBy: 'featured',
      searchQuery: '',
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (filters.category !== 'all' && p.category !== filters.category) {
          return false;
        }
        // Firmness
        if (filters.firmness !== 'all' && p.firmness !== filters.firmness) {
          return false;
        }
        // Price
        const effectivePrice = p.salePrice ?? p.basePrice;
        if (effectivePrice > filters.maxPrice) {
          return false;
        }
        // Search Query
        if (filters.searchQuery.trim() !== '') {
          const q = filters.searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }
        // Size
        if (filters.size !== 'all') {
          const hasSize = p.variants?.sizes?.some((s) => s.label === filters.size);
          if (!hasSize) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.basePrice;
        const priceB = b.salePrice ?? b.basePrice;

        if (filters.sortBy === 'price-asc') return priceA - priceB;
        if (filters.sortBy === 'price-desc') return priceB - priceA;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'popular') return b.reviewCount - a.reviewCount;
        return 0; // featured default
      });
  }, [filters]);

  return (
    <div className="bg-[#F8F9FD] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkle weight="fill" />
            <span>Complete Sleep Range</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
            Premium Mattresses & Sleep Gear
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
            Choose from doctor-recommended orthopedic designs, cooling gel memory foam, and luxury pillow-tops with 100-night trial and free doorstep delivery in Pakistan.
          </p>
        </div>

        {/* Catalog Layout: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Filters Sidebar */}
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
            totalResults={filteredProducts.length}
          />

          {/* Main Products Area */}
          <div className="flex-1 w-full">
            
            {/* Top Bar: Sort & Counter */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 mb-6 shadow-sm">
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                Showing <strong className="text-navy">{filteredProducts.length}</strong> mattresses & accessories
              </span>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowsDownUp size={16} className="text-slate-400" />
                <span className="text-xs font-medium text-slate-500">Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as FilterState['sortBy'],
                    }))
                  }
                  className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 border-none focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Collections</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Products Grid or Empty State */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <p className="text-4xl mb-3">🛏️</p>
                <h3 className="text-lg font-bold text-slate-800">No matching products found</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Try broadening your price range or resetting your selected category filters.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-hover transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-20 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-slate-600">Loading catalog...</p>
          </div>
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
