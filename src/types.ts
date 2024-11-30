export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ShoeSize = '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45';

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  type: 'clothing' | 'shoes';
  sizes: Record<ProductSize | ShoeSize, number>; // size to stock mapping
}

export interface Order {
  id: string;
  productId: string;
  instagramUsername: string;
  size: ProductSize | ShoeSize;
  timestamp: number;
}