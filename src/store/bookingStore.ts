import { create } from 'zustand';
import type { Booking } from '../types/booking';

interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  deleteBooking: (id: string) => void;
  getBookings: () => Booking[];
}

const STORAGE_KEY = 'maguisha-bookings';

// Charger les réservations depuis localStorage
const loadBookings = (): Booking[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Sauvegarder dans localStorage
const saveBookings = (bookings: Booking[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch (error) {
    console.error('Error saving bookings:', error);
  }
};

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: loadBookings(),

  addBooking: (bookingData) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const updatedBookings = [...state.bookings, newBooking];
      saveBookings(updatedBookings);
      return { bookings: updatedBookings };
    });
  },

  updateBookingStatus: (id, status) => {
    set((state) => {
      const updatedBookings = state.bookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      );
      saveBookings(updatedBookings);
      return { bookings: updatedBookings };
    });
  },

  deleteBooking: (id) => {
    set((state) => {
      const updatedBookings = state.bookings.filter((booking) => booking.id !== id);
      saveBookings(updatedBookings);
      return { bookings: updatedBookings };
    });
  },

  getBookings: () => get().bookings,
}));
