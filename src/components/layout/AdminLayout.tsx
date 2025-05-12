import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar/AdminNavbar';
import { useTheme } from '../../context/ThemeProvider';

const AdminLayout: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <AdminNavbar />
      <div className="pt-20 pb-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;