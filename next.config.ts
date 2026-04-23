import type { NextConfig } from 'next';

/**
 * next.config.ts — projenin Next.js ayarı.
 *
 * reactStrictMode: dev'de hooks 2 kere çağrılır, side effect hatalarını
 * erken yakalarsın (prod'da etkisiz).
 *
 * images.remotePatterns: ürün görselleri /public'te ama uzak kaynakları
 * ileride kullanmak istersen diye Unsplash/Picsum pattern'ları hazır.
 */

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};

export default nextConfig;
