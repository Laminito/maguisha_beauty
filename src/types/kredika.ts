export interface KredikaConfig {
  apiBaseUrl: string;
  clientId: string;
  clientSecret: string;
}

export interface KredikaAuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface CreditReservationRequest {
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  creditAmount: number;
  durationMonths: number;
  purchaseDescription: string;
}

export interface CreditReservation {
  reservationId: string;
  status: ReservationStatus;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  creditDetails: {
    amount: number;
    durationMonths: number;
    monthlyPayment: number;
    totalRepayment: number;
    interestRate: number;
  };
  installments: Installment[];
  createdAt: Date;
  expiresAt: Date;
}

export type ReservationStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'active'
  | 'completed'
  | 'cancelled';

export interface Installment {
  installmentNumber: number;
  dueDate: Date;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  paidAt?: Date;
}

export interface PaymentInstructions {
  reservationId: string;
  amount: number;
  paymentMethods: PaymentMethod[];
  reference: string;
  expiresAt: Date;
}

export interface PaymentMethod {
  type: 'mobile_money' | 'bank_transfer' | 'card';
  provider: string;
  accountNumber?: string;
  accountName?: string;
  instructions: string;
}

export type CreditPlan = 3 | 6 | 12;
