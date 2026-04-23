import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Şifremi Unuttum',
};

/**
 * Başlık tüm adımlarda aynı tutuluyor (state machine parent'a sızdırmıyoruz)
 * — sadeleştirme tercihi.
 */

export default function Page() {
  return (
    <AuthCard
      title="Şifremi Unuttum"
      description="Güvenlik sorunu yanıtlayarak şifreni sıfırla."
      footer={
        <>
          Şifreni hatırladın mı?{' '}
          <Link href="/login" className="font-medium text-brand-300 hover:text-brand-200">
            Giriş yap
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
