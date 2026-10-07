'use client';

import React from 'react';
import Link from 'next/link';
import { useUIStore } from '@/store/ui.store';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { LogoLink } from './Logo';
import {
  X,
  House,
  Info,
  ShoppingBag,
  Phone,
  Bed,
  Cloud,
  FirstAid,
  Brain,
  Snowflake,
  Sparkle,
  ShieldCheck,
  Heart,
  Baby,
  WhatsappLogo,
  CaretRight,
  BookOpen,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

const CATEGORY_ITEMS = [
  { slug: 'dura-foam', label: 'Dura Foam', icon: Bed },
  { slug: 'dura-cloud', label: 'Dura Cloud', icon: Cloud },
  { slug: 'dura-ortho', label: 'Dura Ortho', icon: FirstAid },
  { slug: 'memory-foam', label: 'Memory Foam', icon: Brain },
  { slug: 'cooling-gel', label: 'Cooling Gel', icon: Snowflake },
  { slug: 'pillows', label: 'Pillows', icon: Sparkle },
  { slug: 'accessories', label: 'Accessories', icon: ShieldCheck },
  { slug: 'dura-mom', label: 'Dura Mom', icon: Heart },
  { slug: 'dura-baby', label: 'Dura Baby', icon: Baby },
];

const NAV = [
  { href: '/', label: 'Home', icon: House },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/products', label: 'All Products', icon: ShoppingBag },
  { href: '/blog', label: 'Sleep Blog', icon: BookOpen },
  { href: '/contact', label: 'Contact Us', icon: Phone },
];

export const MobileMenu: React.FC = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const [categoriesExpanded, setCategoriesExpanded] = React.useState(false);
  useLockBodyScroll(isMobileMenuOpen);

  return (
    <>
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-[300]"
          onClick={closeMobileMenu}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 w-[320px] max-w-[85vw] bg-white z-[400] flex flex-col shadow-2xl transition-transform duration-300 ease-out',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <LogoLink onClick={closeMobileMenu} />
          <button
            type="button"
            onClick={closeMobileMenu}
            className="p-2 rounded-full hover:bg-primary-light transition-colors"
            aria-label="Close menu"
          >
            <X size={20} weight="bold" className="text-navy" />
          </button>
        </div>

        {/* Scrollable content */}
        <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
          {/* Main links */}
          <div className="px-4 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-navy hover:bg-primary-light hover:text-primary transition-colors"
              >
                <item.icon size={18} weight="fill" className="text-primary shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Categories accordion */}
          <div className="px-4 mt-4">
            <button
              type="button"
              onClick={() => setCategoriesExpanded((v) => !v)}
              className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-sm font-bold text-navy hover:bg-primary-light transition-colors"
            >
              <span className="flex items-center gap-3">
                <ShoppingBag size={18} weight="fill" className="text-primary" />
                Shop by Category
              </span>
              <CaretRight
                size={14}
                weight="bold"
                className={cn('text-muted transition-transform duration-200', categoriesExpanded && 'rotate-90')}
              />
            </button>

            {categoriesExpanded && (
              <div className="mt-1 ml-4 space-y-1">
                {CATEGORY_ITEMS.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-primary-light hover:text-primary transition-colors"
                  >
                    <cat.icon size={16} weight="fill" className="text-primary/70 shrink-0" />
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Footer CTA */}
        <div className="p-4 border-t border-border space-y-2">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] text-white text-sm font-bold hover:bg-[#1ebe57] transition-colors"
          >
            <WhatsappLogo size={18} weight="fill" />
            Chat on WhatsApp
          </a>
          <Link
            href="/build-your-bundle"
            onClick={closeMobileMenu}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors"
          >
            <ShoppingBag size={18} weight="fill" />
            Build Your Bundle
          </Link>
        </div>
      </aside>
    </>
  );
};
