import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'role'> & { password: string }) => Promise<void>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email) => {
        // Mock login - replace with actual API call
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const mockUser: User = {
            id: '1',
            email,
            firstName: 'John',
            lastName: 'Doe',
            role: email.includes('admin') ? 'admin' : 'customer',
          };

          const mockToken = 'mock-jwt-token-' + Date.now();

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
          });

          localStorage.setItem('authToken', mockToken);
        } catch (error) {
          console.error('Login failed:', error);
          throw new Error('Invalid credentials');
        }
      },

      register: async (userData) => {
        // Mock registration - replace with actual API call
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const mockUser: User = {
            id: Date.now().toString(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: 'customer',
          };

          const mockToken = 'mock-jwt-token-' + Date.now();

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
          });

          localStorage.setItem('authToken', mockToken);
        } catch (error) {
          console.error('Registration failed:', error);
          throw new Error('Registration failed');
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('authToken');
      },

    setUser: (user, token) => {
      set({
        user,
        token,
        isAuthenticated: true,
      });
      localStorage.setItem('authToken', token);
    },
  }));
