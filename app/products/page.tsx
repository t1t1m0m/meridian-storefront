import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ShopFromQuery } from '@/components/ShopFromQuery';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Shop all frames',
  description:
    'Browse every Meridian frame — sunglasses and optical, in acetate and titanium. Filter by category, price and color.',
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ShopFromQuery products={products} />
    </Suspense>
  );
}
