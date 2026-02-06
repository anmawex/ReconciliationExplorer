import type { Transaction, TransactionSource, TransactionStatus } from '../types';

const sources: TransactionSource[] = ['Bank', 'Payment Provider', 'ERP'];
const currencies = ['USD', 'EUR', 'GBP', 'CHF', 'JPY'];

const referencePatterns = [
  'INV-',
  'TXN-',
  'PAY-',
  'REF-',
  'ORD-',
  'WIR-',
  'ACH-',
];

function generateReference(): string {
  const pattern = referencePatterns[Math.floor(Math.random() * referencePatterns.length)];
  const num = Math.floor(Math.random() * 900000) + 100000;
  return `${pattern}${num}`;
}

function generateAmount(): number {
  // Generate amounts with realistic distribution
  const base = Math.random();
  if (base < 0.6) {
    // 60% small transactions
    return Math.round((Math.random() * 1000 + 10) * 100) / 100;
  } else if (base < 0.9) {
    // 30% medium transactions
    return Math.round((Math.random() * 10000 + 1000) * 100) / 100;
  } else {
    // 10% large transactions
    return Math.round((Math.random() * 100000 + 10000) * 100) / 100;
  }
}

function generateDate(): string {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 365);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

function generateStatus(): TransactionStatus {
  const rand = Math.random();
  if (rand < 0.65) return 'reconciled';
  if (rand < 0.9) return 'pending';
  return 'inconsistent';
}

export function generateMockTransactions(count: number = 4000): Transaction[] {
  const transactions: Transaction[] = [];
  
  // Agregar casos de prueba garantizados para conciliación
  transactions.push({
    id: `txn_test_01`,
    date: new Date().toISOString(),
    reference: 'TEST-MATCH-001-A',
    amount: 1234.56,
    currency: 'USD',
    source: 'Bank',
    status: 'pending',
  });

  transactions.push({
    id: `txn_test_02`,
    date: new Date().toISOString(),
    reference: 'TEST-MATCH-001-B',
    amount: 1234.56,
    currency: 'USD',
    source: 'ERP',
    status: 'pending',
  });

  for (let i = 0; i < count; i++) {
    transactions.push({
      id: `txn_${i.toString().padStart(6, '0')}`,
      date: generateDate(),
      reference: generateReference(),
      amount: generateAmount(),
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      status: generateStatus(),
    });
  }
  
  // Sort by date descending
  transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return transactions;
}

// Pre-generated mock data for consistent experience
export const mockTransactions = generateMockTransactions(4000);
