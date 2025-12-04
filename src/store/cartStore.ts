import { create } from 'zustand';
import type { Cart, CartItem } from '../types/cart';
import type { Product } from '../types/product';

interface CartStore extends Cart {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItem: (productId: string) => CartItem | undefined;
}

const getStoredCart = (): Cart => {
  if (typeof window === 'undefined') return { items: [], totalItems: 0, totalAmount: 0 };
  try {
    const stored = localStorage.getItem('beauty-hair-cart');
    return stored ? JSON.parse(stored) : { items: [], totalItems: 0, totalAmount: 0 };
  } catch {
    return { items: [], totalItems: 0, totalAmount: 0 };
  }
};

const saveCart = (cart: Cart) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('beauty-hair-cart', JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart:', e);
  }
};

export const useCartStore = create<CartStore>()((set, get) => {
  const initial = getStoredCart();
  
  return {
    ...initial,

    addItem: (product, quantity = 1) => {
      set((state) => {
        const existingItem = state.items.find((item) => item.product.id === product.id);

        let newItems: CartItem[];
        if (existingItem) {
          newItems = state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...state.items, { product, quantity }];
        }

        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        const newState = {
          items: newItems,
          totalItems,
          totalAmount,
        };
        
        saveCart(newState);
        return newState;
      });
    },

    removeItem: (productId) => {
      set((state) => {
        const newItems = state.items.filter((item) => item.product.id !== productId);
        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        const newState = {
          items: newItems,
          totalItems,
          totalAmount,
        };
        
        saveCart(newState);
        return newState;
      });
    },

    updateQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        get().removeItem(productId);
        return;
      }

      set((state) => {
        const newItems = state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );

        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        const newState = {
          items: newItems,
          totalItems,
          totalAmount,
        };
        
        saveCart(newState);
        return newState;
      });
    },

    clearCart: () => {
      const newState = {
        items: [],
        totalItems: 0,
        totalAmount: 0,
      };
      saveCart(newState);
      set(newState);
    },

    getItem: (productId) => {
      return get().items.find((item) => item.product.id === productId);
    },
  };
});
