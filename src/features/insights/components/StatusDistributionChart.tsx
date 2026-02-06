import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Transaction, TransactionStatus } from '@/features/transactions';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/card';

interface StatusDistributionChartProps {
  transactions: Transaction[];
}

// Helper to get status color from CSS variables
const getStatusColor = (status: TransactionStatus): string => {
  const colors: Record<TransactionStatus, string> = {
    reconciled: 'hsl(var(--status-reconciled))',
    pending: 'hsl(var(--status-pending))',
    inconsistent: 'hsl(var(--status-inconsistent))',
  };
  return colors[status];
};

export function StatusDistributionChart({ transactions }: StatusDistributionChartProps) {
  const { t } = useTranslation();

  // Optimize: Calculate counts only when transactions change
  const counts = useMemo(() => {
    const statusCounts: Record<TransactionStatus, number> = {
      reconciled: 0,
      pending: 0,
      inconsistent: 0,
    };

    for (const txn of transactions) {
      statusCounts[txn.status]++;
    }
    return statusCounts;
  }, [transactions]);

  // Optimize: Apply labels only when language or counts change
  const chartData = useMemo(() => {
    const labels: Record<TransactionStatus, string> = {
      reconciled: t('status.reconciled'),
      pending: t('status.pending'),
      inconsistent: t('status.inconsistent'),
    };

    return (Object.keys(counts) as TransactionStatus[]).map((status) => ({
      name: labels[status],
      value: counts[status],
      status,
    }));
  }, [counts, t]);

  const total = useMemo(() => transactions.length, [transactions]);

  if (total === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">{t('dashboard.chart.statusDistribution')}</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[200px] items-center justify-center text-muted-foreground">
          {t('dashboard.chart.noTransactions')}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{t('dashboard.chart.statusDistribution')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="54%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={getStatusColor(entry.status)}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | undefined, name: string | undefined) => {
                  if (value === undefined) return ['0 (0.0%)', name ?? 'Unknown'];
                  return [
                    `${value.toLocaleString()} (${((value / total) * 100).toFixed(1)}%)`,
                    name ?? 'Unknown',
                  ];
                }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
                itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
              />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingLeft: '20px' }}
                formatter={(value: string) => (
                  <span className="text-xs text-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
