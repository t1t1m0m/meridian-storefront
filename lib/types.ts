export type Category = 'Sunglasses' | 'Optical';

export type ColorLabel =
  | 'Ink Black'
  | 'Tortoise'
  | 'Crystal'
  | 'Cobalt'
  | 'Amber'
  | 'Slate';

export interface LensOption {
  id: string;
  name: string;
  /** Added to base price, in whole dollars. */
  priceDelta: number;
  description: string;
}

export interface Colorway {
  /** Backdrop gradient start. */
  base: string;
  /** Backdrop gradient end. */
  wash: string;
  /** Frame body color. */
  frame: string;
  /** Lens tint. */
  lens: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  /** Base price in whole dollars (USD). */
  price: number;
  material: string;
  color: ColorLabel;
  colorway: Colorway;
  collection: string;
  description: string;
  details: string[];
  fit: string;
  weightGrams: number;
  lensOptions: LensOption[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartLine {
  /** Stable identity for a product + lens pairing. */
  lineId: string;
  slug: string;
  name: string;
  category: Category;
  colorway: Colorway;
  unitPrice: number;
  lensName: string;
  quantity: number;
}
