import type { Category, Colorway } from '@/lib/types';

interface ProductArtProps {
  colorway: Colorway;
  category: Category;
  seed: string;
  className?: string;
  /** Slightly reduce internal padding for tight card layouts. */
  compact?: boolean;
}

/**
 * Deterministic, network-free product art. Renders a gradient studio backdrop
 * with a front-facing eyewear silhouette drawn from the product's colorway.
 * Sunglasses get filled tinted lenses; optical frames get thin rims + clear glass.
 */
export function ProductArt({
  colorway,
  category,
  seed,
  className,
  compact = false,
}: ProductArtProps) {
  const gradId = `bg-${seed}`;
  const lensGradId = `lens-${seed}`;
  const isOptical = category === 'Optical';
  const stroke = colorway.frame;
  const strokeWidth = compact ? 7 : 8;

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colorway.base} />
          <stop offset="100%" stopColor={colorway.wash} />
        </linearGradient>
        <linearGradient id={lensGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorway.lens} stopOpacity={isOptical ? 0.35 : 0.95} />
          <stop offset="100%" stopColor={colorway.lens} stopOpacity={isOptical ? 0.12 : 0.7} />
        </linearGradient>
      </defs>

      {/* Studio backdrop */}
      <rect width="400" height="300" fill={`url(#${gradId})`} />
      <ellipse cx="200" cy="235" rx="150" ry="26" fill="#000000" opacity="0.18" />

      {/* Eyewear, front view */}
      <g
        transform="translate(0, 6)"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Left lens */}
        <rect
          x="66"
          y="118"
          width="118"
          height="86"
          rx={isOptical ? 26 : 40}
          fill={`url(#${lensGradId})`}
        />
        {/* Right lens */}
        <rect
          x="216"
          y="118"
          width="118"
          height="86"
          rx={isOptical ? 26 : 40}
          fill={`url(#${lensGradId})`}
        />
        {/* Bridge */}
        <path d="M184 138 q16 -10 32 0" />
        {/* Temples */}
        <path d="M66 140 L34 128" />
        <path d="M334 140 L366 128" />
      </g>

      {/* Cobalt house accent — one confident detail */}
      <circle cx="360" cy="252" r="9" fill="#1B3BFF" />
      <rect x="30" y="46" width="46" height="4" fill="#1B3BFF" opacity="0.85" />
    </svg>
  );
}
