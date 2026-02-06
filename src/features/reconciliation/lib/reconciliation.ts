import type { Transaction } from '@/features/transactions';

/**
 * Simple reconciliation matching logic
 * Transactions are considered matched if they have the same amount
 * and similar references (same prefix pattern)
 */
export function findPotentialMatches(
  transaction: Transaction,
  transactions: Transaction[]
): Transaction[] {
  const referencePrefix = transaction.reference.split('-')[0];
  
  return transactions.filter((t) => {
    if (t.id === transaction.id) return false;
    if (t.source === transaction.source) return false; // Must be from different sources
    
    // Same amount
    const sameAmount = Math.abs(t.amount - transaction.amount) < 0.01;
    
    // Similar reference (same prefix)
    const tPrefix = t.reference.split('-')[0];
    const similarRef = referencePrefix === tPrefix;
    
    return sameAmount && similarRef;
  });
}

/**
 * Calculate reconciliation statistics
 */
export function getReconciliationStats(transactions: Transaction[]) {
  const total = transactions.length;
  const reconciled = transactions.filter((t) => t.status === 'reconciled').length;
  const pending = transactions.filter((t) => t.status === 'pending').length;
  const inconsistent = transactions.filter((t) => t.status === 'inconsistent').length;
  
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const reconciledAmount = transactions
    .filter((t) => t.status === 'reconciled')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    total,
    reconciled,
    pending,
    inconsistent,
    reconciledPercentage: total > 0 ? (reconciled / total) * 100 : 0,
    totalAmount,
    reconciledAmount,
  };
}
