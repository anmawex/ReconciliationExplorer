import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { LoginPage, useAuth } from '../features/auth';
import { DashboardPage } from '../features/dashboard';
import { LandingPage } from '../features/landing';


// 404 Page
const NotFoundPage: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="text-muted-foreground mb-6">Página no encontrada</p>
    <Link to="/" className="text-primary hover:underline">Volver al inicio</Link>
  </div>
);

// Simple Legal Page Component
const LegalPage: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => (
  <div className="min-h-screen bg-background">
    <header className="border-b border-border py-4">
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="Kallibra Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-foreground">Kallibra</span>
        </Link>
      </div>
    </header>
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">{title}</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground space-y-4">
        {content}
      </div>
    </main>
  </div>
);

const PrivacyPage: React.FC = () => (
  <LegalPage 
    title="Privacy Policy"
    content={
      <>
        <p>Last updated: February 2026</p>
        <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
        <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
        <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">3. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
        <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">4. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@kallibra.app</p>
      </>
    }
  />
);

const TermsPage: React.FC = () => (
  <LegalPage 
    title="Terms of Service"
    content={
      <>
        <p>Last updated: February 2026</p>
        <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">1. Acceptance of Terms</h2>
        <p>By accessing and using Kallibra, you accept and agree to be bound by the terms and provisions of this agreement.</p>
        <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">2. Use License</h2>
        <p>Permission is granted to temporarily access the materials on Kallibra for personal, non-commercial transitory viewing only.</p>
        <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">3. Disclaimer</h2>
        <p>The materials on Kallibra are provided on an 'as is' basis. Kallibra makes no warranties, expressed or implied.</p>
        <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">4. Limitations</h2>
        <p>In no event shall Kallibra or its suppliers be liable for any damages arising out of the use or inability to use the materials.</p>
      </>
    }
  />
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

// Login Route Component (redirects to dashboard if authenticated)
const LoginRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
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
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        
        <Route
          path="/login"
          element={
            <LoginRoute>
              <LoginPage />
            </LoginRoute>
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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
