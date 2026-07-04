import type { LensOption, Product } from './types';

const sunLenses: LensOption[] = [
  {
    id: 'g15',
    name: 'G-15 Solid',
    priceDelta: 0,
    description: 'Warm neutral grey-green. The classic. Cuts glare without shifting color.',
  },
  {
    id: 'brown-gradient',
    name: 'Brown Gradient',
    priceDelta: 20,
    description: 'Fades from deep espresso to clear — softer contrast, easy on bright days.',
  },
  {
    id: 'polarized-grey',
    name: 'Polarized Grey',
    priceDelta: 55,
    description: 'Kills reflected glare off water and asphalt. True-to-life tones.',
  },
  {
    id: 'mirror-cobalt',
    name: 'Cobalt Mirror',
    priceDelta: 45,
    description: 'A flashed cobalt finish over a grey base. Our house signature.',
  },
];

const opticalLenses: LensOption[] = [
  {
    id: 'clear',
    name: 'Clear Rx-ready',
    priceDelta: 0,
    description: 'Demo lenses shipped ready for your prescription at any optician.',
  },
  {
    id: 'blue-filter',
    name: 'Blue-light Filter',
    priceDelta: 40,
    description: 'A near-invisible coating that tempers screen glare on long days.',
  },
  {
    id: 'progressive',
    name: 'Progressive-ready',
    priceDelta: 90,
    description: 'Deeper lens geometry cut for seamless progressive prescriptions.',
  },
];

export const products: Product[] = [
  {
    slug: 'halden',
    name: 'Halden',
    tagline: 'The everyday square, softened',
    category: 'Sunglasses',
    price: 195,
    material: 'Italian acetate',
    color: 'Ink Black',
    colorway: { base: '#2A2A2E', wash: '#17171A', frame: '#101014', lens: '#3E4653' },
    collection: 'Coastline',
    description:
      'A square silhouette with the corners quietly rounded — assertive from the front, friendly in person. Halden is cut from a single block of Mazzucchelli acetate, hand-polished over three days until the surface reads like glass. It is the frame we reach for when we have not decided what the day will be.',
    details: [
      'Milled from 8mm Italian block acetate',
      'Five-barrel stainless hinges, screw-mounted',
      'Adjustable acetate nose pads',
      'Laser-etched Meridian mark on the left temple',
    ],
    fit: 'Medium — 51▢20▢145. Suits oval and heart face shapes.',
    weightGrams: 28,
    lensOptions: sunLenses,
    isFeatured: true,
    isNew: true,
  },
  {
    slug: 'kestrel',
    name: 'Kestrel',
    tagline: 'A pilot with sharper eyes',
    category: 'Sunglasses',
    price: 240,
    material: 'Beta-titanium',
    color: 'Slate',
    colorway: { base: '#4A5568', wash: '#1E2530', frame: '#8A93A3', lens: '#2C3340' },
    collection: 'Coastline',
    description:
      'We took the aviator apart and rebuilt it leaner. Kestrel’s teardrop is drawn tighter and set in a beta-titanium wire that flexes with your face and springs back true. At 11 grams it disappears; the double bridge and thin temples keep the profile honest and modern.',
    details: [
      'Beta-titanium wire frame, 11g total',
      'Double bridge with a satin-brushed finish',
      'Silicone-tipped adjustable nose pads',
      'Hypoallergenic — nickel-free throughout',
    ],
    fit: 'Wide — 58▢14▢140. Balances longer and square faces.',
    weightGrams: 11,
    lensOptions: sunLenses,
    isFeatured: true,
  },
  {
    slug: 'vero',
    name: 'Vero',
    tagline: 'Editorial oval, all confidence',
    category: 'Sunglasses',
    price: 210,
    material: 'Bio-acetate',
    color: 'Tortoise',
    colorway: { base: '#7A4B27', wash: '#2A1B0F', frame: '#5C3A1E', lens: '#6B4A2A' },
    collection: 'Atelier',
    description:
      'Vero is a slim oval with a flat top line — the kind of frame that looks like it was borrowed from a photographer in Milan. The tortoise is a plant-based bio-acetate with real depth: amber, cognac and near-black pooling differently in every frame, so no two are quite alike.',
    details: [
      'Renewable bio-acetate (67% plant-derived)',
      'Hand-laid tortoise pattern, one-of-a-kind',
      'Keyhole bridge for a vintage seat',
      'Flush-set flat hinges',
    ],
    fit: 'Medium — 49▢21▢145. Flatters round and square faces.',
    weightGrams: 26,
    lensOptions: sunLenses,
    isNew: true,
  },
  {
    slug: 'marlowe',
    name: 'Marlowe',
    tagline: 'The reading frame, reconsidered',
    category: 'Optical',
    price: 165,
    material: 'Italian acetate',
    color: 'Crystal',
    colorway: { base: '#C9CDD4', wash: '#8A909C', frame: '#DDE1E7', lens: '#EEF1F5' },
    collection: 'Studio',
    description:
      'Marlowe is a rounded rectangle in translucent crystal acetate — a frame that reads clean on screen calls and softer in person. The clear body lets the metal core catch the light, so the design shows its structure rather than hiding it. Built Rx-ready for a same-week trip to your optician.',
    details: [
      'Translucent crystal block acetate',
      'Visible stainless core wire',
      'Spring-loaded hinges for daily wear',
      'Demo lenses ship ready for prescription',
    ],
    fit: 'Medium — 50▢19▢145. A safe, flattering all-rounder.',
    weightGrams: 24,
    lensOptions: opticalLenses,
    isFeatured: true,
  },
  {
    slug: 'sable',
    name: 'Sable',
    tagline: 'Bold optical, quiet luxury',
    category: 'Optical',
    price: 180,
    material: 'Italian acetate',
    color: 'Ink Black',
    colorway: { base: '#26262A', wash: '#0E0E11', frame: '#141418', lens: '#F0F1F4' },
    collection: 'Studio',
    description:
      'A generous, bookish rectangle for people who want the frame to be the statement. Sable runs a touch oversized with a strong brow line, then keeps everything else restrained — matte-polished black, no logo on the front, weight balanced so it sits without pinching through a long afternoon of reading.',
    details: [
      'Oversized brow-forward rectangle',
      'Matte-then-polished black acetate',
      'Reinforced five-barrel hinges',
      'Interior temple engraving only',
    ],
    fit: 'Wide — 54▢18▢148. Made for larger and square faces.',
    weightGrams: 30,
    lensOptions: opticalLenses,
  },
  {
    slug: 'ines',
    name: 'Ines',
    tagline: 'A delicate cat-eye in wire',
    category: 'Optical',
    price: 175,
    material: 'Stainless steel',
    color: 'Cobalt',
    colorway: { base: '#1B3BFF', wash: '#0A1A66', frame: '#3B57FF', lens: '#EAEEFF' },
    collection: 'Atelier',
    description:
      'Ines lifts at the outer corner into a whisper of a cat-eye, drawn entirely in fine stainless wire and finished in our house cobalt. It is featherlight and deliberately minimal — the color does all the talking. A frame for people who like their statements small, sharp and exactly on the nose.',
    details: [
      'Fine stainless-steel wire, cobalt e-coat',
      'Soft cat-eye upsweep',
      'Adjustable saddle nose bridge',
      'Sprung temples for a secure seat',
    ],
    fit: 'Narrow — 48▢20▢140. Suits smaller and oval faces.',
    weightGrams: 14,
    lensOptions: opticalLenses,
    isNew: true,
  },
  {
    slug: 'corbin',
    name: 'Corbin',
    tagline: 'A workhorse browline',
    category: 'Sunglasses',
    price: 220,
    material: 'Acetate + titanium',
    color: 'Amber',
    colorway: { base: '#B87A2E', wash: '#4A2E12', frame: '#8A5A22', lens: '#5A4526' },
    collection: 'Coastline',
    description:
      'Corbin pairs a warm amber acetate brow with a slim titanium underwire — the browline reworked so it reads current, not retro. The two materials meet in a clean line that keeps the frame light up top and rimless below, so it never overwhelms. Our most-worn travel pair, and it shows.',
    details: [
      'Amber acetate brow over titanium underwire',
      'Semi-rimless lower construction',
      'Warm honey acetate with grain movement',
      'Titanium temples with acetate tips',
    ],
    fit: 'Medium — 52▢19▢145. Balanced for most face shapes.',
    weightGrams: 22,
    lensOptions: sunLenses,
  },
  {
    slug: 'lumen',
    name: 'Lumen',
    tagline: 'Round, minimal, unbreakable calm',
    category: 'Sunglasses',
    price: 185,
    material: 'Beta-titanium',
    color: 'Slate',
    colorway: { base: '#5B6472', wash: '#20262F', frame: '#9AA2AE', lens: '#33404E' },
    collection: 'Atelier',
    description:
      'A true round in the thinnest titanium we can draw. Lumen is the frame for people who want to look like they think for a living — spare, intellectual, weightless. The wire is a matte gunmetal that shifts almost slate in daylight, and the flat lenses keep the whole thing looking drawn rather than moulded.',
    details: [
      'Beta-titanium round, matte gunmetal',
      'Flat cobalt-mirror lenses available',
      'Slim adjustable nose pads',
      'One-piece temple with no visible weld',
    ],
    fit: 'Medium — 47▢22▢145. Best on angular and square faces.',
    weightGrams: 12,
    lensOptions: sunLenses,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return products.slice(0, limit);

  const sameCollection = products.filter(
    (product) => product.slug !== slug && product.collection === current.collection,
  );
  const others = products.filter(
    (product) => product.slug !== slug && product.collection !== current.collection,
  );

  return [...sameCollection, ...others].slice(0, limit);
}

export const categories = ['Sunglasses', 'Optical'] as const;

export const colorFilters = [
  'Ink Black',
  'Tortoise',
  'Crystal',
  'Cobalt',
  'Amber',
  'Slate',
] as const;

export const collections = Array.from(
  new Set(products.map((product) => product.collection)),
);
