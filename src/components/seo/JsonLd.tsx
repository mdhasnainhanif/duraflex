import * as React from 'react';
import { SITE_CONFIG } from '@/lib/constants';

interface JsonLdProps {
  data: object | object[];
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(Array.isArray(data) ? data : data) }}
  />
);

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dura Flex',
    url: 'https://duraflex.pk',
    logo: 'https://duraflex.pk/images/logo.png',
    sameAs: [
      'https://facebook.com/duraflex',
      'https://instagram.com/duraflex',
      'https://tiktok.com/@duraflex',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.phone,
      contactType: 'customer service',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu'],
    },
  };
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Dura Flex',
    description: "Pakistan's premium mattress brand selling foam, orthopedic, and memory foam mattresses.",
    url: 'https://duraflex.pk',
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ayesha Manzil',
      addressLocality: 'Karachi',
      addressCountry: 'PK',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '21:00',
    },
    priceRange: 'Rs. 17,500 – Rs. 91,000+',
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dura Flex',
    url: 'https://duraflex.pk',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://duraflex.pk/products?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildProductSchema(product: {
  name: string;
  description: string;
  image: string;
  slug: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  brand?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `https://duraflex.pk${product.image}`,
    url: `https://duraflex.pk/products/${product.slug}`,
    brand: { '@type': 'Brand', name: product.brand ?? 'Dura Flex' },
    offers: {
      '@type': 'Offer',
      price: product.salePrice ?? product.price,
      priceCurrency: 'PKR',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Dura Flex' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function buildBreadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://duraflex.pk${item.href}`,
    })),
  };
}
