import React from 'react';
import type { RecentActivityItem } from '../../types/dashboard.types';
import './RecentActivity.css';

interface RecentActivityProps {
  items: RecentActivityItem[];
}

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'Hace un momento';
  if (diffInMinutes < 60) return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
};

const getActivityIcon = (type: RecentActivityItem['type']): string => {
  switch (type) {
    case 'reconciliation':
      return '🔄';
    case 'upload':
      return '📤';
    case 'export':
      return '📥';
    default:
      return '📋';
  }
};

const getStatusClass = (status: RecentActivityItem['status']): string => {
  switch (status) {
    case 'success':
      return 'success';
    case 'pending':
      return 'pending';
    case 'error':
      return 'error';
    default:
      return '';
  }
};

export const RecentActivity: React.FC<RecentActivityProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="recent-activity recent-activity--empty">
        <p>No hay actividad reciente</p>
      </div>
    );
  }

  return (
    <div className="recent-activity">
      <ul className="recent-activity__list">
        {items.map((item) => (
          <li key={item.id} className={`recent-activity__item ${getStatusClass(item.status)}`}>
            <div className="recent-activity__icon">{getActivityIcon(item.type)}</div>
            <div className="recent-activity__content">
              <p className="recent-activity__description">{item.description}</p>
              <span className="recent-activity__time">{formatTimeAgo(item.timestamp)}</span>
            </div>
            <div className={`recent-activity__status recent-activity__status--${item.status}`}>
              {item.status === 'success' && '✓'}
              {item.status === 'pending' && '⏳'}
              {item.status === 'error' && '✕'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
