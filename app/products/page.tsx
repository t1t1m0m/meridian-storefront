import type { Metadata } from 'next';
import { ShopClient } from '@/components/ShopClient';
import { products } from '@/lib/products';
import type { Category } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Shop all frames',
  description:
    'Browse every Meridian frame — sunglasses and optical, in acetate and titanium. Filter by category, price and color.',
};

type SortKey = 'featured' | 'new' | 'price-asc' | 'price-desc';

function parseCategory(value?: string): Category | null {
  if (value === 'Sunglasses' || value === 'Optical') return value;
  return null;
}

function parseSort(value?: string): SortKey {
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

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string };
}) {
  return (
    <ShopClient
      products={products}
      initialCategory={parseCategory(searchParams.category)}
      initialSort={parseSort(searchParams.sort)}
    />
  );
}
