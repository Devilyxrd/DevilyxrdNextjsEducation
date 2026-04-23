/**
 * cn — className birleştirici.
 *
 * Tailwind'te class string'leri koşullu birleştirilir:
 *   <button className={cn('px-4', isActive && 'bg-brand-500', disabled && 'opacity-50')}>
 *
 * Bağımlılık eklememek için minimum implementasyon:
 *   - falsy değerleri at (false, null, undefined, '')
 *   - array'leri recursive düzleştir
 *   - tek string olarak birleştir
 */
export type ClassValue = string | number | false | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) classes.push(inner);
    } else {
      classes.push(String(input));
    }
  }
  return classes.join(' ');
}
