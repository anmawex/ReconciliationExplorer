import { cn } from '@/shared/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: 'border-border',
  success: 'border-l-4 border-l-status-reconciled',
  warning: 'border-l-4 border-l-status-pending',
  danger: 'border-l-4 border-l-status-inconsistent',
};

export function StatsCard({ title, value, description, variant = 'default' }: StatsCardProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-4', variantStyles[variant])}>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-1 text-xl font-semibold text-foreground sm:text-2xl truncate" title={String(value)}>
        {value}
      </p>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
