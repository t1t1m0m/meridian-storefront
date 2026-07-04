import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { ProductArt } from '@/components/ProductArt';
import { Reveal } from '@/components/Reveal';
import { ArrowIcon } from '@/components/icons';
import { products } from '@/lib/products';

const hero = products.find((p) => p.slug === 'halden') ?? products[0];
const featured = products.filter((p) => p.isFeatured).slice(0, 3);

const craft = [
  {
    n: '01',
    title: 'Block acetate',
    body: 'Every acetate frame starts as a solid sheet from Mazzucchelli in Italy — milled, tumbled and hand-polished over days, never injection-moulded.',
  },
  {
    n: '02',
    title: 'Beta-titanium',
    body: 'Our wire frames use aerospace beta-titanium: it flexes to your face and springs back true, at a third of the weight of steel. Nickel-free throughout.',
  },
  {
    n: '03',
    title: 'Lenses that earn it',
    body: 'From G-15 to polarized and our cobalt mirror, every lens is anti-reflective coated and cut to spec. Optical frames ship Rx-ready for your optician.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------- Editorial hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="container-editorial pb-8 pt-14 sm:pt-20">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="relative z-10 lg:col-span-7">
              <p className="eyebrow animate-rise">Coastline · Spring collection</p>
              <h1 className="mt-5 font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.92] tracking-tightest text-ink">
                <span className="block animate-rise">See sharp.</span>
                <span
                  className="block animate-rise text-cobalt"
                  style={{ animationDelay: '80ms' }}
                >
                  Wear sharper.
                </span>
              </h1>
              <p
                className="mt-6 max-w-md animate-rise text-lg leading-relaxed text-muted"
                style={{ animationDelay: '160ms' }}
              >
                Sunglasses and optical frames cut from block acetate and beta-titanium.
                Designed in one small studio. Built to be the only pair you reach for.
              </p>
              <div
                className="mt-8 flex animate-rise flex-wrap items-center gap-4"
                style={{ animationDelay: '240ms' }}
              >
                <Link href="/products" className="btn-primary">
                  Shop the collection
                  <ArrowIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/products?category=Optical"
                  className="link-underline font-sans text-sm font-medium text-ink"
                >
                  Explore optical
                </Link>
              </div>
            </div>

            {/* Hero product image the headline overlaps into */}
            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-night">
                <ProductArt
                  colorway={hero.colorway}
                  category={hero.category}
                  seed="hero"
                  className="h-full w-full"
                />
              </div>
              <Link
                href={`/products/${hero.slug}`}
                className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-full bg-paper px-4 py-2.5 shadow-lg ring-1 ring-hairline transition-transform hover:-translate-y-0.5 lg:-left-10"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-cobalt" />
                <span className="font-sans text-sm">
                  <span className="font-semibold text-ink">{hero.name}</span>
                  <span className="text-muted"> — new for spring</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Marquee-style stat strip */}
        <div className="mt-10 border-y border-hairline">
          <div className="container-editorial flex flex-wrap items-center justify-between gap-y-3 py-4 text-sm text-muted">
            <span>Free 2-day shipping</span>
            <span className="hidden sm:inline">·</span>
            <span>30-day frame trial</span>
            <span className="hidden sm:inline">·</span>
            <span>Prescription-ready</span>
            <span className="hidden sm:inline">·</span>
            <span>Italian acetate &amp; titanium</span>
          </div>
        </div>
      </section>

      {/* ---------- Featured collection ---------- */}
      <section className="container-editorial py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Editors’ picks</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              The ones we keep recommending
            </h2>
          </div>
          <Link
            href="/products"
            className="link-underline hidden shrink-0 font-sans text-sm font-medium text-ink sm:block"
          >
            View all frames
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ---------- Craft / materials (contrast block) ---------- */}
      <section className="bg-night text-paper">
        <div className="container-editorial py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-paper/50">The craft</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Materials chosen for the next ten years, not the next season.
            </h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-3">
            {craft.map((item, i) => (
              <Reveal key={item.n} delay={i * 0.08} className="bg-night p-8">
                <p className="font-display text-5xl font-extrabold text-cobalt">
                  {item.n}
                </p>
                <h3 className="mt-6 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{item.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-sans text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Find your frame
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Full catalogue teaser ---------- */}
      <section className="container-editorial py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The full range</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Eight frames. No filler.
            </h2>
          </div>
          <Link
            href="/products"
            className="link-underline hidden shrink-0 font-sans text-sm font-medium text-ink sm:block"
          >
            Shop all
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
