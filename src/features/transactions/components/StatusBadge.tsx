import { useTranslation } from 'react-i18next';
import type { TransactionStatus } from '../types';
import { cn } from '@/shared/lib/utils';

interface StatusBadgeProps {
  status: TransactionStatus;
}

const statusClassNames: Record<TransactionStatus, string> = {
  reconciled: 'status-reconciled',
  pending: 'status-pending',
  inconsistent: 'status-inconsistent',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation();
  
  return (
    <span className={cn('status-badge', statusClassNames[status])}>
      {t(`status.${status}`)}
    </span>
  );
}
