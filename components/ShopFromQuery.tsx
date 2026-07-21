'use client';

import { useSearchParams } from 'next/navigation';
import { ShopClient } from '@/components/ShopClient';
import type { Product, Category } from '@/lib/types';

type SortKey = 'featured' | 'new' | 'price-asc' | 'price-desc';

function parseCategory(value: string | null): Category | null {
  if (value === 'Sunglasses' || value === 'Optical') return value;
  return null;
}

function parseSort(value: string | null): SortKey {
  if (
    value === 'new' ||
    value === 'price-asc' ||
    value === 'price-desc' ||
    value === 'featured'
  ) {
    return value;
  }
  return 'featured';
}

export function ShopFromQuery({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  return (
    <ShopClient
      products={products}
      initialCategory={parseCategory(searchParams.get('category'))}
      initialSort={parseSort(searchParams.get('sort'))}
    />
  );
}
