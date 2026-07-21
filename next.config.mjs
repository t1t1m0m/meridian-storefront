/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages hosting.
  output: 'export',
  basePath: process.env.PAGES_BASE ? '/meridian-storefront' : '',
  images: {
    // Product art in this project is rendered as inline SVG/gradient (no network
    // needed, guarantees an offline build). If you swap in Unsplash photography,
    // this remotePatterns entry keeps `next/image` happy.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
