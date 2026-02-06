import { useMemo } from 'react';
import type { Transaction } from '@/features/transactions';
import { getReconciliationStats } from '@/features/reconciliation';
import { StatsCard } from './StatsCard';

interface StatsSummaryProps {
  transactions: Transaction[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function StatsSummary({ transactions }: StatsSummaryProps) {
  const stats = useMemo(
    () => getReconciliationStats(transactions),
    [transactions]
  );

  return (
    <div className="grid grid-cols-2 gap-4 px-6 py-4 md:grid-cols-4">
      <StatsCard
        title="Reconciled"
        value={stats.reconciled.toLocaleString()}
        description={`${stats.reconciledPercentage.toFixed(1)}% of total`}
        variant="success"
      />
      <StatsCard
        title="Pending"
        value={stats.pending.toLocaleString()}
        description="Awaiting review"
        variant="warning"
      />
      <StatsCard
        title="Inconsistent"
        value={stats.inconsistent.toLocaleString()}
        description="Requires attention"
        variant="danger"
      />
      <StatsCard
        title="Total Volume"
        value={formatCurrency(stats.totalAmount)}
        description={`${formatCurrency(stats.reconciledAmount)} reconciled`}
      />
    </div>
  );
}
