import * as React from 'react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
  className?: string;
}

const sizeCls = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  showCount,
  count,
  className,
}) => {
  return (
    <div className={cn('inline-flex items-center gap-1', className)} aria-label={`${value} out of ${max} stars`}>
      <div className="flex" role="img">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i + 1 <= Math.floor(value);
          const half = !filled && i + 0.5 < value;
          return (
            <svg
              key={i}
              className={cn(sizeCls[size], 'w-4 h-4', filled || half ? 'text-star' : 'text-star-empty')}
              fill={filled ? 'currentColor' : half ? 'url(#half)' : 'none'}
              stroke="currentColor"
              strokeWidth={filled || half ? 0 : 1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {half && (
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          );
        })}
      </div>
      {showCount && (
        <span className={cn('text-muted font-medium', sizeCls[size])}>
          ({count?.toLocaleString() ?? 0})
        </span>
      )}
    </div>
  );
};

interface RatingBreakdownProps {
  reviews: { rating: number }[];
  className?: string;
}

export const RatingBreakdown: React.FC<RatingBreakdownProps> = ({ reviews, className }) => {
  const total = reviews.length;
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: total > 0 ? (reviews.filter((r) => r.rating === star).length / total) * 100 : 0,
  }));

  return (
    <div className={cn('space-y-2', className)}>
      {counts.map(({ star, count, pct }) => (
        <div key={star} className="flex items-center gap-3 text-sm">
          <span className="w-4 text-muted shrink-0">{star}</span>
          <svg className="w-4 h-4 text-star shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-star rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="w-5 text-right text-muted shrink-0">{count}</span>
        </div>
      ))}
    </div>
  );
};
