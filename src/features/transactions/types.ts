export type TransactionSource = 'Bank' | 'Payment Provider' | 'ERP';
export type TransactionStatus = 'reconciled' | 'pending' | 'inconsistent';

export interface Transaction {
  id: string;
  date: string;
  reference: string;
  amount: number;
  currency: string;
  source: TransactionSource;
  status: TransactionStatus;
}

export interface TransactionFilters {
  source: TransactionSource | 'all';
  status: TransactionStatus | 'all';
  minAmount: number | null;
  maxAmount: number | null;
}
