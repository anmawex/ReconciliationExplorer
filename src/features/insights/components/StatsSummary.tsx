import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Transaction } from '@/features/transactions';
import { getReconciliationStats } from '@/features/reconciliation';
import { formatCurrency } from '@/shared/lib/formatters';
import { StatsCard } from './StatsCard';

interface StatsSummaryProps {
  transactions: Transaction[];
}



export function StatsSummary({ transactions }: StatsSummaryProps) {
  const { t, i18n } = useTranslation();
  
  const stats = useMemo(
    () => getReconciliationStats(transactions),
    [transactions]
  );

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatsCard
        title={t('dashboard.stats.reconciled')}
        value={stats.reconciled.toLocaleString()}
        description={t('dashboard.stats.ofTotal', { percentage: stats.reconciledPercentage.toFixed(1) })}
        variant="success"
      />
      <StatsCard
        title={t('dashboard.stats.pending')}
        value={stats.pending.toLocaleString()}
        description={t('dashboard.stats.awaitingReview')}
        variant="warning"
      />
      <StatsCard
        title={t('dashboard.stats.inconsistent')}
        value={stats.inconsistent.toLocaleString()}
        description={t('dashboard.stats.requiresAttention')}
        variant="danger"
      />
      <StatsCard
        title={t('dashboard.stats.totalVolume')}
        value={formatCurrency(stats.totalAmount, 'USD', i18n.language)}
        description={t('dashboard.stats.reconciledAmount', { amount: formatCurrency(stats.reconciledAmount, 'USD', i18n.language) })}
      />
    </div>
  );
}
