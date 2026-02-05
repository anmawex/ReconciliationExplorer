import { RefreshCcw } from 'lucide-react';
import { Button } from '@/shared/components/Button/button';
import { ThemeToggle } from '@/shared/theme';

interface HeaderProps {
  transactionCount: number;
  onRefresh?: () => void;
}

export function Header({ transactionCount, onRefresh }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Reconciliation Explorer
          </h1>
          <p className="text-sm text-muted-foreground">
            Analyze and reconcile {transactionCount.toLocaleString()} transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
