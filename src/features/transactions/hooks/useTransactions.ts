import { useState, useMemo, useCallback } from 'react';
import type { Transaction, TransactionFilters, TransactionStatus } from '../types';
import { mockTransactions } from '../data/mockTransactions';

const initialFilters: TransactionFilters = {
  source: 'all',
  status: 'all',
  minAmount: null,
  maxAmount: null,
};

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filters, setFilters] = useState<TransactionFilters>(initialFilters);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      // Filter by source
      if (filters.source !== 'all' && t.source !== filters.source) {
        return false;
      }

      // Filter by status
      if (filters.status !== 'all' && t.status !== filters.status) {
        return false;
      }

      // Filter by min amount
      if (filters.minAmount !== null && t.amount < filters.minAmount) {
        return false;
      }

      // Filter by max amount
      if (filters.maxAmount !== null && t.amount > filters.maxAmount) {
        return false;
      }

      return true;
    });
  }, [transactions, filters]);

  const updateTransactionStatus = useCallback(
    (transactionId: string, status: TransactionStatus) => {
      setTransactions((prev) =>
        prev.map((t) => (t.id === transactionId ? { ...t, status } : t))
      );
    },
    []
  );

  const bulkUpdateStatus = useCallback(
    (transactionIds: string[], status: TransactionStatus) => {
      setTransactions((prev) =>
        prev.map((t) =>
          transactionIds.includes(t.id) ? { ...t, status } : t
        )
      );
    },
    []
  );

  const refreshData = useCallback(() => {
    // In a real app, this would fetch from an API
    // For demo, we just reset to the original mock data
    setTransactions([...mockTransactions]);
    setFilters(initialFilters);
  }, []);

  return {
    transactions,
    filteredTransactions,
    filters,
    setFilters,
    updateTransactionStatus,
    bulkUpdateStatus,
    refreshData,
    totalCount: transactions.length,
    filteredCount: filteredTransactions.length,
  };
}
