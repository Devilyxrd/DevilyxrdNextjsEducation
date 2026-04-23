'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollToTop — App Router rota değişiminde scroll'u başa alır.
 *
 * Next.js'te varsayılan olarak pathname değişince scroll üste alınır,
 * ancak hash/query değişikliklerinde bazen sorun yaşanabilir. Bu bileşen
 * ek güvence; pathname her değiştiğinde instant scroll yapar.
 *
 * Layout içinde bir yerde render edildiği sürece etkindir.
 */

export function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}
