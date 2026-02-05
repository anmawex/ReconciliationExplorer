export interface DashboardStats {
  totalReconciliations: number;
  pendingItems: number;
  completedToday: number;
  successRate: number;
}

export interface RecentActivityItem {
  id: string;
  type: 'reconciliation' | 'upload' | 'export';
  description: string;
  timestamp: Date;
  status: 'success' | 'pending' | 'error';
}

export interface DashboardState {
  stats: DashboardStats | null;
  recentActivity: RecentActivityItem[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}
