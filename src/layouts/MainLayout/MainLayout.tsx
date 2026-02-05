import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar/Navbar';
import { Sidebar } from './Sidebar/Sidebar';
import './MainLayout.css';

export const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="main-layout__container">
        <Sidebar />
        <main className="main-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
