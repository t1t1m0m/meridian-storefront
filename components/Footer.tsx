import Link from 'next/link';
import { Newsletter } from './Newsletter';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { href: '/products', label: 'All frames' },
      { href: '/products?category=Sunglasses', label: 'Sunglasses' },
      { href: '/products?category=Optical', label: 'Optical' },
      { href: '/products?sort=new', label: 'New arrivals' },
    ],
  },
  {
    title: 'Meridian',
    links: [
      { href: '/', label: 'Our craft' },
      { href: '/', label: 'Materials' },
      { href: '/', label: 'Stores' },
      { href: '/', label: 'Journal' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/', label: 'Prescriptions' },
      { href: '/', label: 'Fit guide' },
      { href: '/', label: 'Returns' },
      { href: '/', label: 'Contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-night text-paper">
      <div className="container-editorial py-16">
        <Newsletter />

        <div className="mt-16 grid grid-cols-2 gap-10 border-t border-white/10 pt-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl font-extrabold tracking-tightest">
              MERIDIAN<span className="text-cobalt">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-paper/60">
              Eyewear cut from block acetate and beta-titanium. Designed in a small
              studio, worn everywhere.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="eyebrow text-paper/50">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/80 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Meridian Eyewear. A portfolio project.</p>
          <p>Made with Next.js, TypeScript &amp; Tailwind.</p>
        </div>
      </div>
    </footer>
  );
}
