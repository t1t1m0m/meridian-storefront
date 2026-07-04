/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Product art in this project is rendered as inline SVG/gradient (no network
    // needed, guarantees an offline build). If you swap in Unsplash photography,
    // this remotePatterns entry keeps `next/image` happy.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
