export interface Testimonial {
  id: string;
  author: string;
  city: string;
  rating: number;
  quote: string;
  product: string;
  avatar: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    author: 'Dr. Asad Rehman',
    city: 'Lahore',
    rating: 5,
    quote:
      'As a doctor, I was skeptical, but the Dura Ortho Medical has genuinely helped my patients with chronic back pain. I now recommend it professionally.',
    product: 'Dura Ortho Medical',
    avatar: '/images/avatars/avatar-1.jpg',
    verified: true,
  },
  {
    id: 't-2',
    author: 'Mariam Siddiqui',
    city: 'Karachi',
    rating: 5,
    quote:
      'The 100-night trial gave me the confidence to buy. Now 6 months later, I cannot imagine sleeping on anything else. Dura Flex has transformed my sleep!',
    product: 'Dura Cloud Pillow-Top',
    avatar: '/images/avatars/avatar-2.jpg',
    verified: true,
  },
  {
    id: 't-3',
    author: 'Tariq Mehmood',
    city: 'Islamabad',
    rating: 5,
    quote:
      'Ordered online, delivered in 3 days to Islamabad, great packaging, mattress is exactly as described. Very impressed with the whole experience.',
    product: 'Dura Foam Classic',
    avatar: '/images/avatars/avatar-3.jpg',
    verified: true,
  },
  {
    id: 't-4',
    author: 'Sana Butt',
    city: 'Rawalpindi',
    rating: 5,
    quote:
      'The Cool Gel mattress is a total summer lifesaver. Pakistani summers are brutal and I finally sleep through the night without waking up in a sweat.',
    product: 'Dura Cool Gel 7-Zone',
    avatar: '/images/avatars/avatar-4.jpg',
    verified: true,
  },
  {
    id: 't-5',
    author: 'Hassan Qureshi',
    city: 'Faisalabad',
    rating: 5,
    quote:
      'Bought the bundle deal – mattress, protector, and pillows. Saved quite a bit and everything arrived together. Would highly recommend the bundle!',
    product: 'Bundle Deal',
    avatar: '/images/avatars/avatar-5.jpg',
    verified: true,
  },
  {
    id: 't-6',
    author: 'Rabia Noor',
    city: 'Multan',
    rating: 5,
    quote:
      'The maternity pillow from Dura Mom was recommended by my gynaecologist. It has made my third trimester so much more comfortable. Worth every rupee.',
    product: 'Dura Mom Maternity Pillow',
    avatar: '/images/avatars/avatar-6.jpg',
    verified: true,
  },
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'how-to-choose-the-right-mattress-firmness',
    title: 'How to Choose the Right Mattress Firmness for Your Sleep Style',
    excerpt:
      'Discover which firmness level – Soft, Medium, or Firm – is best for your sleep position, body weight, and health needs. Our comprehensive guide makes it easy.',
    coverImage: '/images/blog/mattress-firmness.jpg',
    category: 'Sleep Science',
    author: 'Dr. Ayesha Malik',
    date: '2024-09-15',
    readTime: 5,
  },
  {
    id: 'blog-2',
    slug: 'best-mattress-for-back-pain-in-pakistan',
    title: 'Best Mattress for Back Pain in Pakistan – Expert Guide 2024',
    excerpt:
      'Back pain is one of the most common health complaints in Pakistan. Learn how the right mattress can significantly reduce chronic back pain and improve your sleep quality.',
    coverImage: '/images/blog/back-pain-mattress.jpg',
    category: 'Health & Wellness',
    author: 'Dura Flex Team',
    date: '2024-09-08',
    readTime: 7,
  },
  {
    id: 'blog-3',
    slug: 'how-to-clean-and-maintain-your-mattress',
    title: 'How to Clean & Maintain Your Mattress for Longer Life',
    excerpt:
      'A well-maintained mattress can last 10+ years. Follow our step-by-step guide to rotating, cleaning, and protecting your mattress investment.',
    coverImage: '/images/blog/mattress-care.jpg',
    category: 'Care Tips',
    author: 'Dura Flex Team',
    date: '2024-08-25',
    readTime: 4,
  },
];
