'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  ShoppingCart,
  Trash,
  ArrowRight,
  Sparkle,
  CheckCircle,
} from '@phosphor-icons/react';
import { useWishlistStore } from '@/store/wishlist.store';
import { useCartStore } from '@/store/cart.store';
import { useUIStore } from '@/store/ui.store';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format-price';
import { products } from '@/data/products';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { productIds, remove, clear } = useWishlistStore();
  const { addItem } = useCartStore();
  const { openCart } = useUIStore();

  const wishlistedProducts = products.filter((p) => productIds.includes(p.id));

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.src || '/images/placeholder-product.jpg',
      variant: {
        size: product.variants.sizes[0].label,
        thickness: product.variants.thicknesses[0]?.label || '8"',
        style: product.variants.styles[0]?.label || 'Standard',
      },
      basePrice: product.basePrice,
      salePrice: product.salePrice,
      unitPrice: product.salePrice ?? product.basePrice,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
    openCart();
  };

  return (
    <div className="bg-[#F8F9FD] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-wide uppercase mb-3">
              <Heart weight="fill" />
              <span>Saved Sleep Favourites</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
              My Saved Mattresses
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Keep track of mattresses you love and compare them anytime before making a decision.
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1"
            >
              <Trash size={14} /> Clear All Saved
            </button>
          )}
        </div>

        {/* Wishlist Items Grid or Empty */}
        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {wishlistedProducts.map((p) => {
              const price = p.salePrice ?? p.basePrice;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <Image
                        src={p.images[0]?.src || '/images/categories/ortho.jpg'}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 text-rose-500 hover:bg-white shadow-md transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash size={16} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        {p.category.replace('-', ' ')}
                      </span>
                      <Link href={`/products/${p.slug}`}>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {p.shortDescription || p.description}
                      </p>

                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-navy">
                          {formatPrice(price)}
                        </span>
                        {p.salePrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatPrice(p.basePrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0 space-y-2">
                    <Button
                      size="md"
                      onClick={() => handleAddToCart(p)}
                      className="w-full gap-2 shadow-sm"
                    >
                      <ShoppingCart weight="bold" />
                      <span>Add to Cart</span>
                    </Button>

                    <Link href={`/products/${p.slug}`} className="block">
                      <Button variant="outline" size="md" className="w-full">
                        View Product Details
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-slate-200/80 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart weight="fill" size={32} />
            </div>
            <h2 className="text-xl font-bold text-navy mb-2">No Saved Mattresses Yet</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Browse our orthopedic and cooling memory foam mattresses and click the heart icon on any product to save it here.
            </p>
            <Link href="/products">
              <Button size="lg" className="gap-2">
                <span>Explore Mattresses</span>
                <ArrowRight weight="bold" />
              </Button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
