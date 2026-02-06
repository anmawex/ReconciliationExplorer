import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Transaction, TransactionStatus } from '@/features/transactions';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/card';

interface StatusDistributionChartProps {
  transactions: Transaction[];
}

const STATUS_COLORS: Record<TransactionStatus, string> = {
  reconciled: 'hsl(142, 76%, 36%)',
  pending: 'hsl(45, 93%, 47%)',
  inconsistent: 'hsl(0, 84%, 60%)',
};

const STATUS_LABELS: Record<TransactionStatus, string> = {
  reconciled: 'Reconciled',
  pending: 'Pending',
  inconsistent: 'Inconsistent',
};

export function StatusDistributionChart({ transactions }: StatusDistributionChartProps) {
  const chartData = useMemo(() => {
    const counts: Record<TransactionStatus, number> = {
      reconciled: 0,
      pending: 0,
      inconsistent: 0,
    };

    for (const t of transactions) {
      counts[t.status]++;
    }

    return (Object.keys(counts) as TransactionStatus[]).map((status) => ({
      name: STATUS_LABELS[status],
      value: counts[status],
      status,
    }));
  }, [transactions]);

  const total = useMemo(() => transactions.length, [transactions]);

  if (total === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[200px] items-center justify-center text-muted-foreground">
          No transactions to display
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={STATUS_COLORS[entry.status]}
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
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
                iconSize={8}
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
