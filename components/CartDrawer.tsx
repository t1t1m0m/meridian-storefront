'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from './CartProvider';
import { ProductArt } from './ProductArt';
import { CloseIcon, MinusIcon, PlusIcon } from './icons';
import { formatPrice } from '@/lib/utils';
import { EASE, tap } from '@/lib/motion';

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, removeItem, setQuantity, count } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Esc to close + focus trap.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeCart();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Scrim */}
          <motion.div
            className="absolute inset-0 bg-ink/40"
            onClick={closeCart}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: EASE }}
          >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
          <h2 className="font-display text-lg font-bold text-ink">
            Your bag
            <span className="ml-2 font-sans text-sm font-normal text-muted">
              {count} item{count === 1 ? '' : 's'}
            </span>
          </h2>
          <motion.button
            ref={closeButtonRef}
            whileTap={tap}
            type="button"
            onClick={closeCart}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
            aria-label="Close cart"
          >
            <CloseIcon className="h-5 w-5" />
          </motion.button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-2xl font-semibold text-ink">
              Nothing here yet
            </p>
            <p className="max-w-xs text-sm text-muted">
              Frames you add will collect here. Start with the current collection.
            </p>
            <Link href="/products" onClick={closeCart} className="btn-primary mt-2">
              Browse frames
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-hairline overflow-y-auto px-6">
              <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.li
                  key={line.lineId}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="flex gap-4 py-5"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md bg-night">
                    <ProductArt
                      colorway={line.colorway}
                      category={line.category}
                      seed={`cart-${line.lineId}`}
                      className="h-full w-full"
                      compact
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/products/${line.slug}`}
                          onClick={closeCart}
                          className="font-display text-base font-semibold text-ink hover:text-cobalt"
                        >
                          {line.name}
                        </Link>
                        <p className="text-xs text-muted">{line.lensName}</p>
                      </div>
                      <p className="font-sans text-sm font-medium text-ink">
                        {formatPrice(line.unitPrice * line.quantity)}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-hairline">
                        <motion.button
                          whileTap={tap}
                          type="button"
                          onClick={() => setQuantity(line.lineId, line.quantity - 1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink hover:bg-ink/5"
                          aria-label={`Decrease quantity of ${line.name}`}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </motion.button>
                        <span
                          className="w-6 text-center text-sm tabular-nums"
                          aria-live="polite"
                        >
                          {line.quantity}
                        </span>
                        <motion.button
                          whileTap={tap}
                          type="button"
                          onClick={() => setQuantity(line.lineId, line.quantity + 1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink hover:bg-ink/5"
                          aria-label={`Increase quantity of ${line.name}`}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </motion.button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.lineId)}
                        className="text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
              </AnimatePresence>
            </ul>

            <div className="border-t border-hairline px-6 py-5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="font-display text-xl font-bold text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="pb-4 text-xs text-muted">
                Shipping and taxes calculated at checkout.
              </p>
              <motion.button whileTap={tap} type="button" className="btn-primary w-full">
                Checkout
              </motion.button>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 w-full py-2 text-center text-sm text-muted hover:text-ink"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
