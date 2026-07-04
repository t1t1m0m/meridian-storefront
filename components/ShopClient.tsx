'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { CloseIcon } from './icons';
import { categories, colorFilters } from '@/lib/products';
import { cn, formatPrice } from '@/lib/utils';
import type { Category, ColorLabel, Product } from '@/lib/types';

type SortKey = 'featured' | 'new' | 'price-asc' | 'price-desc';

const SORT_LABELS: Record<SortKey, string> = {
  featured: 'Featured',
  new: 'Newest',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
};

interface ShopClientProps {
  products: Product[];
  initialCategory?: Category | null;
  initialSort?: SortKey;
}

const PRICE_MAX = 320;

export function ShopClient({
  products,
  initialCategory = null,
  initialSort = 'featured',
}: ShopClientProps) {
  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [colors, setColors] = useState<ColorLabel[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(PRICE_MAX);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function toggleColor(color: ColorLabel) {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  }

  function resetFilters() {
    setCategory(null);
    setColors([]);
    setMaxPrice(PRICE_MAX);
  }

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      if (category && product.category !== category) return false;
      if (colors.length > 0 && !colors.includes(product.color)) return false;
      if (product.price > maxPrice) return false;
      return true;
    });

    const sorted = [...result];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        sorted.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
        break;
      default:
        sorted.sort(
          (a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)),
        );
    }
    return sorted;
  }, [products, category, colors, maxPrice, sort]);

  const activeCount =
    (category ? 1 : 0) + colors.length + (maxPrice < PRICE_MAX ? 1 : 0);

  const filterRail = (
    <div className="space-y-8">
      {/* Category */}
      <fieldset>
        <legend className="eyebrow mb-4">Category</legend>
        <div className="space-y-2">
          <FilterRadio
            label="All frames"
            checked={category === null}
            onChange={() => setCategory(null)}
          />
          {categories.map((c) => (
            <FilterRadio
              key={c}
              label={c}
              checked={category === c}
              onChange={() => setCategory(c)}
            />
          ))}
        </div>
      </fieldset>

      {/* Price */}
      <fieldset>
        <legend className="eyebrow mb-4">Max price</legend>
        <input
          type="range"
          min={145}
          max={PRICE_MAX}
          step={5}
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="w-full accent-cobalt"
          aria-label="Maximum price"
        />
        <div className="mt-2 flex justify-between text-xs text-muted">
          <span>{formatPrice(145)}</span>
          <span className="font-medium text-ink">Up to {formatPrice(maxPrice)}</span>
        </div>
      </fieldset>

      {/* Color */}
      <fieldset>
        <legend className="eyebrow mb-4">Color</legend>
        <div className="space-y-2">
          {colorFilters.map((color) => (
            <FilterCheckbox
              key={color}
              label={color}
              checked={colors.includes(color)}
              onChange={() => toggleColor(color)}
            />
          ))}
        </div>
      </fieldset>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={resetFilters}
          className="text-sm text-cobalt underline-offset-4 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="container-editorial py-12">
      <header className="border-b border-hairline pb-8">
        <p className="eyebrow">The collection</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Shop all frames
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Eight frames in acetate and titanium. Filter by category, price and color to
          narrow it down.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Desktop rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">{filterRail}</div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="btn-ghost py-2 lg:hidden"
              >
                Filters
                {activeCount > 0 && (
                  <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cobalt px-1 text-xs text-paper">
                    {activeCount}
                  </span>
                )}
              </button>
              <p className="text-sm text-muted" aria-live="polite">
                {filtered.length} {filtered.length === 1 ? 'frame' : 'frames'}
              </p>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="rounded-full border border-hairline bg-transparent py-2 pl-3 pr-8 text-sm text-ink focus:border-cobalt focus:outline-none"
              >
                {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                  <option key={key} value={key}>
                    {SORT_LABELS[key]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <ProductCard key={product.slug} product={product} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-hairline py-24 text-center">
              <p className="font-display text-2xl font-semibold text-ink">
                No frames match those filters
              </p>
              <p className="mt-2 max-w-xs text-sm text-muted">
                Try widening your price range or clearing a color.
              </p>
              <button type="button" onClick={resetFilters} className="btn-primary mt-6">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 animate-fade-in bg-ink/40"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-paper p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-ink">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5"
                aria-label="Close filters"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            {filterRail}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-primary mt-8 w-full"
            >
              Show {filtered.length} {filtered.length === 1 ? 'frame' : 'frames'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterRadio({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-ink">
      <span
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded-full border transition-colors',
          checked ? 'border-cobalt' : 'border-hairline',
        )}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-cobalt" />}
      </span>
      <input
        type="radio"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-ink">
      <span
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded border transition-colors',
          checked ? 'border-cobalt bg-cobalt text-paper' : 'border-hairline',
        )}
      >
        {checked && (
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3}>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
