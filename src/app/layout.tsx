import type { Metadata } from 'next';
import './globals.css';

/**
 * Root Layout — her sayfanın dış HTML iskeletini sarar.
 *
 * Next.js App Router'da `app/layout.tsx` ZORUNLUDUR ve <html> + <body>
 * burada tanımlanır. globals.css yalnızca bu dosyada import edilir;
 * tüm sayfalara yayılır.
 *
 * Tema: `<html class="dark">` — uygulama baştan sona karanlık.
 *
 * `metadata` objesi Next.js'in built-in SEO mekanizması — <head>'e
 * otomatik <title>, <meta> ekler.
 *
 * Bu dosya server component (default). İçindeki Navbar/Footer layout
 * group'larında tanımlanıyor — burada en üst sarmalı tutuyoruz.
 */

export const metadata: Metadata = {
  title: {
    default: 'Devilyxrd · Next.js E-Ticaret Demo',
    template: '%s · Devilyxrd',
  },
  description:
    'Next.js App Router + Zustand ile kurulu, eğitim amaçlı e-ticaret demo projesi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
