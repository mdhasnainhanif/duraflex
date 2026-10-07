import * as React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  narrow?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Tag = 'div', narrow, ...props }, ref) => {
    const Component = Tag as any;
    return (
      <Component
        ref={ref}
        className={cn(
          'w-full mx-auto px-4 sm:px-6 lg:px-8',
          narrow ? 'max-w-4xl' : 'max-w-[1280px]',
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  titleClassName?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  centered = false,
  className,
  titleClassName,
  ...props
}) => (
  <div
    className={cn('reveal-hidden space-y-3', centered && 'text-center mx-auto max-w-2xl', className)}
    {...props}
  >
    {label && (
      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
        <span className="block h-px w-6 bg-primary" />
        {label}
        <span className="block h-px w-6 bg-primary" />
      </span>
    )}
    <h2 className={cn('text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight', titleClassName)}>
      {title}
    </h2>
    {description && (
      <p className="text-base sm:text-lg text-muted leading-relaxed">{description}</p>
    )}
  </div>
);

export { Container, SectionHeading };
