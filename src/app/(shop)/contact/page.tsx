import type { Metadata } from 'next';
import { ContactPage } from '@/features/home/components/ContactPage';

export const metadata: Metadata = {
  title: 'İletişim',
};

export default function Page() {
  return <ContactPage />;
}
