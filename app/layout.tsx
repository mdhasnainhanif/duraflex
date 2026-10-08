import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppFloatButton, BackToTop } from '@/components/layout/FloatingButtons';
import { Toaster } from 'sonner';
import { JsonLd, buildOrganizationSchema, buildWebsiteSchema } from '@/components/seo/JsonLd';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} – Premium Mattresses in Pakistan`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'mattress Pakistan',
    'buy mattress online',
    'orthopedic mattress',
    'memory foam mattress',
    'king size mattress price',
    'foam mattress Lahore',
    'mattress Karachi',
    'Dura Flex',
    'medical mattress',
    'cooling gel mattress',
    'baby mattress',
    'maternity pillow',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} – Sleep Better. Live Better.`,
    description: SITE_CONFIG.description,
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: `${SITE_CONFIG.name} – Premium Mattresses` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} – Premium Mattresses in Pakistan`,
    description: SITE_CONFIG.description,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#5B65DC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} bg-[#F8F9FD] text-[#1a1a2e]`}
    >
      <body className="min-h-screen flex flex-col antialiased bg-[#F8F9FD] text-[#1a1a2e]">
        <JsonLd data={[buildOrganizationSchema(), buildWebsiteSchema()]} />

        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <AnnouncementBar />
        <Navbar />
        <MobileMenu />
        <CartDrawer />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <WhatsAppFloatButton />
        <BackToTop />
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontFamily: 'var(--font-inter)',
            },
          }}
        />
      </body>
    </html>
  );
}
