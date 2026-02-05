import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, useAuth } from '../features/auth';
import { DashboardPage } from '../features/dashboard';

// 404 Page
const NotFoundPage: React.FC = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>404 - Página no encontrada</h1>
    <a href="/">Volver al inicio</a>
  </div>
);

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        {/* Add more protected routes here as needed */}
        {/* <Route path="/reconciliations" element={<ProtectedRoute><ReconciliationsPage /></ProtectedRoute>} /> */}
        {/* <Route path="/uploads" element={<ProtectedRoute><UploadsPage /></ProtectedRoute>} /> */}
        {/* <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} /> */}
        {/* <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} /> */}

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
