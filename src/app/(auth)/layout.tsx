import { Navbar } from '@/shared/components/layout/Navbar';
import { ToastContainer } from '@/shared/components/ui/ToastContainer';
import { ScrollToTop } from '@/shared/components/layout/ScrollToTop';

/**
 * (auth) route group layout'u.
 *
 * Auth sayfalarında footer'ı göstermiyoruz (daha odaklı bir UX) ama Navbar
 * hala var; kullanıcı anasayfaya geri dönebilmeli.
 *
 * AuthCard tüm form sayfalarının ortak kartı — her page onu import ediyor.
 */

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">{children}</main>
      <ToastContainer />
    </div>
  );
}
