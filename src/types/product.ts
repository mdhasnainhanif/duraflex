export type FirmnessLevel = 'Soft' | 'Medium' | 'Medium-Firm' | 'Firm';
export type MattressType = 'Foam' | 'Memory Foam' | 'Orthopedic' | 'Cooling Gel' | 'Hybrid';
export type ProductCategory =
  | 'dura-foam'
  | 'dura-cloud'
  | 'dura-ortho'
  | 'memory-foam'
  | 'cooling-gel'
  | 'pillows'
  | 'accessories'
  | 'bed-frames'
  | 'dura-mom'
  | 'dura-baby';

export type ProductBadge = 'Sale' | 'New' | 'Best Seller' | '2-in-1' | 'Trending' | 'Limited';
export type SizeOption = '78x36' | '78x42' | '78x60' | '78x66' | '78x72' | 'Custom';
export type ThicknessOption = '4"' | '5"' | '6"' | '8"' | '10"' | '12"';

export interface ProductVariantSize {
  label: SizeOption;
  displayName: string;
  priceModifier: number;
}

export interface ProductVariantThickness {
  label: ThicknessOption;
  priceModifier: number;
}

export interface ProductVariantStyle {
  label: string;
  priceModifier: number;
}

export interface ProductVariants {
  sizes: ProductVariantSize[];
  thicknesses: ProductVariantThickness[];
  styles: ProductVariantStyle[];
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  type: MattressType | 'Pillow' | 'Accessory' | 'Bed Frame' | 'Bedding';
  shortDescription: string;
  description: string;
  images: ProductImage[];
  basePrice: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  badges: ProductBadge[];
  firmness?: FirmnessLevel;
  features: string[];
  variants: ProductVariants;
  stock: number;
  createdAt: string;
  soldCount: number;
  specifications?: Record<string, string>;
  warranty?: string;
  trialNights?: number;
  bestFor?: string[];
  layers?: ProductLayer[];
}

export interface ProductLayer {
  name: string;
  thickness: string;
  color: string;
  description: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  date: string;
  helpful: number;
}
