'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from './CartProvider';
import { BagIcon, CloseIcon, MenuIcon } from './icons';
import { cn } from '@/lib/utils';
import { tap } from '@/lib/motion';

const NAV = [
  { href: '/products', label: 'Shop All' },
  { href: '/products?category=Sunglasses', label: 'Sunglasses' },
  { href: '/products?category=Optical', label: 'Optical' },
];

export function Header() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/85 backdrop-blur-md">
      <div className="container-editorial flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-display text-xl font-extrabold tracking-tightest text-ink"
            aria-label="Meridian — home"
          >
            MERIDIAN
            <span className="text-cobalt">.</span>
          </Link>
          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex items-center gap-7">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="link-underline font-sans text-sm text-ink/80 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <motion.button
            type="button"
            onClick={openCart}
            whileTap={tap}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            <BagIcon className="h-5 w-5" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cobalt px-1 text-[10px] font-semibold leading-none text-paper"
              >
                {count}
              </motion.span>
            )}
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            whileTap={tap}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          'overflow-hidden border-hairline md:hidden',
          mobileOpen ? 'max-h-72 border-t' : 'max-h-0',
        )}
        style={{ transition: 'max-height 0.3s ease' }}
      >
        <nav className="container-editorial py-4" aria-label="Mobile">
          <ul className="flex flex-col divide-y divide-hairline">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block py-3 font-display text-lg font-semibold text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
