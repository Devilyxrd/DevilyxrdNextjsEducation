import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Kayıt Ol',
};

export default function Page() {
  return (
    <AuthCard
      title="Hesap Oluştur"
      description="Kısa formu doldur, anında sisteme giriş yap."
      footer={
        <>
          Zaten bir hesabın var mı?{' '}
          <Link href="/login" className="font-medium text-brand-300 hover:text-brand-200">
            Giriş yap
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
