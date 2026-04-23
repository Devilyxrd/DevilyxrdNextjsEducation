export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;                     // /products/xxx.jpg (public relative path)
  category: Category;
  featured?: boolean;
  stock: number;
  rating: number;
};

export type Category =
  | 'elektronik'
  | 'giyim'
  | 'ev'
  | 'spor'
  | 'kitap';
