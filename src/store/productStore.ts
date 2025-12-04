import { create } from 'zustand';
import type { Product, ProductFilter } from '../types/product';
import productService from '../services/productService';

interface ProductStore {
  products: Product[];
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
  currentFilter: ProductFilter | null;
  fetchProducts: (filter?: ProductFilter) => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  setFilter: (filter: ProductFilter) => void;
  clearFilter: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,
  currentFilter: null,

  fetchProducts: async (filter) => {
    set({ loading: true, error: null });
    try {
      const products = await productService.getProducts(filter);
      set({ products, loading: false, currentFilter: filter || null });
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true, error: null });
    try {
      const featuredProducts = await productService.getFeaturedProducts();
      set({ featuredProducts, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch featured products', loading: false });
    }
  },

  setFilter: (filter) => {
    set({ currentFilter: filter });
  },

  clearFilter: () => {
    set({ currentFilter: null });
  },
}));
