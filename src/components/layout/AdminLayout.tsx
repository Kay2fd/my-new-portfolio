import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminNavbar from './AdminNavbar/AdminNavbar';
import { useTheme } from '../../context/ThemeProvider';
import ParticlesBackground from './ParticlesBackground/ParticlesBackground';
import ScrollToTop from '../common/ScrollToTop/ScrollToTop';

const AdminLayout: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Listen for sidebar collapse state changes
  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Dark mode gradient background */}
      <div
        className={`fixed top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] transition-opacity duration-500 ease-in-out ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>

      {/* Light mode gradient background */}
      <div
        className={`fixed top-0 z-[-2] h-full w-full bg-white transition-opacity duration-500 ease-in-out ${
          isDarkMode ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px] transition-all duration-500 ease-in-out">
        </div>
      </div>

      {/* Particles background */}
      <div className="fixed inset-0 z-[-1]">
        <ParticlesBackground />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen w-full transition-colors duration-500">
        <AdminNavbar onSidebarCollapse={handleSidebarCollapse} />
        
        {/* Main content with padding for sidebar */}
        <main className={`flex-grow transition-all duration-300 ${
          isSidebarCollapsed 
            ? 'pt-20 md:pt-24 md:pl-24' 
            : 'pt-20 md:pt-24 md:pl-72' 
        }`}>
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <Outlet />
          </div>
        </main>
        
        <ScrollToTop />
      </div>
    </div>
  );
};

export default AdminLayout;
