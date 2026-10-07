'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

interface IconProps {
  icon: PhosphorIcon;
  size?: number | string;
  className?: string;
  weight?: 'fill' | 'bold' | 'duotone' | 'light' | 'regular' | 'thin';
  'aria-hidden'?: boolean;
  'aria-label'?: string;
}

/**
 * Icon wrapper – always renders filled icons (weight="fill") for consistency.
 * Pass weight prop to override only when necessary.
 */
export const Icon: React.FC<IconProps> = ({
  icon: PhIcon,
  size = 20,
  className,
  weight = 'fill',
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
}) => {
  return (
    <PhIcon
      size={size}
      weight={weight}
      className={cn('shrink-0', className)}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    />
  );
};
