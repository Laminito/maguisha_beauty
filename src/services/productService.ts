import api from './api';
import type { Product, ProductFilter } from '../types/product';
import { mockProducts } from '../data/mockProducts';

class ProductService {
  async getProducts(filter?: ProductFilter): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      
      if (filter?.category) params.append('category', filter.category);
      if (filter?.minPrice) params.append('minPrice', filter.minPrice.toString());
      if (filter?.maxPrice) params.append('maxPrice', filter.maxPrice.toString());
      if (filter?.brand) params.append('brand', filter.brand);
      if (filter?.search) params.append('search', filter.search);
      if (filter?.sortBy) params.append('sortBy', filter.sortBy);

      const response = await api.get<Product[]>(`/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Return mock data for demo
      return this.getMockProducts(filter);
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      // Return mock data for demo
      const products = this.getMockProducts();
      return products.find(p => p.id === id) || null;
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>('/products/featured');
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return this.getMockProducts().filter(p => p.featured);
    }
  }

  private getMockProducts(filter?: ProductFilter): Product[] {
    let filtered = [...mockProducts];

    if (filter) {
      if (filter.category) {
        filtered = filtered.filter(p => p.category === filter.category);
      }
      if (filter.minPrice) {
        filtered = filtered.filter(p => p.price >= filter.minPrice!);
      }
      if (filter.maxPrice) {
        filtered = filtered.filter(p => p.price <= filter.maxPrice!);
      }
      if (filter.brand) {
        filtered = filtered.filter(p => p.brand === filter.brand);
      }
      if (filter.search) {
        const search = filter.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
        );
      }
      if (filter.sortBy) {
        switch (filter.sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'popularity':
            filtered.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
        }
      }
    }

    return filtered;
  }
}

export default new ProductService();
