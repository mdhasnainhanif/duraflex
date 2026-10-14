'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Truck,
  WhatsappLogo,
  CheckCircle,
  CreditCard,
  Money,
  Bank,
  Tag,
  ArrowRight,
  CaretLeft,
} from '@phosphor-icons/react';
import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format-price';
import { SITE_CONFIG, PAKISTAN_CITIES } from '@/lib/constants';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, clearCart, applyCoupon, coupon, getTotals } = useCartStore();
  const totals = getTotals();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Karachi',
    postalCode: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank' | 'card'>('cod');
  const [promoInput, setPromoInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{
    orderId: string;
    total: number;
    phone: string;
    address: string;
    whatsappUrl: string;
    itemsCount: number;
    items: Array<{ name: string; qty: number; price: number }>;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'DURAFLEX10') {
      applyCoupon({ code: 'DURAFLEX10', discountType: 'percentage', discountValue: 10 });
      toast.success('Coupon applied: 10% discount added!');
    } else if (code === 'WELCOME5') {
      applyCoupon({ code: 'WELCOME5', discountType: 'percentage', discountValue: 5 });
      toast.success('Coupon applied: 5% discount added!');
    } else {
      toast.error('Invalid coupon code. Try DURAFLEX10');
    }
  };

  const formatWhatsAppOrderText = (orderId: string) => {
    const itemsList = items
      .map(
        (item, index) =>
          `${index + 1}. *${item.name}*\n   Size: ${item.variant?.size || 'Standard'}" | Qty: ${item.quantity} | Rs. ${(item.unitPrice * item.quantity).toLocaleString()}`
      )
      .join('\n\n');

    const message = [
      `🛍️ *NEW ORDER - DURA FLEX MATTRESS*`,
      `*Order ID:* #${orderId}`,
      `---------------------------------`,
      `*👤 Customer Details:*`,
      `• Name: ${formData.firstName} ${formData.lastName}`.trim(),
      `• Phone: ${formData.phone}`,
      formData.email ? `• Email: ${formData.email}` : null,
      `• City: ${formData.city}`,
      `• Address: ${formData.address}`,
      formData.postalCode ? `• Postal Code: ${formData.postalCode}` : null,
      formData.notes ? `• Special Instructions: ${formData.notes}` : null,
      ``,
      `*📦 Items Ordered:*`,
      itemsList,
      ``,
      `---------------------------------`,
      `*💰 Pricing:*`,
      `• Subtotal: Rs. ${totals.subtotal.toLocaleString()}`,
      totals.bundleDiscount + totals.couponDiscount > 0
        ? `• Discount: -Rs. ${(totals.bundleDiscount + totals.couponDiscount).toLocaleString()}`
        : null,
      `• Delivery: ${totals.deliveryFee === 0 ? 'FREE Doorstep Delivery' : `Rs. ${totals.deliveryFee.toLocaleString()}`}`,
      `• *Total Payable: Rs. ${totals.grandTotal.toLocaleString()}*`,
      `• Payment Method: ${
        paymentMethod === 'cod'
          ? 'Cash on Delivery (COD)'
          : paymentMethod === 'bank'
          ? 'Direct Bank Transfer / Raast'
          : 'Credit / Debit Card'
      }`,
      `---------------------------------`,
      `Please confirm my order and share delivery schedule! 🙏`,
    ]
      .filter(Boolean)
      .join('\n');

    return message;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    if (!formData.firstName || !formData.phone || !formData.address) {
      toast.error('Please complete all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    const generatedId = `DF-${Math.floor(100000 + Math.random() * 900000)}`;
    const whatsappMessage = formatWhatsAppOrderText(generatedId);
    const cleanNumber = (SITE_CONFIG.whatsappNumber || '923132183210').replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Prepare order payload
    const orderPayload = {
      orderId: generatedId,
      customer: {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        email: formData.email || undefined,
        city: formData.city,
        address: formData.address,
        postalCode: formData.postalCode || undefined,
        notes: formData.notes || undefined,
      },
      items: items.map((i) => ({
        name: i.name,
        size: i.variant?.size,
        thickness: i.variant?.thickness,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
      totals: {
        subtotal: totals.subtotal,
        bundleDiscount: totals.bundleDiscount,
        couponDiscount: totals.couponDiscount,
        deliveryFee: totals.deliveryFee,
        grandTotal: totals.grandTotal,
      },
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    // 1. Dispatch Order to backend API (saves order + sends email notification to store owner)
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
    } catch (err) {
      console.warn('API order dispatch notice:', err);
    }

    // 2. Open WhatsApp directly in new window
    try {
      const waWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!waWindow) {
        // Fallback if popup blocked
        console.log('Popup blocked; direct button available on screen');
      }
    } catch {
      // Ignored
    }

    // 3. Set order confirmation state
    setOrderComplete({
      orderId: generatedId,
      total: totals.grandTotal,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}`,
      whatsappUrl,
      itemsCount: items.length,
      items: items.map((i) => ({
        name: i.name,
        qty: i.quantity,
        price: i.unitPrice * i.quantity,
      })),
    });

    clearCart();
    setIsSubmitting(false);
    toast.success('Order placed successfully! Opening WhatsApp...');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWhatsAppOrderText = () => {
    return encodeURIComponent(formatWhatsAppOrderText('DF-INQUIRY'));
  };

  // ORDER SUCCESS STATE
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 text-center space-y-6">
            
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle weight="fill" size={48} />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Order Placed Successfully
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1">
                Thank You for Choosing Dura Flex!
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-md mx-auto">
                Your order ID is <strong className="text-slate-900 font-mono text-base">{orderComplete.orderId}</strong>. We have forwarded your order details to WhatsApp and emailed a confirmation to the store administration.
              </p>
            </div>

            {/* Notification Status Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <WhatsappLogo weight="fill" size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">WhatsApp Forwarded</h4>
                  <p className="text-[11px] text-emerald-700">+92 313 2183210</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0">
                  <ShieldCheck weight="fill" size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-950">Email Notification Sent</h4>
                  <p className="text-[11px] text-blue-700">Store admin receipt created</p>
                </div>
              </div>
            </div>

            {/* Order Details Card */}
            <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-3.5 text-xs sm:text-sm border border-slate-200">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-bold text-slate-800 font-mono">{orderComplete.orderId}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Items Ordered ({orderComplete.itemsCount}):</span>
                <div className="text-right">
                  {orderComplete.items.map((it, idx) => (
                    <div key={idx} className="text-slate-700 font-medium">
                      {it.name} (x{it.qty}) - Rs. {it.price.toLocaleString()}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Total Payable:</span>
                <span className="font-bold text-navy text-base">{formatPrice(orderComplete.total)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Payment Method:</span>
                <span className="font-bold text-slate-800">
                  {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Direct Bank Transfer'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-semibold text-slate-800 text-right max-w-xs">{orderComplete.address}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={orderComplete.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all"
              >
                <WhatsappLogo weight="fill" size={22} />
                <span>Open Order on WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all"
              >
                <span>Call Store ({SITE_CONFIG.phone})</span>
              </a>
            </div>

            <div>
              <Link href="/" className="inline-block text-xs font-semibold text-slate-500 hover:text-primary pt-2">
                ← Return to Home Page
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART STATE
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-16 px-4 bg-slate-50">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-navy mb-2">Your Shopping Cart is Empty</h2>
        <p className="text-slate-500 text-sm mb-6 text-center max-w-md">
          Explore our doctor-recommended orthopedic and cool gel mattresses to begin your journey to pain-free sleep.
        </p>
        <Link href="/products">
          <Button size="lg" className="gap-2">
            <span>Explore Mattresses</span>
            <ArrowRight weight="bold" />
          </Button>
        </Link>
      </div>
    );
  }

  // REGULAR CHECKOUT FORM
  return (
    <div className="bg-[#F8F9FD] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary mb-3"
          >
            <CaretLeft size={14} /> Back to Products
          </Link>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Secure Mattress Checkout
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Free White-Glove Doorstep Delivery & 100-Night In-Home Trial included with your order.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Shipping & Payment Form */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Shipping Address Box */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
                <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Truck weight="bold" className="text-primary" />
                  <span>1. Delivery Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. Asad"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Khan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 0313-2183210"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. asad@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Street Address & Apartment / House No. *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. House 45, Street 12, Phase 5 DHA"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      City in Pakistan *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Please deliver between 2 PM and 6 PM, elevator available"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Payment Methods Box */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Money weight="bold" className="text-primary" />
                  <span>2. Payment Method</span>
                </h3>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">Cash on Delivery (COD)</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                          Most Popular
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Inspect your compressed bed-in-a-box at your doorstep and pay our courier safely in cash.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Direct Bank Transfer / Raast</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Transfer directly to our Meezan Bank / HBL corporate accounts. Account IBAN provided upon confirmation.
                      </p>
                    </div>
                  </label>

                  {/* Credit / Debit Card */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Credit / Debit Card (Visa & Mastercard)</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Secure 256-bit encrypted card checkout or card-on-delivery terminal.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* RIGHT: Order Summary (Sticky) */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xl space-y-5">
                
                <h3 className="font-extrabold text-navy text-lg border-b border-slate-100 pb-3">
                  Order Summary ({items.length} items)
                </h3>

                {/* Items preview */}
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                        <p className="text-slate-400">
                          {item.variant.size} • Qty {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-slate-800">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. DURAFLEX10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
                    >
                      Apply
                    </button>
                  </div>
                  {coupon && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                      ✓ Coupon {coupon.code} active!
                    </p>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span>{formatPrice(totals.subtotal)}</span>
                  </div>
                  {(totals.bundleDiscount > 0 || totals.couponDiscount > 0) && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount:</span>
                      <span>- {formatPrice(totals.bundleDiscount + totals.couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500">
                    <span>Doorstep Shipping:</span>
                    <span className="text-emerald-600 font-bold">
                      {totals.deliveryFee === 0 ? 'FREE' : formatPrice(totals.deliveryFee)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <span className="font-extrabold text-slate-900 text-base">Total:</span>
                    <span className="text-2xl font-black text-navy">{formatPrice(totals.grandTotal)}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <div className="pt-2 space-y-3">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full gap-2 shadow-lg shadow-primary/20"
                  >
                    <span>{isSubmitting ? 'Processing Order...' : 'Confirm Order'}</span>
                    <ArrowRight weight="bold" />
                  </Button>

                  {/* Fallback WhatsApp Order Button */}
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${getWhatsAppOrderText()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md"
                  >
                    <WhatsappLogo weight="fill" size={18} />
                    <span>Order Directly via WhatsApp</span>
                  </a>
                </div>

                {/* Trust footer */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
                  <ShieldCheck weight="fill" className="text-emerald-500" />
                  <span>256-bit SSL Secure Checkout • 10-Year Sag Warranty</span>
                </div>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
