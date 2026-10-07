'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye } from '@phosphor-icons/react';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { useCartStore } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';
import { useUIStore } from '@/store/ui.store';
import { formatPrice, getDiscountPercent } from '@/lib/format-price';
import { generateCartItemId, cn } from '@/lib/utils';
import type { Product, ProductVariantSize, ProductVariantThickness } from '@/types/product';
import type { SizeOption, ThicknessOption } from '@/types/product';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { toggle, isWishlisted } = useWishlistStore();
  const { addItem } = useCartStore();
  const { openCart } = useUIStore();

  const [selectedSize, setSelectedSize] = useState<ProductVariantSize>(product.variants.sizes[0]);
  const [selectedThickness, setSelectedThickness] = useState<ProductVariantThickness>(product.variants.thicknesses[0]);
  const [selectedStyle, setSelectedStyle] = useState(product.variants.styles[0]);
  const [imgSrc, setImgSrc] = useState(product.images[0]?.src ?? '/images/placeholder-product.jpg');

  const basePrice = product.salePrice ?? product.basePrice;
  const currentPrice = basePrice + selectedSize.priceModifier + selectedThickness.priceModifier + selectedStyle.priceModifier;
  const originalPrice = product.basePrice + selectedSize.priceModifier + selectedThickness.priceModifier + selectedStyle.priceModifier;
  const discountPct = product.salePrice ? getDiscountPercent(originalPrice, currentPrice) : 0;
  const wishlisted = isWishlisted(product.id);
  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.src ?? '/images/placeholder-product.jpg',
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
    toast.success(`${product.name} added to cart!`, { duration: 2000 });
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!', {
      icon: wishlisted ? '💔' : '❤️',
      duration: 1500,
    });
  };

  return (
    <article
      className={cn(
        'group relative bg-white rounded-2xl border border-border overflow-hidden card-hover transition-all duration-300',
        className
      )}
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-white product-image-hover aspect-[4/3]">
        <Link href={`/products/${product.slug}`} className="block w-full h-full" aria-label={product.name}>
          <Image
            src={imgSrc}
            alt={product.images[0]?.alt ?? product.name}
            fill
            onError={() => setImgSrc('/images/new/1080x1080_full_frontttt_2048x2048.jpg')}
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {discountPct > 0 && (
            <Badge variant="sale">{discountPct}% OFF</Badge>
          )}
          {product.badges.includes('New') && <Badge variant="new">New</Badge>}
          {product.badges.includes('Best Seller') && <Badge variant="bestseller">Best Seller</Badge>}
          {product.badges.includes('2-in-1') && <Badge variant="secondary">2-in-1</Badge>}
          {product.badges.includes('Trending') && <Badge variant="trending">Trending</Badge>}
        </div>

        {/* Stock badge */}
        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <Badge variant="outline" className="bg-white">Out of Stock</Badge>
          </div>
        )}
        {lowStock && inStock && (
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <Badge variant="warning">Only {product.stock} left!</Badge>
          </div>
        )}

        {/* Wishlist + Quick view on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleWishlist}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all',
              wishlisted ? 'bg-danger text-white' : 'bg-white text-muted hover:text-danger hover:bg-danger/10'
            )}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
          >
            <Heart size={16} weight="fill" />
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md text-muted hover:text-primary transition-colors"
            aria-label={`View ${product.name}`}
          >
            <Eye size={16} weight="fill" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
          {product.category.replace(/-/g, ' ')}
        </p>

        {/* Name */}
        <Link href={`/products/${product.slug}`} className="block group/link">
          <h3 className="font-bold text-navy text-sm leading-snug group-hover/link:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <Rating value={product.rating} showCount count={product.reviewCount} size="sm" />

        {/* Inline variant selectors */}
        <div className="space-y-1.5">
          {/* Size */}
          <div className="flex flex-wrap gap-1">
            {product.variants.sizes.slice(0, 4).map((size) => (
              <button
                key={size.label}
                type="button"
                onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                className={cn(
                  'text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all',
                  selectedSize.label === size.label
                    ? 'bg-primary text-white border-primary'
                    : 'border-border text-muted hover:border-primary hover:text-primary'
                )}
              >
                {size.label.replace('78x', '')}″
              </button>
            ))}
          </div>

          {/* Thickness */}
          <div className="flex flex-wrap gap-1">
            {product.variants.thicknesses.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={(e) => { e.preventDefault(); setSelectedThickness(t); }}
                className={cn(
                  'text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all',
                  selectedThickness.label === t.label
                    ? 'bg-primary text-white border-primary'
                    : 'border-border text-muted hover:border-primary hover:text-primary'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="font-bold text-primary text-base">{formatPrice(currentPrice)}</p>
            {discountPct > 0 && (
              <p className="text-xs text-muted line-through">{formatPrice(originalPrice)}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all shine',
              inStock
                ? 'bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-glow active:scale-95'
                : 'bg-border text-muted cursor-not-allowed'
            )}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={15} weight="fill" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {/* Warranty/trial badges */}
        {(product.warranty ?? product.trialNights) && (
          <div className="flex gap-2 pt-1">
            {product.trialNights && (
              <span className="text-[10px] text-muted font-medium">{product.trialNights}-night trial</span>
            )}
            {product.warranty && (
              <span className="text-[10px] text-muted font-medium">· {product.warranty} warranty</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
