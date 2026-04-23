import type { Metadata } from 'next';
import { CartPage } from '@/features/cart/components/CartPage';

export const metadata: Metadata = {
  title: 'Sepetim',
};

export default function Page() {
  return <CartPage />;
}
