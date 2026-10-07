import type { CartItem } from '@/types/cart';
import { SITE_CONFIG } from './constants';

interface WhatsAppOrderOptions {
  orderId: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    area?: string;
  };
  items: CartItem[];
  subtotal: number;
  bundleDiscount: number;
  couponDiscount: number;
  deliveryFee: number;
  grandTotal: number;
  paymentMethod: string;
  deliveryDatePreference?: string;
  notes?: string;
}

export function buildWhatsAppOrderMessage(opts: WhatsAppOrderOptions): string {
  const {
    orderId,
    customer,
    items,
    subtotal,
    bundleDiscount,
    couponDiscount,
    deliveryFee,
    grandTotal,
    paymentMethod,
    deliveryDatePreference,
    notes,
  } = opts;

  const itemLines = items
    .map(
      (item, i) =>
        `${i + 1}. ${item.name} | Size: ${item.variant.size}" | Thickness: ${item.variant.thickness} | Style: ${item.variant.style} | Qty: ${item.quantity} | Rs. ${(item.unitPrice * item.quantity).toLocaleString('en-PK')}`
    )
    .join('\n');

  const lines = [
    `*New Order - ${SITE_CONFIG.name}*`,
    `Order ID: ${orderId}`,
    ``,
    `*Customer Details:*`,
    `Name: ${customer.fullName}`,
    `Phone: ${customer.phone}`,
    customer.email ? `Email: ${customer.email}` : null,
    `City: ${customer.city}`,
    `Address: ${customer.address}`,
    customer.area ? `Area: ${customer.area}` : null,
    `Payment: ${paymentMethod}`,
    deliveryDatePreference ? `Delivery Preference: ${deliveryDatePreference}` : null,
    ``,
    `*Items:*`,
    itemLines,
    ``,
    `---`,
    `Subtotal: Rs. ${subtotal.toLocaleString('en-PK')}`,
    bundleDiscount > 0 ? `Bundle Discount: -Rs. ${bundleDiscount.toLocaleString('en-PK')}` : null,
    couponDiscount > 0 ? `Coupon Discount: -Rs. ${couponDiscount.toLocaleString('en-PK')}` : null,
    `Delivery: ${deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee.toLocaleString('en-PK')}`}`,
    `*Total: Rs. ${grandTotal.toLocaleString('en-PK')}*`,
    notes ? `\nNotes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  return lines;
}

export function buildWhatsAppProductInquiry(
  productName: string,
  size: string,
  thickness: string,
  price: number
): string {
  return [
    `*Product Inquiry - ${SITE_CONFIG.name}*`,
    ``,
    `I'm interested in:`,
    `Product: ${productName}`,
    `Size: ${size}"`,
    `Thickness: ${thickness}`,
    `Price: Rs. ${price.toLocaleString('en-PK')}`,
    ``,
    `Please confirm availability and delivery details.`,
  ].join('\n');
}

export function openWhatsApp(message: string): void {
  const number = SITE_CONFIG.whatsappNumber;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.href = url;
    }
  } catch {
    window.location.href = url;
  }
}

export function generateOrderId(): string {
  return `DF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}
