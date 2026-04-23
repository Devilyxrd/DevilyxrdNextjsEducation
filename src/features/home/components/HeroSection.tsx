import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * HeroSection — anasayfanın üst banner'ı.
 * Statik sunum, server component olarak çalışabilir.
 * Arka planda radial gradient + blur topları (amber/brand tonu).
 */

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.2),transparent_60%)]" />
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-300 animate-slide-up"
            style={{ animationDelay: '0ms' }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Next.js App Router + Zustand eğitim projesi
          </div>

          <h1
            className="mt-6 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl animate-slide-up"
            style={{ animationDelay: '80ms' }}
          >
            Modern e-ticaret hissi,{' '}
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-orange-400 bg-clip-text text-transparent">
              Next.js ile inşa edildi
            </span>
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg text-zinc-400 animate-slide-up"
            style={{ animationDelay: '160ms' }}
          >
            App Router + Server/Client component ayrımı + Zustand + next/image
            optimizasyonu — hepsi bir arada, yorum satırlarıyla açıklamalı.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-3 animate-slide-up"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-brand-500/30 transition-all duration-200 hover:bg-brand-600 hover:shadow-brand-500/50 active:scale-95"
            >
              Ürünleri Keşfet
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-6 py-3 text-sm font-semibold text-zinc-200 backdrop-blur-sm transition-all duration-200 hover:border-brand-500/50 hover:text-zinc-100 active:scale-95"
            >
              Nasıl çalışıyor?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
