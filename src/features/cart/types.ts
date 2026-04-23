/**
 * Cart feature tipleri.
 * Sepet, ürün detayının SNAPSHOT'ını tutar — ürün fiyatı değişse bile
 * sepetteki eski fiyat korunur.
 */
export type CartItem = {
  productId: number;
  name: string;
  image: string;        // next/image için relative path: '/products/xxx.jpg'
  price: number;
  quantity: number;
};
