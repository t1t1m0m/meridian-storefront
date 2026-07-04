import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { CartDrawer } from '@/components/CartDrawer';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://meridian.example'),
  title: {
    default: 'Meridian — Modern Eyewear',
    template: '%s · Meridian',
  },
  description:
    'Meridian designs sunglasses and optical frames from block acetate and beta-titanium. Editorial eyewear, cut sharp and worn everywhere.',
  keywords: ['eyewear', 'sunglasses', 'optical frames', 'acetate', 'titanium', 'Meridian'],
  openGraph: {
    title: 'Meridian — Modern Eyewear',
    description:
      'Sunglasses and optical frames cut from block acetate and beta-titanium.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cobalt focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
