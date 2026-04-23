'use client';

import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';
import { formatTL } from '@/shared/utils/formatTL';
import { useCartStore } from '@/features/cart/store/cart.store';
import { useUIStore } from '@/shared/store/ui.store';
import type { Product } from '@/features/products/types';

/**
 * ProductCard — tek bir ürün kutusu.
 *
 * Next/Image notu:
 *   - <Image> otomatik optimize eder (AVIF/WebP, responsive srcset).
 *   - width/height veya fill zorunlu — layout shift'i önlemek için.
 *   - Biz `fill` kullanıyoruz; parent'ın relative + boyutu olmalı.
 *
 * Tıklanınca Zustand cart store'a ekleniyor + toast gösteriliyor.
 * Hover'da kart yukarı kalkıyor (Card `hover` prop'u) + görsel büyüyor.
 */

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const addItem  = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);

  const outOfStock = product.stock === 0;

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    });
    addToast(`${product.name} sepete eklendi`, 'success');
  }

  return (
    <Card hover padded={false} className="overflow-hidden flex flex-col group">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-zinc-800/60 to-zinc-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {product.featured && (
          <Badge variant="brand" className="absolute top-3 left-3 backdrop-blur-sm">
            ⭐ Öne Çıkan
          </Badge>
        )}

        {outOfStock && (
          <div className="absolute inset-0 grid place-items-center bg-zinc-950/70 backdrop-blur-sm">
            <Badge variant="danger">Stokta Yok</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-100 line-clamp-1">
            {product.name}
          </h3>
          <span className="flex shrink-0 items-center gap-0.5 text-xs text-amber-400">
            <Star className="h-3 w-3 fill-current" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <p className="text-xs text-zinc-400 line-clamp-2 min-h-[2rem]">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-base font-bold text-zinc-100">
            {formatTL(product.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={outOfStock}
            leftIcon={<ShoppingCart className="h-3.5 w-3.5" />}
          >
            Ekle
          </Button>
        </div>
      </div>
    </Card>
  );
}
