import type { Metadata } from 'next';
import { ProductsPage } from '@/features/products/components/ProductsPage';

/**
 * `/products` sayfa dosyası.
 * Thin wrapper: feature component'ı render eder, metadata tanımlar.
 * Page file'ın ince tutulması, feature logic'ini features/ altında
 * toplamak — test + yeniden kullanım için kritik.
 */

export const metadata: Metadata = {
  title: 'Ürünler',
  description: 'Tüm ürünleri kategori bazlı filtreleyip arayabilirsin.',
};

export default function Page() {
  return <ProductsPage />;
}
