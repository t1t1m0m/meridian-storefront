'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from './CartProvider';
import { ProductArt } from './ProductArt';
import { Accordion } from './Accordion';
import { ArrowIcon, CheckIcon } from './icons';
import { cn, formatPrice } from '@/lib/utils';
import { EASE, tap } from '@/lib/motion';
import type { Product } from '@/lib/types';

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [lensId, setLensId] = useState(product.lensOptions[0].id);
  const [activeView, setActiveView] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const selectedLens =
    product.lensOptions.find((lens) => lens.id === lensId) ?? product.lensOptions[0];
  const price = product.price + selectedLens.priceDelta;

  // Three deterministic "angles" of the same product art for the gallery.
  const views = ['front', 'angle', 'detail'];

  function handleAdd() {
    addItem({
      slug: product.slug,
      name: product.name,
      category: product.category,
      colorway: product.colorway,
      unitPrice: price,
      lensId: selectedLens.id,
      lensName: selectedLens.name,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="container-editorial py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="hover:text-ink">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-night">
            <AnimatePresence initial={false}>
              <motion.div
                key={activeView}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0"
              >
                <ProductArt
                  colorway={product.colorway}
                  category={product.category}
                  seed={`detail-${product.slug}-${views[activeView]}`}
                  className="h-full w-full"
                />
              </motion.div>
            </AnimatePresence>
            {product.isNew && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-paper px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink">
                New
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {views.map((view, index) => (
              <motion.button
                key={view}
                type="button"
                onClick={() => setActiveView(index)}
                whileTap={tap}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-lg bg-night ring-2 transition-all',
                  index === activeView ? 'ring-cobalt' : 'ring-transparent hover:ring-hairline',
                )}
                aria-label={`View ${view}`}
                aria-pressed={index === activeView}
              >
                <ProductArt
                  colorway={product.colorway}
                  category={product.category}
                  seed={`thumb-${product.slug}-${view}`}
                  className="h-full w-full"
                  compact
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Buy column */}
        <div>
          <p className="eyebrow">
            {product.collection} · {product.category}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-muted">{product.tagline}</p>

          <p className="mt-6 font-sans text-2xl font-medium text-ink">
            {formatPrice(price)}
            {selectedLens.priceDelta > 0 && (
              <span className="ml-2 text-sm font-normal text-muted">
                incl. {selectedLens.name} lens
              </span>
            )}
          </p>

          <p className="mt-6 max-w-prose leading-relaxed text-ink/80">
            {product.description}
          </p>

          {/* Lens selector */}
          <fieldset className="mt-8">
            <legend className="eyebrow mb-3">Lens</legend>
            <div className="space-y-3">
              {product.lensOptions.map((lens) => {
                const active = lens.id === lensId;
                return (
                  <label
                    key={lens.id}
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors',
                      active ? 'border-cobalt bg-cobalt/5' : 'border-hairline hover:border-ink/40',
                    )}
                  >
                    <input
                      type="radio"
                      name="lens"
                      value={lens.id}
                      checked={active}
                      onChange={() => setLensId(lens.id)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                        active ? 'border-cobalt' : 'border-hairline',
                      )}
                    >
                      {active && <span className="h-2 w-2 rounded-full bg-cobalt" />}
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-sans text-sm font-medium text-ink">
                          {lens.name}
                        </span>
                        <span className="text-sm text-muted">
                          {lens.priceDelta === 0 ? 'Included' : `+${formatPrice(lens.priceDelta)}`}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {lens.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Add to cart */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.button
              type="button"
              onClick={handleAdd}
              whileTap={tap}
              className="btn-primary flex-1 py-4 text-base"
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <CheckIcon className="h-5 w-5" />
                    Added to bag
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    Add to bag — {formatPrice(price)}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-cobalt" />
            Free 2-day shipping and a 30-day frame trial.
          </p>

          {/* Specs */}
          <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-hairline pt-8 text-sm">
            <div>
              <dt className="text-muted">Material</dt>
              <dd className="mt-0.5 font-medium text-ink">{product.material}</dd>
            </div>
            <div>
              <dt className="text-muted">Colorway</dt>
              <dd className="mt-0.5 font-medium text-ink">{product.color}</dd>
            </div>
            <div>
              <dt className="text-muted">Weight</dt>
              <dd className="mt-0.5 font-medium text-ink">{product.weightGrams} g</dd>
            </div>
            <div>
              <dt className="text-muted">Collection</dt>
              <dd className="mt-0.5 font-medium text-ink">{product.collection}</dd>
            </div>
          </dl>

          {/* Accordion */}
          <div className="mt-8">
            <Accordion
              items={[
                {
                  title: 'Details & construction',
                  content: (
                    <ul className="space-y-2">
                      {product.details.map((detail) => (
                        <li key={detail} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cobalt" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: 'Fit & measurements',
                  content: <p>{product.fit}</p>,
                },
                {
                  title: 'Shipping & returns',
                  content: (
                    <p>
                      Free carbon-neutral 2-day shipping on every order. Try your frames
                      for 30 days — if they’re not right, send them back for a full refund
                      with a prepaid label. Prescription lenses are made to order and
                      covered by our one-year scratch warranty.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function RelatedHeading() {
  return (
    <div className="flex items-end justify-between gap-6">
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Pairs well with
      </h2>
      <Link
        href="/products"
        className="link-underline hidden shrink-0 font-sans text-sm font-medium text-ink sm:flex sm:items-center sm:gap-1"
      >
        Shop all <ArrowIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
