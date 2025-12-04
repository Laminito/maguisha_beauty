import type { Product } from './product';

export interface Order {
  id: string;
  customerId: string;
  products: OrderItem[];
  totalAmount: number;
  paymentMethod: 'CASH' | 'CREDIT';
  status: OrderStatus;
  deliveryAddress: Address;
  createdAt: Date;
  updatedAt: Date;
  creditReservationId?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Address {
  street: string;
  city: string;
  postalCode?: string;
  country: string;
  phone: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: Address[];
  createdAt: Date;
}
