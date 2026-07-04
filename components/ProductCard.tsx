'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from './CartProvider';
import { ProductArt } from './ProductArt';
import { CheckIcon, PlusIcon } from './icons';
import { formatPrice } from '@/lib/utils';
import { EASE, tap, viewportOnce } from '@/lib/motion';
import type { Product } from '@/lib/types';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleQuickAdd() {
    const defaultLens = product.lensOptions[0];
    addItem({
      slug: product.slug,
      name: product.name,
      category: product.category,
      colorway: product.colorway,
      unitPrice: product.price + defaultLens.priceDelta,
      lensId: defaultLens.id,
      lensName: defaultLens.name,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.25 } }}
      viewport={viewportOnce}
      transition={{ duration: 0.55, ease: EASE, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex flex-col"
    >
      <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: EASE }}>
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-night"
          aria-label={`${product.name} — view details`}
        >
          <ProductArt
            colorway={product.colorway}
            category={product.category}
            seed={`card-${product.slug}`}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute left-3 top-3 rounded-full bg-paper px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink">
              New
            </span>
          )}
        </Link>
      </motion.div>

      {/* Quick-add — the memorable card interaction */}
      <motion.button
        type="button"
        onClick={handleQuickAdd}
        whileTap={tap}
        className="absolute right-3 top-3 z-10 flex h-11 items-center gap-1.5 overflow-hidden rounded-full bg-cobalt px-3 text-paper shadow-lg transition-opacity duration-300 focus-visible:opacity-100 md:right-3 md:opacity-0 md:group-hover:opacity-100"
        aria-label={added ? `${product.name} added to cart` : `Quick add ${product.name} to cart`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <CheckIcon className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap text-sm font-medium">Added</span>
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <PlusIcon className="h-5 w-5 shrink-0" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[80px] group-hover:opacity-100">
                Quick add
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight text-ink">
            <Link href={`/products/${product.slug}`} className="hover:text-cobalt">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-muted">{product.tagline}</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted/80">
            {product.material} · {product.color}
          </p>
        </div>
        <p className="shrink-0 font-sans text-base font-medium text-ink">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.article>
  );
}
