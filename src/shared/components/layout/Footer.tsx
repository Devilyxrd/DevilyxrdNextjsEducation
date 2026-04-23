import Link from 'next/link';
import { Github, Twitter, Instagram, ShoppingBag } from 'lucide-react';

/**
 * Footer — her sayfanın altında bilgi bandı.
 * Dinamik state yok — server component olarak çalışabilir.
 * Sadece `Link` client-side navigation yapar, component'in kendisi
 * SSR'da render edilir.
 */

const columns = [
  {
    title: 'Alışveriş',
    links: [
      { href: '/products', label: 'Tüm Ürünler' },
      { href: '/cart',     label: 'Sepetim' },
      { href: '/orders',   label: 'Siparişlerim' },
    ],
  },
  {
    title: 'Kurumsal',
    links: [
      { href: '/about',   label: 'Hakkımızda' },
      { href: '/contact', label: 'İletişim' },
    ],
  },
  {
    title: 'Hesap',
    links: [
      { href: '/login',           label: 'Giriş Yap' },
      { href: '/register',        label: 'Kayıt Ol' },
      { href: '/forgot-password', label: 'Şifremi Unuttum' },
    ],
  },
];

const socials = [
  { href: '#', label: 'GitHub',    icon: Github },
  { href: '#', label: 'Twitter',   icon: Twitter },
  { href: '#', label: 'Instagram', icon: Instagram },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-500/20">
                <ShoppingBag className="h-4.5 w-4.5 text-zinc-950" />
              </span>
              <span className="text-base font-bold text-zinc-100">Devilyxrd</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-zinc-400">
              Next.js App Router + Zustand ile baştan sona eğitim amaçlı
              bir e-ticaret projesi.
            </p>
            <div className="mt-4 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-800 text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/50 hover:text-brand-300"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-zinc-100">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-brand-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Devilyxrd · Eğitim amaçlı demo ·
          Next.js + Zustand
        </div>
      </div>
    </footer>
  );
}
