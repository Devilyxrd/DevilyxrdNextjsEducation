'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSessionStore } from '@/features/auth/store/session.store';
import { Spinner } from '@/shared/components/ui/Spinner';
import type { ReactNode } from 'react';

/**
 * ProtectedRoute — client-side guard.
 *
 * Next.js'te gerçek auth koruması middleware'e (cookie tabanlı) emanet
 * edilir. Bizim projede backend yok, session `localStorage`'da —
 * bu yüzden koruma tamamen client-side.
 *
 * Kritik: `hydrated` flag'i. persist middleware async yüklenir; ilk
 * render'da user hep null. hydrated=false ise spinner gösteriyoruz,
 * redirect yapmıyoruz. Aksi halde her yenilemede /login flash'ı görünür.
 *
 * Kullanım: `app/(shop)/checkout/page.tsx` gibi korumalı sayfalarda
 * içeriği <ProtectedRoute>...</ProtectedRoute> ile sarmak yeterli.
 */

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const user     = useSessionStore((s) => s.user);
  const hydrated = useSessionStore((s) => s.hydrated);
  const router   = useRouter();
  const pathname = usePathname();

  // Render edeceğimiz içeriği state'te tutmak yerine koşullu dönüyoruz.
  // Redirect'i effect içinde yapıyoruz ki SSR hatası çıkmasın.
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      setRedirecting(true);
      const next = encodeURIComponent(pathname);
      router.replace(`/login?next=${next}`);
    }
  }, [hydrated, user, router, pathname]);

  if (!hydrated || !user || redirecting) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
