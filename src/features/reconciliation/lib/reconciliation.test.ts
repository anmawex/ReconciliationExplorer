import { describe, it, expect } from 'vitest';
import { findPotentialMatches, getReconciliationStats } from './reconciliation';
import type { Transaction } from '@/features/transactions';

describe('reconciliation', () => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      date: '2023-01-01',
      reference: 'REF-001',
      amount: 100,
      currency: 'USD',
      source: 'Bank',
      status: 'pending',
    },
    {
      id: '2',
      date: '2023-01-01',
      reference: 'REF-001-A',
      amount: 100,
      currency: 'USD',
      source: 'ERP',
      status: 'pending',
    },
    {
      id: '3',
      date: '2023-01-02',
      reference: 'REF-002',
      amount: 200,
      currency: 'USD',
      source: 'Bank',
      status: 'reconciled',
    },
    {
      id: '4',
      date: '2023-01-02',
      reference: 'OTHER',
      amount: 300,
      currency: 'USD',
      source: 'ERP',
      status: 'inconsistent',
    },
  ];

  describe('findPotentialMatches', () => {
    it('should find matches with same amount and similar reference', () => {
      const transaction = mockTransactions[0];
      const matches = findPotentialMatches(transaction, mockTransactions);
      
      expect(matches).toHaveLength(1);
      expect(matches[0].id).toBe('2');
    });

    it('should not match with same source', () => {
      const transaction = { ...mockTransactions[0], source: 'ERP' as const };
      const matches = findPotentialMatches(transaction, mockTransactions);
      
      // Should not match with id: 2 because now both are ERP
      // Should not match with id: 1 because it's same id
      expect(matches).toHaveLength(0);
    });

    it('should not match different amounts', () => {
      const transaction = { ...mockTransactions[0], amount: 999 };
      const matches = findPotentialMatches(transaction, mockTransactions);
      
      expect(matches).toHaveLength(0);
    });
  });

  describe('getReconciliationStats', () => {
    it('should calculate correct stats', () => {
      const stats = getReconciliationStats(mockTransactions);
      
      expect(stats.total).toBe(4);
      expect(stats.reconciled).toBe(1);
      expect(stats.pending).toBe(2);
      expect(stats.inconsistent).toBe(1);
      expect(stats.totalAmount).toBe(700);
      expect(stats.reconciledAmount).toBe(200);
      expect(stats.reconciledPercentage).toBe(25);
    });

    it('should handle empty transactions', () => {
      const stats = getReconciliationStats([]);
      
      expect(stats.total).toBe(0);
      expect(stats.reconciledPercentage).toBe(0);
    });
  });
});
