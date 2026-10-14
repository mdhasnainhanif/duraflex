'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CaretRight,
  Clock,
  Calendar,
  CheckCircle,
  Lightbulb,
  WhatsappLogo,
  ArrowLeft,
  ShoppingBag,
  Question,
} from '@phosphor-icons/react';
import type { BlogPostItem } from '@/data/blogs';
import { BlogCard } from './BlogCard';
import { BlogShareButtons } from './BlogShareButtons';
import { SITE_CONFIG } from '@/lib/constants';

interface BlogPostDetailClientProps {
  post: BlogPostItem;
  relatedPosts: BlogPostItem[];
}

export const BlogPostDetailClient: React.FC<BlogPostDetailClientProps> = ({
  post,
  relatedPosts,
}) => {
  return (
    <div className="w-full">
      {/* Top Header / Breadcrumb */}
      <section className="bg-white border-b border-slate-200/80 pt-8 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <CaretRight size={12} />
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <CaretRight size={12} />
            <span className="text-slate-900 truncate max-w-[240px] sm:max-w-md">
              {post.title}
            </span>
          </nav>

          {/* Category & Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {post.publishedAt}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author row & Social Share */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center text-base ring-2 ring-primary/20">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{post.author.name}</p>
                <p className="text-xs text-slate-500">{post.author.role}</p>
              </div>
            </div>

            <BlogShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>
      </section>

      {/* Main Article Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Cover Image */}
        <div className="relative w-full h-64 sm:h-96 md:h-[460px] rounded-3xl overflow-hidden shadow-md mb-10 bg-slate-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        {/* Key Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="bg-primary/5 rounded-3xl p-6 sm:p-8 border border-primary/20 mb-12 shadow-sm">
            <div className="flex items-center gap-2.5 text-primary font-bold text-base sm:text-lg mb-4">
              <Lightbulb weight="fill" size={22} className="text-amber-500" />
              <span>Key Takeaways & Quick Summary</span>
            </div>
            <ul className="space-y-3">
              {post.keyTakeaways.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                  <CheckCircle weight="fill" size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Content Body */}
        <article className="space-y-12">
          {post.sections.map((section, idx) => (
            <section key={idx} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}

              {section.bulletPoints && (
                <ul className="mt-4 space-y-2.5 pl-2">
                  {section.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.callout && (
                <div className="mt-6 bg-slate-50 border-l-4 border-primary rounded-r-2xl p-4 sm:p-5 text-sm sm:text-base text-slate-800 font-medium leading-relaxed italic">
                  {section.callout}
                </div>
              )}
            </section>
          ))}
        </article>

        {/* Featured Product Recommendation Box */}
        {post.relatedProductSlug && (
          <div className="mt-12 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary text-white mb-2">
                Expert Recommendation
              </span>
              <h3 className="text-lg sm:text-xl font-bold mb-1 text-white">
                {post.relatedProductName ?? 'Featured Dura Flex Mattress'}
              </h3>
              <p className="text-sm text-slate-300 max-w-lg">
                Engineered with high-density pressure-relieving core and 100-night risk-free trial. Recommended by orthopedic consultants.
              </p>
            </div>

            <Link
              href={`/products/${post.relatedProductSlug}`}
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 hover:bg-primary-light hover:text-primary font-bold text-sm transition-colors shadow-md"
            >
              <ShoppingBag weight="bold" size={18} />
              <span>Explore Mattress</span>
            </Link>
          </div>
        )}

        {/* FAQ Section */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-2 text-primary font-bold text-base sm:text-lg mb-6">
              <Question weight="fill" size={22} />
              <span>Frequently Asked Questions</span>
            </div>

            <div className="space-y-4">
              {post.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Box */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center text-2xl shrink-0 ring-4 ring-primary/10">
            {post.author.name.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-extrabold text-slate-900 text-base">
              Written by {post.author.name}
            </h4>
            <p className="text-xs text-primary font-bold mb-1.5">{post.author.role}</p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Contributing specialist at Dura Flex Sleep Research Lab, passionate about educating Pakistani households on spine ergonomics, sleep hygiene, and mattress longevity.
            </p>
          </div>
        </div>

        {/* WhatsApp Consultation Banner */}
        <div className="mt-10 bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-1">
              Still have questions about this topic?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Speak directly with our sleep experts on WhatsApp for personalized mattress advice.
            </p>
          </div>

          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              `Hi Dura Flex! I was reading "${post.title}" and wanted to ask a question.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs sm:text-sm shadow-md hover:brightness-105 transition-all"
          >
            <WhatsappLogo weight="fill" size={18} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center sm:text-left">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft weight="bold" size={14} />
            <span>← Back to All Sleep Guides</span>
          </Link>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-8">
              Related Sleep Guides & Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <BlogCard key={rPost.id} post={rPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
