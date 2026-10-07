export const SITE_CONFIG = {
  name: 'Dura Flex',
  tagline: 'Sleep Better. Live Better.',
  description:
    'Pakistan\'s premium mattress brand. Shop foam, orthopedic, memory foam, cooling gel mattresses, pillows and sleep accessories. Free delivery, 100-night trial, 10-year warranty.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://duraflex.pk',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '923132183210',
  email: 'hello@duraflex.pk',
  phone: '+92 313 2183210',
  address: 'Ayesha Manzil, Karachi, Pakistan',
  workingHours: 'Mon–Sat: 9:00 AM – 9:00 PM',
  social: {
    facebook: 'https://facebook.com/duraflex',
    instagram: 'https://instagram.com/duraflex',
    tiktok: 'https://tiktok.com/@duraflex',
    youtube: 'https://youtube.com/@duraflex',
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '923132183210'}`,
  },
} as const;

export const DELIVERY_FREE_THRESHOLD = 25_000; // PKR
export const FREE_DELIVERY_LABEL = 'Free delivery on orders above Rs. 25,000';
export const DELIVERY_FEE = 500; // PKR flat rate below threshold

export const COUPON_CODES: Record<string, { discountType: 'percentage' | 'fixed'; discountValue: number }> = {
  DURA10: { discountType: 'percentage', discountValue: 10 },
  DURA500: { discountType: 'fixed', discountValue: 500 },
  SLEEP20: { discountType: 'percentage', discountValue: 20 },
};

export const BUNDLE_TIERS = [
  { minItems: 3, discountPercent: 5 },
  { minItems: 5, discountPercent: 8 },
  { minItems: 7, discountPercent: 10 },
];

export const MAX_BUNDLE_ITEMS = 13;
export const MIN_BUNDLE_ITEMS = 1;

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Other',
] as const;

export const ANNOUNCEMENT_MESSAGES = [
  `🚚 ${FREE_DELIVERY_LABEL}`,
  '📦 Cash on Delivery available across Pakistan',
  '🛡️ 10-Year warranty on all mattresses',
  '😴 100-Night free trial – Love it or return it',
  '💳 Easy installments via JazzCash & Easypaisa',
] as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products', hasMegaMenu: true },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
] as const;

export const CATEGORY_NAV = [
  { slug: 'dura-foam', label: 'Dura Foam', icon: 'bed' },
  { slug: 'dura-cloud', label: 'Dura Cloud', icon: 'cloud' },
  { slug: 'dura-ortho', label: 'Dura Ortho', icon: 'first-aid-kit' },
  { slug: 'memory-foam', label: 'Memory Foam', icon: 'brain' },
  { slug: 'cooling-gel', label: 'Cooling Gel', icon: 'snowflake' },
  { slug: 'pillows', label: 'Pillows', icon: 'pillow' },
  { slug: 'accessories', label: 'Accessories', icon: 'shield-check' },
  { slug: 'bed-frames', label: 'Bed Frames', icon: 'house' },
  { slug: 'dura-mom', label: 'Dura Mom', icon: 'heart' },
  { slug: 'dura-baby', label: 'Dura Baby', icon: 'baby' },
] as const;

export const SIZE_OPTIONS = [
  { label: 'Single', dimensions: '78" × 36"', sizeKey: '78x36', description: 'Perfect for children or single adults' },
  { label: 'Single XL', dimensions: '78" × 42"', sizeKey: '78x42', description: 'Extra width for comfortable single sleep' },
  { label: 'Double', dimensions: '78" × 60"', sizeKey: '78x60', description: 'Ideal for couples or guest rooms' },
  { label: 'Queen', dimensions: '78" × 66"', sizeKey: '78x66', description: 'Premium comfort for couples' },
  { label: 'King', dimensions: '78" × 72"', sizeKey: '78x72', description: 'Maximum luxury space' },
] as const;

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'price-asc', label: 'Lowest Price' },
  { value: 'price-desc', label: 'Highest Price' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Old to New' },
  { value: 'top-rated', label: 'Top Rated' },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]['value'];
