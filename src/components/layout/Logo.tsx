import * as React from 'react';
import Link from 'next/link';

interface DuraFlexLogoProps {
  variant?: 'dark' | 'light' | 'color';
  className?: string;
  width?: number;
  height?: number;
}

export const DuraFlexLogo: React.FC<DuraFlexLogoProps> = ({
  variant = 'color',
  className,
  width = 140,
  height = 40,
}) => {
  const textColor = variant === 'light' ? '#FFFFFF' : '#141B4D';
  const accentColor = '#5B65DC';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 140 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dura Flex Home"
      role="img"
    >
      {/* Mattress wave mark */}
      <g>
        {/* Base rectangle */}
        <rect x="0" y="18" width="28" height="14" rx="3" fill={accentColor} />
        {/* Mattress layers */}
        <rect x="0" y="15" width="28" height="5" rx="2" fill={accentColor} opacity="0.7" />
        <rect x="0" y="12" width="28" height="5" rx="2" fill={accentColor} opacity="0.4" />
        {/* Top quilted layer */}
        <path
          d="M0 12 Q7 9 14 12 Q21 15 28 12"
          stroke={accentColor}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        {/* Zzzs */}
        <text x="6" y="10" fontSize="6" fill={accentColor} fontFamily="sans-serif" fontWeight="bold" opacity="0.5">
          z z
        </text>
      </g>

      {/* Brand name */}
      <text
        x="33"
        y="26"
        fontSize="16"
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        fontWeight="800"
        letterSpacing="-0.5"
        fill={textColor}
      >
        Dura
      </text>
      <text
        x="77"
        y="26"
        fontSize="16"
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        fontWeight="800"
        letterSpacing="-0.5"
        fill={accentColor}
      >
        Flex
      </text>
      {/* Tagline */}
      <text
        x="33"
        y="35"
        fontSize="5.5"
        fontFamily="'Inter', sans-serif"
        fontWeight="500"
        letterSpacing="0.8"
        fill={variant === 'light' ? 'rgba(255,255,255,0.6)' : '#6b7280'}
      >
        SLEEP BETTER. LIVE BETTER.
      </text>
    </svg>
  );
};

interface LogoLinkProps extends DuraFlexLogoProps {
  href?: string;
  onClick?: () => void;
}

export const LogoLink: React.FC<LogoLinkProps> = ({ href = '/', onClick, ...props }) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
  >
    <DuraFlexLogo {...props} />
  </Link>
);
