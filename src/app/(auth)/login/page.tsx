import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { Spinner } from '@/shared/components/ui/Spinner';

export const metadata: Metadata = {
  title: 'Giriş Yap',
};

/**
 * /login — AuthCard server component, LoginForm client component.
 *
 * LoginForm `useSearchParams()` kullanıyor (next redirect query'si için).
 * Next.js bu hook'u build-time prerender'ından bailout ediyor; Suspense
 * boundary ile sarmamız ZORUNLU — aksi halde sayfa static üretilemiyor.
 *
 * Suspense `fallback` — hook async olarak hazırlanırken gösterilecek.
 * Burada hafif bir Spinner yeterli; search params anında çözülür.
 */

export default function Page() {
  return (
    <AuthCard
      title="Giriş Yap"
      description="Hesabınla giriş yap veya demo hesabı kullan."
      footer={
        <>
          Hesabın yok mu?{' '}
          <Link href="/register" className="font-medium text-brand-300 hover:text-brand-200">
            Kayıt ol
          </Link>
        </>
      }
    >
      <Suspense fallback={<div className="py-6 text-center"><Spinner /></div>}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
