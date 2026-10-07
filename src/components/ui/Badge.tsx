import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 font-semibold uppercase tracking-wider rounded-full px-2.5 py-0.5 text-xs leading-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'bg-primary-light text-primary',
        sale: 'bg-danger text-white',
        new: 'bg-success text-white',
        bestseller: 'bg-primary text-white',
        trending: 'bg-warning text-white',
        limited: 'bg-navy text-white',
        success: 'bg-success/10 text-success border border-success/20',
        warning: 'bg-warning/10 text-warning border border-warning/20',
        danger: 'bg-danger/10 text-danger border border-danger/20',
        outline: 'border border-border text-muted bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
