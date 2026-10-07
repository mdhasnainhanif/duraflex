import * as React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rect',
  width,
  height,
  lines = 1,
  ...props
}) => {
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'animate-pulse bg-gradient-to-r from-border via-primary-50 to-border rounded-full h-4',
              i === lines - 1 && 'w-3/4'
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-border via-primary-50 to-border',
        variant === 'circle' ? 'rounded-full' : 'rounded-xl',
        variant === 'text' && 'h-4 rounded-full',
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
      {...props}
    />
  );
};

export const ProductCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('rounded-2xl border border-border overflow-hidden', className)}>
    <Skeleton height={260} className="rounded-none" />
    <div className="p-4 space-y-3">
      <Skeleton variant="text" />
      <Skeleton variant="text" width="60%" />
      <div className="flex items-center gap-2">
        <Skeleton height={20} width={80} className="rounded-full" />
        <Skeleton height={20} width={40} className="rounded-full" />
      </div>
      <Skeleton height={44} className="rounded-full" />
    </div>
  </div>
);
