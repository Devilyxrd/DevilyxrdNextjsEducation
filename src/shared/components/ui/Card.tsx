import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

/**
 * Card — içerik panelleri için yarı saydam kutu.
 * `hover` prop'u ile üstüne gelindiğinde hafif yukarı kalkar,
 * border markaya döner ve glow efekti çıkar.
 *
 * Pure presentational — state yok, 'use client' gereksiz. Server
 * component olarak çalışabilir.
 */

type Props = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  padded?: boolean;
};

export function Card({ hover, padded = true, className, children, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={cn(
        'rounded-xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-800',
        'transition-all duration-300 ease-out',
        hover &&
          'hover:border-brand-500/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10 cursor-pointer',
        padded && 'p-5',
        className,
      )}
    >
      {children}
    </div>
  );
}
