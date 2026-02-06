import React from 'react';
import { LoginForm } from '../../components';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-page-background">
        <div className="login-page-gradient login-page-gradient-1"></div>
        <div className="login-page-gradient login-page-gradient-2"></div>
        <div className="login-page-gradient login-page-gradient-3"></div>
      </div>

      <div className="login-page-content">
        <div className="login-page-card">
          <div className="login-page-logo">
            <div className="logo-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2 className="logo-text">Kallibra</h2>
          </div>

          <LoginForm />
        </div>

        <footer className="login-page-footer">
          <p>&copy; 2026 Kallibra. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};
