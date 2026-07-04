'use client';

import { motion } from 'framer-motion';
import { EASE, viewportOnce } from '@/lib/motion';

/**
 * Reveal-on-scroll wrapper. Fades and rises its children into view once, the
 * first time they enter the viewport. Reduced-motion users see it instantly
 * (handled globally by MotionConfig in Providers).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
