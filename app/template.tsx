'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/**
 * App Router re-mounts this template on every navigation, so it's the natural
 * place for an enter transition. Each new page fades and rises into view —
 * the "перелистывание" between routes. Reduced-motion users get an instant cut
 * via the MotionConfig in Providers.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
