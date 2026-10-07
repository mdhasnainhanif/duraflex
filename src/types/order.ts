export interface OrderItem {
  productId: string;
  name: string;
  size: string;
  thickness: string;
  style: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export type PaymentMethod = 'COD' | 'Bank Transfer' | 'JazzCash' | 'Easypaisa';

export interface Order {
  orderId: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    area?: string;
  };
  items: OrderItem[];
  subtotal: number;
  bundleDiscount: number;
  couponDiscount: number;
  deliveryFee: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  deliveryDatePreference?: string;
  notes?: string;
  createdAt: string;
}

export interface CheckoutFormValues {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  area?: string;
  paymentMethod: PaymentMethod;
  deliveryDatePreference?: string;
  notes?: string;
  agreeToTerms: boolean;
}
