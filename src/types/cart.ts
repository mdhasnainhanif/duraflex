import type { SizeOption, ThicknessOption } from './product';

export interface CartVariant {
  size: SizeOption;
  thickness: ThicknessOption;
  style: string;
}

export interface CartItem {
  cartItemId: string; // productId + JSON stringified variant
  productId: string;
  slug: string;
  name: string;
  image: string;
  variant: CartVariant;
  basePrice: number;
  salePrice?: number;
  unitPrice: number; // resolved price after variant modifiers
  quantity: number;
  isBundleItem?: boolean;
}

export interface CartTotals {
  subtotal: number;
  bundleDiscount: number;
  couponDiscount: number;
  deliveryFee: number;
  grandTotal: number;
}

export interface AppliedCoupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
}

export interface CartState {
  items: CartItem[];
  coupon: AppliedCoupon | null;
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  getTotals: () => CartTotals;
  itemCount: () => number;
}
