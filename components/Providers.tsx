'use client';

import { MotionConfig } from 'framer-motion';
import { CartProvider } from './CartProvider';
import { EASE } from '@/lib/motion';

/**
 * Client-side providers. MotionConfig sets a house transition and — importantly —
 * `reducedMotion="user"`, so every Framer animation is automatically neutralised
 * for visitors who ask for reduced motion at the OS level.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: EASE }}>
      <CartProvider>{children}</CartProvider>
    </MotionConfig>
  );
}
