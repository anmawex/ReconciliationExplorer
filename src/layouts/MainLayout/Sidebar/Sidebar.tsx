import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { id: 'reconciliations', label: 'Reconciliaciones', icon: '🔄', path: '/reconciliations' },
  { id: 'uploads', label: 'Cargas', icon: '📤', path: '/uploads' },
  { id: 'reports', label: 'Reportes', icon: '📈', path: '/reports' },
  { id: 'settings', label: 'Configuración', icon: '⚙️', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
      <button
        className="sidebar__toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expandir' : 'Contraer'}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <nav className="sidebar__nav">
        <ul className="sidebar__menu">
          {menuItems.map((item) => (
            <li key={item.id} className="sidebar__menu-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                }
                title={item.label}
              >
                <span className="sidebar__icon">{item.icon}</span>
                {!isCollapsed && <span className="sidebar__label">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {!isCollapsed && (
        <div className="sidebar__footer">
          <p className="sidebar__version">v1.0.0</p>
        </div>
      )}
    </aside>
  );
};
