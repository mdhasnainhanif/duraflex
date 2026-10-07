import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogs } from '@/data/blogs';
import { BlogListClient } from '@/components/blog/BlogListClient';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Mattress Guides & Sleep Health Blog | ${SITE_CONFIG.name}`,
  description:
    'Expert mattress buying guides, orthopedic spine advice, sleep posture tips, and care recommendations from Pakistan’s sleep science specialists.',
  openGraph: {
    title: `Mattress Guides & Sleep Health Blog | ${SITE_CONFIG.name}`,
    description:
      'Expert mattress buying guides, orthopedic spine advice, and sleep tips from Dura Flex.',
    url: `${SITE_CONFIG.url}/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogs();

  return (
    <main className="min-h-screen bg-[#F8F9FD] pb-24">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200/80 pt-10 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-slate-400">›</span>
            <span className="text-slate-900">Sleep Health & Guides</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM32,64H120V192H32ZM224,192H136V64h88Z" />
              </svg>
              <span>Dura Flex Sleep Journal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Better Sleep Starts With Expert Knowledge
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore medical-backed mattress guides, orthopedic spine advice, and practical sleep tips curated by our sleep consultants in Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BlogListClient initialPosts={posts} />
      </section>
    </main>
  );
}
