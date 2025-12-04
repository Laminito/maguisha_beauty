export interface Booking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}
