import type { Metadata } from 'next';
import { OrdersPage } from '@/features/orders/components/OrdersPage';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';

/**
 * /orders — protected sayfa.
 * ProtectedRoute client component olduğu için sayfayı sarması sorun değil;
 * Next.js server layout + client wrapper + client page akışı doğal.
 */

export const metadata: Metadata = {
  title: 'Siparişlerim',
};

export default function Page() {
  return (
    <ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>
  );
}
