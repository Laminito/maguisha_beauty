import axios, { type AxiosInstance } from 'axios';
import type {
  KredikaAuthResponse,
  CreditReservationRequest,
  CreditReservation,
  PaymentInstructions,
  Installment,
} from '../types/kredika';

const KREDIKA_API_URL = import.meta.env.VITE_KREDIKA_API_URL || 'http://localhost:7575/api/v1';
const CLIENT_ID = import.meta.env.VITE_KREDIKA_CLIENT_ID || '';
const CLIENT_SECRET = import.meta.env.VITE_KREDIKA_CLIENT_SECRET || '';

class KredikaService {
  private api: AxiosInstance;
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: KREDIKA_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async ensureAuthenticated(): Promise<void> {
    const now = Date.now();
    
    // Check if token exists and is not expired
    if (this.token && this.tokenExpiry && now < this.tokenExpiry) {
      return;
    }

    await this.authenticate();
  }

  async authenticate(): Promise<string> {
    try {
      const response = await this.api.post<KredikaAuthResponse>('/auth/token', {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      });

      this.token = response.data.accessToken;
      // Set expiry to 1 hour from now (safe margin before actual expiry)
      this.tokenExpiry = Date.now() + (response.data.expiresIn - 300) * 1000;
      
      return this.token;
    } catch (error) {
      console.error('Kredika authentication failed:', error);
      throw new Error('Failed to authenticate with Kredika');
    }
  }

  async createCreditReservation(request: CreditReservationRequest): Promise<CreditReservation> {
    await this.ensureAuthenticated();

    try {
      const response = await this.api.post<CreditReservation>(
        '/credit-reservations',
        request,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to create credit reservation:', error);
      throw new Error('Failed to create credit reservation');
    }
  }

  async getCreditReservations(): Promise<CreditReservation[]> {
    await this.ensureAuthenticated();

    try {
      const response = await this.api.get<CreditReservation[]>(
        '/credit-reservations',
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch credit reservations:', error);
      throw new Error('Failed to fetch credit reservations');
    }
  }

  async getCreditReservation(reservationId: string): Promise<CreditReservation> {
    await this.ensureAuthenticated();

    try {
      const response = await this.api.get<CreditReservation>(
        `/credit-reservations/${reservationId}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch credit reservation:', error);
      throw new Error('Failed to fetch credit reservation');
    }
  }

  async generatePaymentInstructions(reservationId: string): Promise<PaymentInstructions> {
    await this.ensureAuthenticated();

    try {
      const response = await this.api.post<PaymentInstructions>(
        '/payment-instructions',
        { reservationId },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to generate payment instructions:', error);
      throw new Error('Failed to generate payment instructions');
    }
  }

  async getInstallmentSchedule(reservationId: string): Promise<Installment[]> {
    await this.ensureAuthenticated();

    try {
      const response = await this.api.get<Installment[]>(
        `/installments?reservationId=${reservationId}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch installment schedule:', error);
      throw new Error('Failed to fetch installment schedule');
    }
  }

  calculateMonthlyPayment(amount: number, months: number, interestRate: number = 0.15): number {
    const monthlyRate = interestRate / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(monthlyPayment);
  }

  calculateTotalRepayment(monthlyPayment: number, months: number): number {
    return monthlyPayment * months;
  }
}

export default new KredikaService();
