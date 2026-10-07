'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
  size = 'md',
}) => {
  const btnCls = cn(
    'flex items-center justify-center rounded-full bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors font-bold select-none',
    size === 'sm' ? 'w-7 h-7 text-base' : 'w-9 h-9 text-lg'
  );

  return (
    <div
      className={cn('inline-flex items-center gap-3 border border-border rounded-full px-2 py-1', className)}
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        className={btnCls}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        className={cn('font-semibold text-navy min-w-[1.5rem] text-center', size === 'sm' ? 'text-sm' : 'text-base')}
        aria-live="polite"
        aria-atomic
      >
        {value}
      </span>
      <button
        type="button"
        className={btnCls}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};
