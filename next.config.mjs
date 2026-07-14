/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Editorial photography is hot-linked from verified free-licence CDNs.
    // Swap these for your own /public images (or a Supabase Storage bucket) at launch.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['clsx'],
  },
};

export default nextConfig;
