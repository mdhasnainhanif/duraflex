'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingCart, Trash, Plus, Minus, Tag } from '@phosphor-icons/react';
import { useCartStore } from '@/store/cart.store';
import { useUIStore } from '@/store/ui.store';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { formatPrice } from '@/lib/format-price';
import { DELIVERY_FREE_THRESHOLD, COUPON_CODES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { AppliedCoupon } from '@/types/cart';

const FreeDeliveryProgress: React.FC<{ subtotal: number }> = ({ subtotal }) => {
  const pct = Math.min((subtotal / DELIVERY_FREE_THRESHOLD) * 100, 100);
  const remaining = Math.max(DELIVERY_FREE_THRESHOLD - subtotal, 0);
  const isFree = remaining === 0;

  return (
    <div className="space-y-2">
      <p className="text-xs text-center font-medium text-muted">
        {isFree ? (
          <span className="text-success font-semibold">🎉 You unlocked free delivery!</span>
        ) : (
          <>Add <span className="text-primary font-semibold">{formatPrice(remaining)}</span> more for free delivery</>
        )}
      </p>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', isFree ? 'bg-success' : 'bg-primary')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const CouponInput: React.FC = () => {
  const { coupon, applyCoupon, removeCoupon } = useCartStore();
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');

  const apply = () => {
    const found = COUPON_CODES[code.trim().toUpperCase()];
    if (!found) {
      setError('Invalid coupon code');
      return;
    }
    setError('');
    applyCoupon({ code: code.trim().toUpperCase(), ...found } as AppliedCoupon);
    setCode('');
  };

  return (
    <div className="space-y-2">
      {coupon ? (
        <div className="flex items-center justify-between bg-success/10 border border-success/30 rounded-xl px-3 py-2">
          <div className="flex items-center gap-2 text-sm text-success font-semibold">
            <Tag size={14} weight="fill" />
            {coupon.code} applied!
          </div>
          <button type="button" onClick={removeCoupon} className="text-muted hover:text-danger transition-colors">
            <X size={14} weight="bold" />
          </button>
        </div>
      ) : (
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(''); }}
              placeholder="Coupon code"
              className="flex-1 px-3 py-2 text-sm border border-border rounded-xl focus:outline-none focus:border-primary"
              onKeyDown={(e) => e.key === 'Enter' && apply()}
              aria-label="Coupon code"
            />
            <button
              type="button"
              onClick={apply}
              className="px-4 py-2 text-sm font-semibold text-primary border border-primary rounded-xl hover:bg-primary-light transition-colors"
            >
              Apply
            </button>
          </div>
          {error && <p className="text-xs text-danger mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
};

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity, getTotals } = useCartStore();
  useLockBodyScroll(isCartOpen);

  const totals = getTotals();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-[300]" onClick={closeCart} aria-hidden />
      )}

      {/* Drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 w-[420px] max-w-[95vw] bg-white z-[400] flex flex-col shadow-2xl transition-transform duration-300 ease-out',
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-modal="true"
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-bold text-lg text-navy flex items-center gap-2">
            <ShoppingCart size={22} weight="fill" className="text-primary" />
            Your Cart
            {items.length > 0 && (
              <span className="text-sm font-medium text-muted">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-primary-light transition-colors"
            aria-label="Close cart"
          >
            <X size={20} weight="bold" className="text-navy" />
          </button>
        </div>

        {/* Free delivery progress */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-primary-50 border-b border-border">
            <FreeDeliveryProgress subtotal={totals.subtotal} />
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center">
                <ShoppingCart size={36} weight="fill" className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-navy text-lg">Your cart is empty</p>
                <p className="text-muted text-sm mt-1">Add some mattresses to get started!</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-border" aria-label="Cart items">
              {items.map((item) => (
                <li key={item.cartItemId} className="flex gap-4 p-5">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl bg-surface overflow-hidden shrink-0 border border-border">
                    <Image
                      src={item.image || '/images/placeholder-product.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-navy leading-tight truncate">{item.name}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {item.variant.size}" · {item.variant.thickness} · {item.variant.style}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 border border-border rounded-full px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} weight="bold" />
                        </button>
                        <span className="text-sm font-semibold text-navy w-5 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} weight="bold" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-bold text-primary text-sm">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.cartItemId)}
                    className="self-start p-1.5 rounded-full hover:bg-danger/10 hover:text-danger transition-colors text-muted"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash size={16} weight="fill" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-4">
            {/* Coupon */}
            <CouponInput />

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-medium text-navy">{formatPrice(totals.subtotal)}</span>
              </div>
              {totals.bundleDiscount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Bundle Discount</span>
                  <span className="font-medium">−{formatPrice(totals.bundleDiscount)}</span>
                </div>
              )}
              {totals.couponDiscount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Coupon Discount</span>
                  <span className="font-medium">−{formatPrice(totals.couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted">
                <span>Delivery</span>
                <span className={cn('font-medium', totals.deliveryFee === 0 ? 'text-success' : 'text-navy')}>
                  {totals.deliveryFee === 0 ? 'FREE' : formatPrice(totals.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-navy text-base pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">{formatPrice(totals.grandTotal)}</span>
              </div>
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-primary text-white font-bold text-base hover:bg-primary-hover transition-colors shine"
            >
              <ShoppingCart size={20} weight="fill" />
              Checkout · {formatPrice(totals.grandTotal)}
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="w-full py-2 text-sm text-muted hover:text-primary transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
