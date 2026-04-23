import { Zap, ShieldCheck, Layers, Smartphone } from 'lucide-react';
import { Card } from '@/shared/components/ui/Card';

/**
 * FeatureGrid — 4 kutulu özellik vitrini.
 * Statik içerik, server component.
 */

const features = [
  {
    icon: Zap,
    title: 'App Router',
    description: 'Server + Client component ayrımı, layout-based routing.',
  },
  {
    icon: ShieldCheck,
    title: 'Session Persist',
    description: 'Zustand + persist middleware, hidrasyon sonrası hazır state.',
  },
  {
    icon: Layers,
    title: 'Feature-Based',
    description: 'Her feature kendi pages/components/store/services ile.',
  },
  {
    icon: Smartphone,
    title: 'next/image',
    description: 'Otomatik AVIF/WebP dönüşüm, responsive srcset.',
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl animate-fade-in">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
          Neden bu proje?
        </h2>
        <p className="mt-2 text-zinc-400">
          Next.js'in production seviye özelliklerini gerçek bir e-ticaret
          akışında — kırmadan, yorumlarla — görmek.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Card
            key={f.title}
            hover
            className="animate-slide-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-brand-500/10 text-brand-300 ring-1 ring-brand-500/30">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-zinc-100">{f.title}</h3>
            <p className="mt-1.5 text-sm text-zinc-400">{f.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
