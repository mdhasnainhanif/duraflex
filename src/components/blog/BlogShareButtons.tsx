'use client';

import React, { useState } from 'react';
import { WhatsappLogo, FacebookLogo, TwitterLogo, Link as LinkIcon, Check } from '@phosphor-icons/react';

interface BlogShareButtonsProps {
  title: string;
  slug: string;
}

export const BlogShareButtons: React.FC<BlogShareButtonsProps> = ({ title, slug }) => {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return `https://duraflex.pk/blog/${slug}`;
  };

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareText = encodeURIComponent(`${title} - Read more on Dura Flex: `);
  const shareUrl = encodeURIComponent(getUrl());

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Share:</span>
      
      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors shadow-sm"
      >
        <WhatsappLogo weight="fill" size={17} />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="w-8 h-8 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-colors shadow-sm"
      >
        <FacebookLogo weight="fill" size={17} />
      </a>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
        className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-colors shadow-sm"
      >
        <TwitterLogo weight="fill" size={17} />
      </a>

      {/* Copy link */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy article link"
        className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
          copied
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }`}
      >
        {copied ? (
          <>
            <Check weight="bold" size={13} />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon weight="bold" size={13} />
            <span className="hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
};
