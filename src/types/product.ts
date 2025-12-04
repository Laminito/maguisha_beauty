export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  brand: string;
  images: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags?: string[];
}

export type ProductCategory = 'wigs' | 'weaves' | 'extensions' | 'hair-care' | 'lingerie' | 'sleepwear' | 'accessories' | 'beauty' | 'intimate' | 'wellness';

export interface ProductFilter {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'popularity';
}
