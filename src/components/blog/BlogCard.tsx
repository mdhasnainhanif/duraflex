import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, BookmarkSimple } from '@phosphor-icons/react';
import type { BlogPostItem } from '@/data/blogs';

interface BlogCardProps {
  post: BlogPostItem;
  featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  if (featured) {
    return (
      <article className="group relative bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 mb-12">
        {/* Cover Image */}
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[320px] overflow-hidden bg-slate-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-primary text-white shadow-md">
              <BookmarkSimple weight="fill" size={13} />
              Featured Story
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
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

            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-primary transition-colors leading-tight mb-4">
                {post.title}
              </h2>
            </Link>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm ring-2 ring-primary/20">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{post.author.name}</p>
                <p className="text-[11px] text-slate-500 line-clamp-1">{post.author.role}</p>
              </div>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
            >
              Read Article
              <ArrowRight weight="bold" size={14} />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1">
      {/* Thumbnail */}
      <Link href={`/blog/${post.slug}`} className="relative h-52 w-full overflow-hidden bg-slate-100 block">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-800 backdrop-blur-md shadow-sm">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1 font-medium">
              <Clock size={13} />
              {post.readTime} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {post.publishedAt}
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2.5">
              {post.title}
            </h3>
          </Link>

          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
              {post.author.name.charAt(0)}
            </div>
            <span className="text-xs font-semibold text-slate-700">{post.author.name}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
          >
            Read
            <ArrowRight weight="bold" size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
};
