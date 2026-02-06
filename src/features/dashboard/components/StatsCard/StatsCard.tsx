import React from 'react';
import './StatsCard.css';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="stats-card">
      <div className="stats-card__icon">{icon}</div>
      <div className="stats-card__content">
        <h3 className="stats-card__title">{title}</h3>
        <p className="stats-card__value">{value}</p>
        {trend && (
          <span className={`stats-card__trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
};
