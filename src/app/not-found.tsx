import Link from 'next/link';
import { Home } from 'lucide-react';
import { Navbar } from '@/shared/components/layout/Navbar';
import { Footer } from '@/shared/components/layout/Footer';
import { Button } from '@/shared/components/ui/Button';

/**
 * not-found.tsx — Next.js'in built-in 404 handler'ı.
 * `app/` kökündeki bu dosya, uygulamanın her yerinde eşleşmeyen
 * route'lar için çağrılır. Her route group kendi not-found.tsx'ine de
 * sahip olabilir.
 */

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <Navbar />
      <main className="relative flex flex-1 items-center justify-center px-4 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1),transparent_60%)]" />
        <div className="relative animate-fade-in">
          <div className="text-9xl font-black leading-none text-transparent bg-gradient-to-b from-brand-400 via-brand-500 to-brand-800 bg-clip-text animate-slide-up">
            404
          </div>
          <h1
            className="mt-4 text-2xl font-bold text-zinc-100 animate-slide-up"
            style={{ animationDelay: '80ms' }}
          >
            Sayfa bulunamadı
          </h1>
          <p
            className="mt-2 text-sm text-zinc-400 animate-slide-up"
            style={{ animationDelay: '160ms' }}
          >
            Aradığın sayfa ya taşınmış ya da hiç var olmamış.
          </p>
          <div className="mt-8 animate-slide-up" style={{ animationDelay: '240ms' }}>
            <Link href="/">
              <Button leftIcon={<Home className="h-4 w-4" />}>Anasayfaya Dön</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
