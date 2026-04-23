'use client';

import { useEffect, useState } from 'react';

/**
 * useDebounce — Bir değeri `delay` ms geciktirerek döndürür.
 *
 *   const [query, setQuery] = useState('');
 *   const debounced        = useDebounce(query, 300);
 *   useEffect(() => { fetchProducts(debounced); }, [debounced]);
 *
 * Kullanıcı tuşa bastıkça `query` değişir ama `debounced` sadece
 * 300ms boyunca ek tuş basılmazsa güncellenir — API spam'i önlenir.
 *
 * useEffect cleanup'ı kritik: eski setTimeout iptal edilmezse her render'da
 * yeni bir timer açılır, eskisi yine tetiklenir. cleanup fonksiyonu effect
 * her yeniden çalışmadan ÖNCE çağrılır.
 *
 * NOT: 'use client' — bu hook state ve effect kullanıyor, Next.js'te
 * client component olarak çalışması gerekiyor.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
