'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingCart,
  WhatsappLogo,
  ShieldCheck,
  Truck,
  Moon,
  ArrowsClockwise,
  CheckCircle,
  Star,
  CaretRight,
  Sparkle,
  Ruler,
  Info,
} from '@phosphor-icons/react';
import { useCartStore } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';
import { useUIStore } from '@/store/ui.store';
import { Button } from '@/components/ui/Button';
import { Rating } from '@/components/ui/Rating';
import { formatPrice, getDiscountPercent } from '@/lib/format-price';
import { SITE_CONFIG } from '@/lib/constants';
import type { Product, ProductReview, SizeOption, ThicknessOption } from '@/types/product';
import { toast } from 'sonner';

interface ProductDetailClientProps {
  product: Product;
  reviews: ProductReview[];
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  reviews,
  relatedProducts,
}) => {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const { openCart } = useUIStore();

  // State
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes[0]);
  const [selectedThickness, setSelectedThickness] = useState(
    product.variants.thicknesses[0] || { label: '6"', priceModifier: 0 }
  );
  const [selectedStyle, setSelectedStyle] = useState(
    product.variants.styles[0] || { label: 'Standard Quilted', priceModifier: 0 }
  );
  const [activeTab, setActiveTab] = useState<'layers' | 'specs' | 'warranty' | 'faq'>('layers');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const wishlisted = isWishlisted(product.id);

  // Price Calculation
  const basePrice = product.salePrice ?? product.basePrice;
  const currentPrice =
    basePrice +
    (selectedSize?.priceModifier || 0) +
    (selectedThickness?.priceModifier || 0) +
    (selectedStyle?.priceModifier || 0);

  const originalPrice =
    product.basePrice +
    (selectedSize?.priceModifier || 0) +
    (selectedThickness?.priceModifier || 0) +
    (selectedStyle?.priceModifier || 0);

  const discountPercent = product.salePrice
    ? getDiscountPercent(originalPrice, currentPrice)
    : 0;

  // Monthly installment estimate (3 payments)
  const monthlyInstallment = Math.round(currentPrice / 3);

  // Actions
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.src || '/images/placeholder-product.jpg',
      variant: {
        size: selectedSize.label as SizeOption,
        thickness: selectedThickness.label as ThicknessOption,
        style: selectedStyle.label,
      },
      basePrice: product.basePrice,
      salePrice: product.salePrice,
      unitPrice: currentPrice,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
    openCart();
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.src || '/images/placeholder-product.jpg',
      variant: {
        size: selectedSize.label as SizeOption,
        thickness: selectedThickness.label as ThicknessOption,
        style: selectedStyle.label,
      },
      basePrice: product.basePrice,
      salePrice: product.salePrice,
      unitPrice: currentPrice,
      quantity: 1,
    });
    router.push('/checkout');
  };

  const getWhatsAppMessage = () => {
    const text = `Hi Dura Flex, I'm interested in ordering:\n*${product.name}*\n• Size: ${selectedSize?.displayName || selectedSize?.label}\n• Thickness: ${selectedThickness?.label}\n• Fabric: ${selectedStyle?.label}\n• Price: Rs. ${currentPrice.toLocaleString()}\n\nPlease confirm availability and delivery time for my city.`;
    return encodeURIComponent(text);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      toast.error('Please enter your name and review details.');
      return;
    }
    toast.success('Thank you! Your verified review has been submitted for approval.');
    setReviewModalOpen(false);
    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewComment('');
  };

  // Firmness score calculation for gauge
  const firmnessMap: Record<string, number> = {
    Soft: 3.5,
    Medium: 5.5,
    'Medium-Firm': 7.5,
    Firm: 8.5,
  };
  const firmnessScore = product.firmness ? firmnessMap[product.firmness] || 7 : 7;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <CaretRight size={12} />
            <Link href="/products" className="hover:text-primary transition-colors">Mattresses</Link>
            <CaretRight size={12} />
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md">
              <Image
                src={imageError ? '/images/new/1080x1080_full_frontttt_2048x2048.jpg' : (product.images[activeImageIdx]?.src || product.images[0]?.src || '/images/new/1080x1080_full_frontttt_2048x2048.jpg')}
                alt={product.images[activeImageIdx]?.alt || product.name}
                fill
                priority
                onError={() => setImageError(true)}
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-contain p-4"
              />

              {/* Wishlist Button on Image */}
              <button
                type="button"
                onClick={() => toggle(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-transform hover:scale-110 ${
                  wishlisted
                    ? 'bg-rose-50 text-rose-500'
                    : 'bg-white/90 text-slate-700 hover:text-rose-500'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart weight={wishlisted ? 'fill' : 'regular'} size={20} />
              </button>

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.badges?.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 rounded-full bg-navy/90 backdrop-blur-md text-white text-xs font-bold shadow-md"
                  >
                    {b}
                  </span>
                ))}
                {discountPercent > 0 && (
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-md">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 bg-white transition-all ${
                      activeImageIdx === idx
                        ? 'border-primary ring-2 ring-primary/20 scale-105'
                        : 'border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || `${product.name} photo ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* 3 Trust Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 text-center">
                <Moon weight="fill" className="text-primary text-2xl mx-auto mb-1" />
                <h4 className="text-xs font-bold text-slate-800">100-Night Trial</h4>
                <p className="text-[11px] text-slate-500">Sleep on it risk-free</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 text-center">
                <ShieldCheck weight="fill" className="text-emerald-600 text-2xl mx-auto mb-1" />
                <h4 className="text-xs font-bold text-slate-800">10-Year Warranty</h4>
                <p className="text-[11px] text-slate-500">Sag-free guarantee</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 text-center">
                <Truck weight="fill" className="text-accent text-2xl mx-auto mb-1" />
                <h4 className="text-xs font-bold text-slate-800">Free Delivery</h4>
                <p className="text-[11px] text-slate-500">All Pakistani cities</p>
              </div>
            </div>

          </div>

          {/* RIGHT: Product Options & Purchase Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Rating value={product.rating} size="sm" showCount count={product.reviewCount} />
                <span className="text-xs text-slate-400">• Verified Purchases</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                {product.name}
              </h1>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {product.shortDescription || product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-navy">
                  {formatPrice(currentPrice)}
                </span>
                {originalPrice > currentPrice && (
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Installment Badge */}
              <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                <Sparkle weight="fill" className="text-primary" />
                <span>Or 3 monthly payments of <strong>Rs. {monthlyInstallment.toLocaleString()}</strong> with Bank Alfalah / EasyPaisa</span>
              </div>
            </div>

            {/* Firmness Gauge */}
            {product.firmness && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-700">
                    Firmness Feel:
                  </span>
                  <span className="font-extrabold text-primary">
                    {product.firmness} ({firmnessScore}/10)
                  </span>
                </div>
                <div className="h-3 w-full bg-gradient-to-r from-sky-400 via-indigo-400 to-slate-800 rounded-full relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow-md -translate-x-1/2"
                    style={{ left: `${(firmnessScore / 10) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>Plush (Soft)</span>
                  <span>Balanced (Medium)</span>
                  <span>Orthopedic (Firm)</span>
                </div>
              </div>
            )}

            {/* VARIANT 1: Bed Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Ruler size={14} className="text-primary" />
                  <span>Select Size:</span>
                </label>
                <span className="text-xs font-bold text-primary">
                  {selectedSize?.displayName || selectedSize?.label}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.variants.sizes.map((s) => {
                  const isSelected = selectedSize.label === s.label;
                  return (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary-light shadow-sm ring-1 ring-primary'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900">{s.displayName}</div>
                      <div className="text-[11px] text-slate-500">{s.label}&quot;</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* VARIANT 2: Thickness Selector */}
            {product.variants.thicknesses.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Mattress Thickness:
                  </label>
                  <span className="text-xs font-bold text-primary">
                    {selectedThickness.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.thicknesses.map((th) => {
                    const isSelected = selectedThickness.label === th.label;
                    return (
                      <button
                        key={th.label}
                        type="button"
                        onClick={() => setSelectedThickness(th)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'border-primary bg-primary text-white shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        {th.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full gap-2 shadow-lg shadow-primary/20"
                >
                  <ShoppingCart weight="bold" />
                  <span>Add to Cart</span>
                </Button>

                <Button
                  size="lg"
                  variant="navy"
                  onClick={handleBuyNow}
                  className="w-full font-bold"
                >
                  <span>Buy Now</span>
                </Button>
              </div>

              {/* Instant WhatsApp Order Button */}
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg"
              >
                <WhatsappLogo weight="fill" size={20} />
                <span>Order via WhatsApp (Instant Checkout)</span>
              </a>
            </div>

            {/* Stock & Delivery Note */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <CheckCircle weight="fill" size={16} />
                <span>In Stock — Dispatched in 24 Hours</span>
              </div>
              <span>Cash on Delivery (COD)</span>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: Detailed Tabs (Layers, Specs, Warranty, Reviews) */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-slate-200">
          
          {/* Tabs bar */}
          <div className="flex items-center gap-2 sm:gap-4 border-b border-slate-200 pb-px overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('layers')}
              className={`pb-4 px-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'layers'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Internal Foam Layers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`pb-4 px-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Technical Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('warranty')}
              className={`pb-4 px-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'warranty'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              10-Year Warranty & Care
            </button>
          </div>

          {/* Tab 1: Layers */}
          {activeTab === 'layers' && (
            <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-primary uppercase">Top Layer</span>
                <h4 className="font-bold text-slate-900 text-base mt-1">TENCEL™ Breathable Cover</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Natural botanical fibers that naturally whisk away perspiration and heat, keeping you refreshed through warm weather.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-primary uppercase">Comfort Layer</span>
                <h4 className="font-bold text-slate-900 text-base mt-1">Cryo-Gel Comfort Foam</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Pressure-relieving foam engineered with billions of micro cooling capsules that cradle your pressure points.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-primary uppercase">Core Foundation</span>
                <h4 className="font-bold text-slate-900 text-base mt-1">High-Density Medical Core</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  High-resilience foam core engineered to prevent center sagging for 10+ years while holding the spine in zero-stress alignment.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Specs */}
          {activeTab === 'specs' && (
            <div className="py-8 max-w-2xl divide-y divide-slate-100 text-sm animate-in fade-in">
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-medium">Mattress Type</span>
                <span className="font-bold text-slate-900">{product.type}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-medium">Firmness Rating</span>
                <span className="font-bold text-slate-900">{product.firmness || 'Medium-Firm'}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-medium">Country of Origin</span>
                <span className="font-bold text-slate-900">Proudly Made in Pakistan</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-medium">Warranty Coverage</span>
                <span className="font-bold text-slate-900">10-Year Sag-Free Replacement</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-medium">Trial Period</span>
                <span className="font-bold text-slate-900">100 Nights Free In-Home Trial</span>
              </div>
            </div>
          )}

          {/* Tab 3: Warranty */}
          {activeTab === 'warranty' && (
            <div className="py-8 max-w-2xl space-y-4 text-sm text-slate-600 leading-relaxed animate-in fade-in">
              <p>
                Every Dura Flex mattress is covered by our comprehensive <strong>10-Year Manufacturer Warranty</strong>. This covers any indentation or visible sag greater than 2.5cm, structural seam splits, and defective foam layers.
              </p>
              <p>
                <strong>Care Instructions:</strong> Rotate your mattress 180° head-to-toe once every 6 months to ensure even foam settling. The outer cover can be spot-cleaned or unzipped for gentle dry cleaning.
              </p>
            </div>
          )}

        </div>

        {/* REVIEWS SECTION */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-navy">
                Verified Customer Reviews ({reviews.length})
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Rating value={product.rating} size="md" />
                <span className="font-bold text-slate-800 text-sm">{product.rating} out of 5 stars</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="md"
              onClick={() => setReviewModalOpen(true)}
              className="w-full sm:w-auto"
            >
              Write a Review
            </Button>
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-sm">{r.author}</span>
                        {r.verified && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{r.city}, Pakistan • {r.date}</span>
                    </div>
                    <Rating value={r.rating} size="sm" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{r.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 py-4">
              Be the first to leave a review for the {product.name}!
            </p>
          )}
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-10 border-t border-slate-200">
            <h2 className="text-2xl font-extrabold text-navy mb-8">
              Sleepers Also Considered
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((p) => (
                <div key={p.id} className="group rounded-2xl overflow-hidden border border-slate-200 bg-white p-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-slate-100">
                    <Image
                      src={p.images[0]?.src || '/images/categories/ortho.jpg'}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{p.shortDescription}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <span className="font-extrabold text-navy text-sm">{formatPrice(p.salePrice ?? p.basePrice)}</span>
                    <Link href={`/products/${p.slug}`} className="text-xs font-bold text-primary hover:underline">
                      View Model →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-extrabold text-navy mb-2">Write a Review</h3>
            <p className="text-xs text-slate-500 mb-6">
              Share your experience with the {product.name} to help other Pakistani sleepers make the right choice.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewReviewRating(s)}
                      className={`text-2xl ${s <= newReviewRating ? 'text-amber-400' : 'text-slate-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Asad Khan"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">City in Pakistan</label>
                <input
                  type="text"
                  required
                  value={newReviewCity}
                  onChange={(e) => setNewReviewCity(e.target.value)}
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Review</label>
                <textarea
                  required
                  rows={4}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="How does the mattress feel? Has your sleep or back pain improved?"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <Button size="md" type="submit">
                  Submit Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
