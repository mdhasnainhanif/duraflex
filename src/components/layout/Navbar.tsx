'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MagnifyingGlass,
  User,
  Heart,
  ShoppingCart,
  List,
  Bed,
  Cloud,
  FirstAid,
  Brain,
  Snowflake,
  Sparkle,
  ShieldCheck,
  House,
  Heart as HeartIcon,
  Baby,
  CaretDown,
  Truck,
  X,
} from '@phosphor-icons/react';
import { LogoLink } from './Logo';
import { useCartStore } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';
import { useUIStore } from '@/store/ui.store';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

const CATEGORY_NAV_ITEMS = [
  { slug: 'dura-foam', label: 'Dura Foam', icon: Bed },
  { slug: 'dura-cloud', label: 'Dura Cloud', icon: Cloud },
  { slug: 'dura-ortho', label: 'Dura Ortho', icon: FirstAid },
  { slug: 'memory-foam', label: 'Memory Foam', icon: Brain },
  { slug: 'cooling-gel', label: 'Cooling Gel', icon: Snowflake },
  { slug: 'pillows', label: 'Pillows', icon: Sparkle },
  { slug: 'accessories', label: 'Accessories', icon: ShieldCheck },
  { slug: 'bed-frames', label: 'Bed Frames', icon: House },
  { slug: 'dura-mom', label: 'Dura Mom', icon: HeartIcon },
  { slug: 'dura-baby', label: 'Dura Baby', icon: Baby },
];

const MegaMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] max-w-[95vw] mt-2 rounded-2xl shadow-xl border border-border glass z-50 p-6 grid grid-cols-4 gap-6">
    {/* Categories Column */}
    <div className="col-span-2">
      <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Shop by Category</p>
      <div className="grid grid-cols-2 gap-1">
        {CATEGORY_NAV_ITEMS.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-navy hover:bg-primary-light hover:text-primary transition-colors"
          >
            <cat.icon size={16} weight="fill" className="text-primary shrink-0" />
            {cat.label}
          </Link>
        ))}
      </div>
    </div>

    {/* Shop by Size */}
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Shop by Size</p>
      <div className="space-y-1">
        {[
          { label: 'Single', size: '78×36"' },
          { label: 'Single XL', size: '78×42"' },
          { label: 'Double', size: '78×60"' },
          { label: 'Queen', size: '78×66"' },
          { label: 'King', size: '78×72"' },
        ].map((s) => (
          <Link
            key={s.label}
            href={`/products?size=${s.size}`}
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-navy hover:bg-primary-light hover:text-primary transition-colors"
          >
            <span>{s.label}</span>
            <span className="text-xs text-muted">{s.size}</span>
          </Link>
        ))}
      </div>
    </div>

    {/* Bundle CTA */}
    <div className="flex flex-col justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Special</p>
        <Link
          href="/build-your-bundle"
          onClick={onClose}
          className="flex flex-col items-start gap-2 bg-primary rounded-2xl p-4 text-white hover:bg-primary-hover transition-colors"
        >
          <ShoppingCart size={24} weight="fill" />
          <span className="font-bold text-sm">Build Your Bundle</span>
          <span className="text-xs text-white/80">Save up to 10% on 7+ items</span>
        </Link>
      </div>
      <Link
        href="/products"
        onClick={onClose}
        className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-primary hover:bg-primary-light transition-colors"
      >
        View all products →
      </Link>
    </div>
  </div>
);

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);
  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const { openCart, openMobileMenu, openSearch } = useUIStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className={cn('sticky top-0 z-[200] transition-all duration-300', scrolled ? 'glass shadow-md' : 'bg-white border-b border-border')}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main navbar row */}
        <nav className={cn('flex items-center gap-6 transition-all duration-300', scrolled ? 'h-16' : 'h-20')} aria-label="Main navigation">
          {/* Logo */}
          <LogoLink className="mr-4" />

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1 flex-1" role="menubar">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const hasMegaMenu = 'hasMegaMenu' in link && link.hasMegaMenu;

              return (
                <li key={link.href} className="relative" role="none" ref={hasMegaMenu ? megaRef : undefined}>
                  {hasMegaMenu ? (
                    <button
                      type="button"
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-all',
                        isActive || megaMenuOpen
                          ? 'text-primary bg-primary-light'
                          : 'text-foreground hover:text-primary hover:bg-primary-light'
                      )}
                      onClick={() => setMegaMenuOpen((v) => !v)}
                      aria-haspopup="true"
                      aria-expanded={megaMenuOpen}
                      role="menuitem"
                    >
                      {link.label}
                      <CaretDown
                        size={14}
                        weight="bold"
                        className={cn('transition-transform duration-200', megaMenuOpen && 'rotate-180')}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      role="menuitem"
                      className={cn(
                        'relative flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all',
                        isActive
                          ? 'text-primary bg-primary-light'
                          : 'text-foreground hover:text-primary hover:bg-primary-light'
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bg-primary rounded-full" />
                      )}
                    </Link>
                  )}
                  {hasMegaMenu && megaMenuOpen && (
                    <MegaMenu onClose={() => setMegaMenuOpen(false)} />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right side icons */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Search */}
            <button
              type="button"
              onClick={openSearch}
              className="p-2.5 rounded-full text-foreground hover:text-primary hover:bg-primary-light transition-colors"
              aria-label="Open search"
            >
              <MagnifyingGlass size={20} weight="fill" />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="hidden sm:flex p-2.5 rounded-full text-foreground hover:text-primary hover:bg-primary-light transition-colors"
              aria-label="My account"
            >
              <User size={20} weight="fill" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-full text-foreground hover:text-primary hover:bg-primary-light transition-colors"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart size={20} weight="fill" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={openCart}
              className="relative p-2.5 rounded-full text-foreground hover:text-primary hover:bg-primary-light transition-colors"
              aria-label={`Shopping cart (${itemCount} items)`}
            >
              <ShoppingCart size={20} weight="fill" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center cart-badge">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={openMobileMenu}
              className="lg:hidden p-2.5 rounded-full text-foreground hover:text-primary hover:bg-primary-light transition-colors ml-1"
              aria-label="Open menu"
            >
              <List size={22} weight="fill" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
