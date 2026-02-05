import React from 'react';
import { useAuth } from '@/features/auth';
import { useDashboardData } from '../../hooks/useDashboardData';
import { StatsCard } from '../../components/StatsCard/StatsCard';
import { RecentActivity } from '../../components/RecentActivity/RecentActivity';
import './DashboardPage.css';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { stats, recentActivity, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">⚠️</div>
        <h2>Error al cargar el dashboard</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Bienvenido, {user?.name || 'Usuario'}</h1>
          <p className="dashboard__subtitle">Aquí está el resumen de tu actividad de reconciliación</p>
        </div>
        <button className="dashboard__refresh-btn" onClick={() => window.location.reload()}>
          🔄 Actualizar
        </button>
      </header>

      <section className="dashboard__stats">
        <StatsCard
          title="Total Reconciliaciones"
          value={stats?.totalReconciliations ?? 0}
          icon="📊"
        />
        <StatsCard
          title="Pendientes"
          value={stats?.pendingItems ?? 0}
          icon="⏳"
        />
        <StatsCard
          title="Completadas Hoy"
          value={stats?.completedToday ?? 0}
          icon="✅"
        />
        <StatsCard
          title="Tasa de Éxito"
          value={`${stats?.successRate ?? 0}%`}
          icon="📈"
        />
      </section>

      <section className="dashboard__activity">
        <h2 className="dashboard__section-title">Actividad Reciente</h2>
        <RecentActivity items={recentActivity} />
      </section>
    </div>
  );
};
