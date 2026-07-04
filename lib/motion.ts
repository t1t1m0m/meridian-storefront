import type { Variants } from 'framer-motion';

/** Editorial ease — a soft, confident deceleration used across the store. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade + rise, used for scroll-reveal of sections and cards. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Container that staggers its children into view. */
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

/** Standard press feedback for buttons and tappable controls. */
export const tap = { scale: 0.94 };

/** Shared viewport config so reveals fire once, a little before fully in view. */
export const viewportOnce = { once: true, margin: '0px 0px -80px 0px' } as const;
