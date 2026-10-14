'use client';

import React, { useState, useMemo } from 'react';
import { MagnifyingGlass, Funnel, Sparkle, WhatsappLogo } from '@phosphor-icons/react';
import { BlogCard } from './BlogCard';
import type { BlogPostItem } from '@/data/blogs';
import { BLOG_CATEGORIES } from '@/data/blogs';
import { SITE_CONFIG } from '@/lib/constants';

interface BlogListClientProps {
  initialPosts: BlogPostItem[];
}

export const BlogListClient: React.FC<BlogListClientProps> = ({ initialPosts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    // If no search is applied and viewing 'All', show the first as featured
    if (selectedCategory === 'All' && !searchQuery) {
      return initialPosts[0];
    }
    return null;
  }, [initialPosts, selectedCategory, searchQuery]);

  const gridPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  return (
    <div className="w-full">
      {/* Search and Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Funnel size={16} className="text-slate-400 shrink-0 hidden sm:block ml-1" />
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <MagnifyingGlass
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search guides, advice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-slate-50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Featured Spotlight (when active) */}
      {featuredPost && (
        <BlogCard post={featuredPost} featured={true} />
      )}

      {/* Articles Grid */}
      {gridPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8">
          <Sparkle size={36} className="text-primary mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">No articles found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            We couldn’t find any sleep guides matching &ldquo;{searchQuery}&rdquo;. Try another search keyword or reset filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Sleep Specialist WhatsApp Assistance Banner */}
      <div className="mt-16 bg-gradient-to-r from-primary to-indigo-700 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-white/20 backdrop-blur-sm mb-3">
            Free Orthopedic Consultation
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold mb-2 text-white">
            Have a Specific Spine or Sleep Concern?
          </h3>
          <p className="text-sm text-white/80 leading-relaxed">
            Our sleep advisors and orthopedic consultants in Lahore and Karachi are ready to recommend the ideal mattress density and posture setup for your health.
          </p>
        </div>

        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
            'Hi Dura Flex! I was reading your sleep blog and had a question about mattress firmness and orthopedic support.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-extrabold text-sm hover:brightness-105 shadow-md transition-all hover:scale-105"
        >
          <WhatsappLogo weight="fill" size={20} />
          Ask Sleep Doctor on WhatsApp
        </a>
      </div>
    </div>
  );
};
