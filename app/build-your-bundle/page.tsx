'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkle,
  CheckCircle,
  ShoppingCart,
  WhatsappLogo,
  ArrowRight,
  ShieldCheck,
  Tag,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format-price';
import { SITE_CONFIG } from '@/lib/constants';
import { useCartStore } from '@/store/cart.store';
import { useUIStore } from '@/store/ui.store';
import { products } from '@/data/products';
import { toast } from 'sonner';

// Filter products for bundle items
const MATTRESS_CHOICES = products.filter(
  (p) =>
    p.category === 'dura-ortho' ||
    p.category === 'cooling-gel' ||
    p.category === 'dura-cloud' ||
    p.category === 'memory-foam'
).slice(0, 4);

const PILLOW_CHOICES = products.filter((p) => p.category === 'pillows').slice(0, 3);
const ACCESSORY_CHOICES = products.filter((p) => p.category === 'accessories').slice(0, 3);

export default function BuildYourBundlePage() {
  const { addItem } = useCartStore();
  const { openCart } = useUIStore();

  // Selected items in bundle
  const [selectedMattress, setSelectedMattress] = useState(MATTRESS_CHOICES[0]);
  const [selectedSize, setSelectedSize] = useState(
    MATTRESS_CHOICES[0].variants.sizes[0]
  );
  const [selectedPillow, setSelectedPillow] = useState(PILLOW_CHOICES[0]);
  const [pillowQty, setPillowQty] = useState(2);
  const [selectedProtector, setSelectedProtector] = useState<typeof ACCESSORY_CHOICES[0] | null>(
    ACCESSORY_CHOICES[0] || null
  );

  // Pricing calculations
  const mattressPrice =
    (selectedMattress.salePrice ?? selectedMattress.basePrice) +
    (selectedSize?.priceModifier || 0);

  const pillowPrice = (selectedPillow?.salePrice ?? selectedPillow?.basePrice ?? 0) * pillowQty;
  const protectorPrice = selectedProtector
    ? selectedProtector.salePrice ?? selectedProtector.basePrice
    : 0;

  const subtotal = mattressPrice + pillowPrice + protectorPrice;
  // 15% Bundle Discount
  const discountRate = 0.15;
  const discountAmount = Math.round(subtotal * discountRate);
  const bundleTotal = subtotal - discountAmount;

  const handleAddBundleToCart = () => {
    // 1. Add Mattress
    addItem({
      productId: selectedMattress.id,
      slug: selectedMattress.slug,
      name: `${selectedMattress.name} (Bundle Deal)`,
      image: selectedMattress.images[0]?.src || '/images/placeholder-product.jpg',
      variant: {
        size: selectedSize.label,
        thickness: selectedMattress.variants.thicknesses[0]?.label || '8"',
        style: selectedMattress.variants.styles[0]?.label || 'Standard',
      },
      basePrice: selectedMattress.basePrice,
      salePrice: Math.round(mattressPrice * (1 - discountRate)),
      unitPrice: Math.round(mattressPrice * (1 - discountRate)),
      quantity: 1,
    });

    // 2. Add Pillows
    if (selectedPillow) {
      addItem({
        productId: selectedPillow.id,
        slug: selectedPillow.slug,
        name: `${selectedPillow.name} (Bundle Deal)`,
        image: selectedPillow.images[0]?.src || '/images/placeholder-product.jpg',
        variant: {
          size: 'Standard' as any,
          thickness: 'Standard' as any,
          style: 'Standard',
        },
        basePrice: selectedPillow.basePrice,
        salePrice: Math.round(
          (selectedPillow.salePrice ?? selectedPillow.basePrice) * (1 - discountRate)
        ),
        unitPrice: Math.round(
          (selectedPillow.salePrice ?? selectedPillow.basePrice) * (1 - discountRate)
        ),
        quantity: pillowQty,
      });
    }

    // 3. Add Protector if selected
    if (selectedProtector) {
      addItem({
        productId: selectedProtector.id,
        slug: selectedProtector.slug,
        name: `${selectedProtector.name} (Bundle Deal)`,
        image: selectedProtector.images[0]?.src || '/images/placeholder-product.jpg',
        variant: {
          size: selectedSize.label,
          thickness: 'Standard' as any,
          style: 'Fitted',
        },
        basePrice: selectedProtector.basePrice,
        salePrice: Math.round(
          (selectedProtector.salePrice ?? selectedProtector.basePrice) * (1 - discountRate)
        ),
        unitPrice: Math.round(
          (selectedProtector.salePrice ?? selectedProtector.basePrice) * (1 - discountRate)
        ),
        quantity: 1,
      });
    }

    toast.success('Complete Sleep Bundle added to cart with 15% discount!');
    openCart();
  };

  const getWhatsAppBundleMessage = () => {
    const text = `Hi Dura Flex, I created a custom sleep bundle:\n• Mattress: ${selectedMattress.name} (${selectedSize.displayName})\n• Pillows: ${pillowQty}x ${selectedPillow?.name}\n• Protector: ${selectedProtector ? selectedProtector.name : 'None'}\n• Bundle Discounted Total: Rs. ${bundleTotal.toLocaleString()} (Saved Rs. ${discountAmount.toLocaleString()})\n\nPlease place this order for me with Free Delivery!`;
    return encodeURIComponent(text);
  };

  return (
    <div className="bg-[#F8F9FD] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-3">
            <Tag weight="fill" />
            <span>Save Flat 15% Off Total</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
            Build Your Custom Sleep Sanctuary
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Combine your choice of premium mattress, therapeutic pillows, and waterproof protector into a single discounted sleep set.
          </p>
        </div>

        {/* Builder Layout: Configurator Steps + Summary Sticky Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Configurator Steps */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* STEP 1: Select Mattress */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Choose Your Mattress</h3>
                    <p className="text-xs text-slate-500">Select model and desired bed frame dimensions</p>
                  </div>
                </div>
              </div>

              {/* Models Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MATTRESS_CHOICES.map((m) => {
                  const isSelected = selectedMattress.id === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelectedMattress(m);
                        setSelectedSize(m.variants.sizes[0]);
                      }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-slate-100">
                        <Image
                          src={m.images[0]?.src || '/images/categories/ortho.jpg'}
                          alt={m.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                        {isSelected && <CheckCircle weight="fill" className="text-primary text-lg" />}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{m.shortDescription}</p>
                      <div className="text-xs font-bold text-navy mt-2">
                        From {formatPrice(m.salePrice ?? m.basePrice)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dimensions Selector */}
              <div className="pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Select Bed Size for {selectedMattress.name}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedMattress.variants.sizes.map((s) => {
                    const isSelected = selectedSize.label === s.label;
                    return (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          isSelected
                            ? 'border-primary bg-primary text-white shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        {s.displayName}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 2: Select Pillows */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Add Supportive Pillows</h3>
                    <p className="text-xs text-slate-500">Pick 2 pillows to complete your neck support</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PILLOW_CHOICES.map((p) => {
                  const isSelected = selectedPillow?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPillow(p)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-slate-100">
                        <Image
                          src={p.images[0]?.src || '/images/categories/pillows.jpg'}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{p.name}</h4>
                      <p className="text-xs font-bold text-navy mt-1">
                        {formatPrice(p.salePrice ?? p.basePrice)} each
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-700">Pillow Pair:</span>
                <div className="flex items-center gap-3">
                  {[2, 4].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setPillowQty(q)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        pillowQty === q
                          ? 'bg-navy text-white border-navy'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      {q} Pillows
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* STEP 3: Select Mattress Protector */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Add Waterproof Protector</h3>
                    <p className="text-xs text-slate-500">Protect against liquid spills, allergens, and dust mites</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ACCESSORY_CHOICES.map((acc) => {
                  const isSelected = selectedProtector?.id === acc.id;
                  return (
                    <div
                      key={acc.id}
                      onClick={() =>
                        setSelectedProtector(isSelected ? null : acc)
                      }
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">{acc.name}</h4>
                        {isSelected && <CheckCircle weight="fill" className="text-primary text-lg" />}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{acc.shortDescription}</p>
                      <div className="text-xs font-bold text-navy mt-2">
                        +{formatPrice(acc.salePrice ?? acc.basePrice)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: Live Bundle Pricing Summary (Sticky) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-extrabold text-navy text-lg">Bundle Summary</h3>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  15% OFF
                </span>
              </div>

              {/* Items in bundle list */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{selectedMattress.name}</p>
                    <p className="text-slate-400">{selectedSize.displayName}</p>
                  </div>
                  <span className="font-bold text-slate-800">{formatPrice(mattressPrice)}</span>
                </div>

                {selectedPillow && (
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{pillowQty}x {selectedPillow.name}</p>
                      <p className="text-slate-400">Ergonomic Pillows</p>
                    </div>
                    <span className="font-bold text-slate-800">{formatPrice(pillowPrice)}</span>
                  </div>
                )}

                {selectedProtector && (
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{selectedProtector.name}</p>
                      <p className="text-slate-400">Waterproof Shield</p>
                    </div>
                    <span className="font-bold text-slate-800">{formatPrice(protectorPrice)}</span>
                  </div>
                )}
              </div>

              {/* Pricing breakdown */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Regular Subtotal:</span>
                  <span className="line-through">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Bundle Discount (15%):</span>
                  <span>- {formatPrice(discountAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Doorstep Delivery:</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Bundle Total:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-navy">{formatPrice(bundleTotal)}</span>
                    <p className="text-[11px] text-emerald-600 font-semibold">You save {formatPrice(discountAmount)}!</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  size="lg"
                  onClick={handleAddBundleToCart}
                  className="w-full gap-2 shadow-lg shadow-primary/20"
                >
                  <ShoppingCart weight="bold" />
                  <span>Add Bundle to Cart</span>
                </Button>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${getWhatsAppBundleMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md"
                >
                  <WhatsappLogo weight="fill" size={18} />
                  <span>Order Bundle on WhatsApp</span>
                </a>
              </div>

              {/* Guarantee */}
              <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-2.5 text-slate-600 text-[11px]">
                <ShieldCheck weight="fill" className="text-primary text-xl flex-shrink-0" />
                <span>Includes 100-Night Mattress Trial + 10-Year Sag Warranty.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
