'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartState, CartTotals, AppliedCoupon } from '@/types/cart';
import { generateCartItemId } from '@/lib/utils';
import { DELIVERY_FREE_THRESHOLD, DELIVERY_FEE, BUNDLE_TIERS } from '@/lib/constants';

function getBundleDiscount(items: CartItem[], subtotal: number): number {
  const bundleItems = items.filter((i) => i.isBundleItem);
  const count = bundleItems.length;
  if (count === 0) return 0;

  const tier = [...BUNDLE_TIERS].reverse().find((t) => count >= t.minItems);
  if (!tier) return 0;

  const bundleSubtotal = bundleItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  return Math.round((bundleSubtotal * tier.discountPercent) / 100);
}

function getCouponDiscount(coupon: AppliedCoupon | null, subtotal: number): number {
  if (!coupon) return 0;
  if (coupon.discountType === 'percentage') {
    return Math.round((subtotal * coupon.discountValue) / 100);
  }
  return Math.min(coupon.discountValue, subtotal);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (item) => {
        const cartItemId = generateCartItemId(item.productId, item.variant);
        set((state) => {
          const existing = state.items.find((i) => i.cartItemId === cartItemId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, cartItemId }] };
        });
      },

      removeItem: (cartItemId) => {
        set((state) => ({ items: state.items.filter((i) => i.cartItemId !== cartItemId) }));
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i)),
        }));
      },

      applyCoupon: (coupon) => set({ coupon }),

      removeCoupon: () => set({ coupon: null }),

      clearCart: () => set({ items: [], coupon: null }),

      getTotals: (): CartTotals => {
        const { items, coupon } = get();
        const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
        const bundleDiscount = getBundleDiscount(items, subtotal);
        const afterBundle = subtotal - bundleDiscount;
        const couponDiscount = getCouponDiscount(coupon, afterBundle);
        const afterCoupon = afterBundle - couponDiscount;
        const deliveryFee = afterCoupon >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE;
        const grandTotal = afterCoupon + deliveryFee;
        return { subtotal, bundleDiscount, couponDiscount, deliveryFee, grandTotal };
      },

      itemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    {
      name: 'duraflex-cart',
    }
  )
);
