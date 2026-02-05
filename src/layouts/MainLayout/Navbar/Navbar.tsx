import React from 'react';
import { useAuth } from '@/features/auth';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <span className="navbar__logo">🔍</span>
          <h1 className="navbar__title">Reconciliation Explorer</h1>
        </div>

        <div className="navbar__actions">
          <div className="navbar__user">
            <div className="navbar__avatar">{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
            <div className="navbar__user-info">
              <span className="navbar__user-name">{user?.name || 'Usuario'}</span>
              <span className="navbar__user-email">{user?.email || ''}</span>
            </div>
          </div>
          <button className="navbar__logout-btn" onClick={handleLogout} title="Cerrar sesión">
            🚪 Salir
          </button>
        </div>
      </div>
    </nav>
  );
};
