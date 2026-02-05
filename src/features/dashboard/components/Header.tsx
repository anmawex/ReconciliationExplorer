import { useState } from 'react';
import { RefreshCcw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/Button/button';
import { Modal } from '@/shared/components';
import { ThemeToggle } from '@/shared/theme';
import { useAuth } from '@/features/auth';

interface HeaderProps {
  transactionCount: number;
  onRefresh?: () => void;
}

export function Header({ transactionCount, onRefresh }: HeaderProps) {
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
            <Button variant="outline" size="sm" onClick={() => setShowLogoutModal(true)}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Confirmar cierre de sesión"
        description="¿Estás seguro de que deseas cerrar sesión? Tendrás que volver a iniciar sesión para acceder al dashboard."
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
        variant="danger"
      />
    </>
  );
}
