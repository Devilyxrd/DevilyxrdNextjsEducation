import type { Metadata } from 'next';
import { AboutPage } from '@/features/home/components/AboutPage';

export const metadata: Metadata = {
  title: 'Hakkımızda',
};

export default function Page() {
  return <AboutPage />;
}
