import { create } from 'zustand';
import type { DashboardState } from '../types/dashboard.types';
import { dashboardService } from '../services/dashboard.service';

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  recentActivity: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });

    try {
      const [statsData, activityData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentActivity(),
      ]);

      set({
        stats: statsData,
        recentActivity: activityData,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Error al cargar los datos del dashboard',
        isLoading: false,
      });
    }
  },
}));
