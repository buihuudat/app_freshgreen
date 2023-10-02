export enum StatusPayment {
  pending,
  falure,
  success,
}

export interface PaymentType {
  user: string;
  status: 'pending' | 'falure' | 'success';
  method: string;
  amount: number;
  transactionId: string;
}

export interface PayData {
  userId: string;
  totalPrice: number;
  amount: number;
  address: string;
  phone: string;
  email: string;
  nameOfUser: string;
  discount: {
    voucher: string;
    discount: number;
  };
}
