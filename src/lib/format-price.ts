/**
 * Format a number as Pakistani Rupees
 */
export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercent(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

/**
 * Get the effective price of a product (salePrice if available, else basePrice)
 */
export function getEffectivePrice(basePrice: number, salePrice?: number): number {
  return salePrice ?? basePrice;
}
