import { HeroSection } from '@/features/home/components/HeroSection';
import { FeaturedProducts } from '@/features/home/components/FeaturedProducts';
import { FeatureGrid } from '@/features/home/components/FeatureGrid';

/**
 * HomePage — sadece section kompozisyonu.
 * HeroSection ve FeatureGrid server component, FeaturedProducts client.
 * Next.js bunu akıllıca karıştırır — server parçalar HTML olarak gelir,
 * client parça hidrasyonla aktif olur.
 */

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <FeatureGrid />
    </>
  );
}
