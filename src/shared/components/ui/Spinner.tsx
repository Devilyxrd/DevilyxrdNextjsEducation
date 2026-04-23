import { cn } from '@/shared/utils/cn';

/**
 * Spinner — dönen yükleme göstergesi.
 * Border-t'yi marka rengine çekerek dönen daire efekti sağlıyoruz.
 */

type Props = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export function Spinner({ size = 'md', className }: Props) {
  return (
    <span
      role="status"
      aria-label="Yükleniyor"
      className={cn(
        'inline-block rounded-full border-zinc-700 border-t-brand-400 animate-spin',
        sizeClasses[size],
        className,
      )}
    />
  );
}
