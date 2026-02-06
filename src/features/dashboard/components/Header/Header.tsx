import { useState } from 'react';
import { RefreshCcw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button/button';
import { Modal, LanguageSwitcher } from '@/shared/components';
import { ThemeToggle } from '@/shared/theme';
import { useAuth } from '@/features/auth';

interface HeaderProps {
  transactionCount: number;
  onRefresh?: () => void;
}

export function Header({ transactionCount, onRefresh }: HeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {t('dashboard.header.title')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t('dashboard.header.subtitle', { count: transactionCount })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            {onRefresh && (
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                {t('dashboard.header.refreshData')}
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowLogoutModal(true)}>
              <LogOut className="mr-2 h-4 w-4" />
              {t('auth.logout.button')}
            </Button>
          </div>
        </div>
      </header>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title={t('auth.logout.confirmTitle')}
        description={t('auth.logout.confirmDescription')}
        confirmText={t('auth.logout.confirmButton')}
        cancelText={t('common.cancel')}
        variant="danger"
      />
    </>
  );
}
