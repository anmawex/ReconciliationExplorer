import type { DashboardStats, RecentActivityItem } from '../types/dashboard.types';

// const API_URL = import.meta.env.VITE_API_URL;

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    // TODO: Reemplazar con llamada real a la API
    // const response = await axios.get(`${API_URL}/dashboard/stats`);
    // return response.data;

    // Mock data para desarrollo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalReconciliations: 1247,
          pendingItems: 23,
          completedToday: 45,
          successRate: 94.5,
        });
      }, 800);
    });
  },

  async getRecentActivity(): Promise<RecentActivityItem[]> {
    // TODO: Reemplazar con llamada real a la API
    // const response = await axios.get(`${API_URL}/dashboard/activity`);
    // return response.data;

    // Mock data para desarrollo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            type: 'reconciliation',
            description: 'Reconciliación de facturas completada',
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
            status: 'success',
          },
          {
            id: '2',
            type: 'upload',
            description: 'Archivo CSV cargado exitosamente',
            timestamp: new Date(Date.now() - 1000 * 60 * 15),
            status: 'success',
          },
          {
            id: '3',
            type: 'reconciliation',
            description: 'Reconciliación en proceso',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            status: 'pending',
          },
          {
            id: '4',
            type: 'export',
            description: 'Error al exportar reporte',
            timestamp: new Date(Date.now() - 1000 * 60 * 45),
            status: 'error',
          },
          {
            id: '5',
            type: 'reconciliation',
            description: 'Reconciliación de pagos completada',
            timestamp: new Date(Date.now() - 1000 * 60 * 60),
            status: 'success',
          },
        ]);
      }, 800);
    });
  },
};
