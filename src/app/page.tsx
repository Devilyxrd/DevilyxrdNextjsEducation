import { Navbar } from '@/shared/components/layout/Navbar';
import { Footer } from '@/shared/components/layout/Footer';
import { ToastContainer } from '@/shared/components/ui/ToastContainer';
import { ScrollToTop } from '@/shared/components/layout/ScrollToTop';
import { HomePage } from '@/features/home/components/HomePage';

/**
 * Anasayfa (`/`) — root route.
 *
 * Not: App Router'da root route group olarak (shop)/page.tsx da OLABİLİRDİ
 * ama Next.js'te iki farklı group'un aynı "/" segment'ine sahip olması
 * çakışmaya yol açar. Bu yüzden anasayfayı doğrudan app/page.tsx'te tutup
 * Navbar/Footer/Toast'ı burada da koyuyoruz.
 *
 * HomePage + Navbar + Footer aynı sayfada —> tek layer'lı render.
 */

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
