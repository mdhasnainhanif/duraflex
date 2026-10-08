'use client';

import React from 'react';
import Link from 'next/link';
import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  WhatsappLogo,
  Phone,
  Envelope,
  MapPin,
  Clock,
  Package,
  ShieldCheck,
  Moon,
  Truck,
  ArrowRight,
} from '@phosphor-icons/react';
import { LogoLink } from './Logo';
import { SITE_CONFIG } from '@/lib/constants';
import { Container } from '@/components/ui/Container';

const footerLinks = {
  shop: [
    { label: 'Dura Foam Classic', href: '/products?category=dura-foam' },
    { label: 'Dura Cloud Pillow-Top', href: '/products?category=dura-cloud' },
    { label: 'Dura Ortho Medical', href: '/products?category=dura-ortho' },
    { label: 'Memory Foam', href: '/products?category=memory-foam' },
    { label: 'Cooling Gel', href: '/products?category=cooling-gel' },
    { label: 'Pillows', href: '/products?category=pillows' },
    { label: 'Accessories', href: '/products?category=accessories' },
    { label: 'Bed Frames', href: '/products?category=bed-frames' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  customerCare: [
    { label: 'Shipping & Delivery', href: '/terms-and-conditions#delivery' },
    { label: 'Returns & Exchange', href: '/terms-and-conditions#returns' },
    { label: '10-Year Warranty', href: '/terms-and-conditions#warranty' },
    { label: 'FAQs', href: '/#faq' },
    { label: 'Size Guide', href: '/products#size-guide' },
    { label: 'Build Your Bundle', href: '/build-your-bundle' },
  ],
  legal: [
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ],
};

const trustBadges = [
  { icon: Truck, label: 'Free Delivery', sub: 'On orders above Rs. 25,000' },
  { icon: Moon, label: '100-Night Trial', sub: 'Love it or return it' },
  { icon: ShieldCheck, label: '10-Year Warranty', sub: 'On all mattresses' },
  { icon: Package, label: 'Cash on Delivery', sub: 'Across Pakistan' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white" aria-label="Site footer">
      {/* Trust badges strip */}
      <div className="border-b border-white/10">
        <Container className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <badge.icon size={24} weight="fill" className="text-primary-300" />
                </div>
                <div>
                  <p className="font-bold text-sm">{badge.label}</p>
                  <p className="text-xs text-white/60">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Main footer */}
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand block */}
          <div className="lg:col-span-2 space-y-5">
            <LogoLink variant="light" />
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Pakistan&apos;s premium mattress brand. We believe sleep is the foundation of a healthy life – that&apos;s why we craft every mattress with care, science, and passion.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { href: SITE_CONFIG.social.facebook, icon: FacebookLogo, label: 'Facebook' },
                { href: SITE_CONFIG.social.instagram, icon: InstagramLogo, label: 'Instagram' },
                { href: SITE_CONFIG.social.tiktok, icon: TiktokLogo, label: 'TikTok' },
                { href: SITE_CONFIG.social.youtube, icon: YoutubeLogo, label: 'YouTube' },
                { href: SITE_CONFIG.social.whatsapp, icon: WhatsappLogo, label: 'WhatsApp' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} weight="fill" />
                </a>
              ))}
            </div>

            {/* Contact card */}
            <div className="space-y-2.5 text-sm text-white/70">
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} weight="fill" className="text-primary-300" />
                {SITE_CONFIG.phone}
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <WhatsappLogo size={14} weight="fill" className="text-[#25D366]" />
                WhatsApp: {SITE_CONFIG.phone}
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Envelope size={14} weight="fill" className="text-primary-300" />
                {SITE_CONFIG.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={14} weight="fill" className="text-primary-300 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} weight="fill" className="text-primary-300" />
                {SITE_CONFIG.workingHours}
              </div>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-white/90">Shop</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1 group">
                    <ArrowRight size={12} weight="fill" className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-white/90">Customer Care</h3>
            <ul className="space-y-2.5">
              {footerLinks.customerCare.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1 group">
                    <ArrowRight size={12} weight="fill" className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Legal + Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-white/90">Company</h3>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-white/90">Legal</h3>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment methods */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-3 text-white/90">We Accept</h3>
              <div className="flex flex-wrap gap-2">
                {['COD', 'JazzCash', 'Easypaisa', 'Bank Transfer'].map((method) => (
                  <span key={method} className="text-xs bg-white/10 px-2 py-1 rounded-lg text-white/70">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-lg">Get sleep tips & exclusive offers</h3>
              <p className="text-sm text-white/60 mt-1">Subscribe and get 10% off your first order</p>
            </div>
            <form className="flex gap-2 w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-primary"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2025 Dura Flex. All rights reserved. Made with ❤️ in Pakistan.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};
