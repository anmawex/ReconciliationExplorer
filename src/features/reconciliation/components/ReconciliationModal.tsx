import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/button';
import { findPotentialMatches } from '../lib/reconciliation';
import type { Transaction } from '@/features/transactions';

interface ReconciliationModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  candidates: Transaction[];
  onReconcile: (transactionIds: string[]) => void;
}

export function ReconciliationModal({
  isOpen,
  onClose,
  transaction,
  candidates,
  onReconcile,
}: ReconciliationModalProps) {
  const { t } = useTranslation();
  
  const matches = useMemo(() => {
    if (!transaction) return [];
    return findPotentialMatches(transaction, candidates);
  }, [transaction, candidates]);

  if (!transaction) return null;

  const handleReconcile = (matchId: string) => {
    onReconcile([transaction.id, matchId]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t('reconciliation.modal.title')}</DialogTitle>
          <DialogDescription>
            {t('reconciliation.modal.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">
            {t('reconciliation.modal.selectedTransaction')}
          </h4>
          <div className="rounded-md border bg-muted/50 p-3">
            <div className="flex justify-between font-medium">
              <span>{transaction.reference}</span>
              <span>{transaction.amount.toLocaleString()} {transaction.currency}</span>
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>{transaction.source}</span>
              <span>{new Date(transaction.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="py-2">
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">
            {t('reconciliation.modal.suggestedMatches')} {t('reconciliation.modal.matchCount', { count: matches.length })}
          </h4>
          {matches.length > 0 ? (
            <div className="space-y-2">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50"
                >
                  <div className="flex-1">
                    <div className="flex justify-between font-medium">
                      <span>{match.reference}</span>
                      <span>{match.amount.toLocaleString()} {match.currency}</span>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>{match.source}</span>
                      <span>{new Date(match.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="ml-4"
                    onClick={() => handleReconcile(match.id)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    {t('reconciliation.modal.reconcileButton')}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <AlertCircle className="mb-2 h-8 w-8 opacity-50" />
              <p>{t('reconciliation.modal.noMatches')}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('reconciliation.modal.cancel')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
