import type { Metadata } from 'next';
import { CheckoutPage } from '@/features/checkout/components/CheckoutPage';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Ödeme',
};

export default function Page() {
  return (
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  );
}
