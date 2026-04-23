import { Navbar } from '@/shared/components/layout/Navbar';
import { Footer } from '@/shared/components/layout/Footer';
import { ToastContainer } from '@/shared/components/ui/ToastContainer';
import { ScrollToTop } from '@/shared/components/layout/ScrollToTop';

/**
 * (shop) route group — Navbar + Footer görünen alışveriş sayfaları.
 *
 * Parantez içindeki klasör adı URL'e yansımaz; sadece layout grouping için.
 * Yani /products, /cart, /orders hepsi burada Navbar + Footer altında.
 *
 * ToastContainer + ScrollToTop her yerde gerekli; auth layout'unda da
 * tekrar import edilecek.
 */

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
