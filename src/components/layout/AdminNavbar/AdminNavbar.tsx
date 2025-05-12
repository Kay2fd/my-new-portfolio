import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaHome } from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeProvider';
import { supabase } from '../../../lib/supabase';

const AdminLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Admin Header */}
      <header className={`py-4 px-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            <button
              onClick={handleLogout}
              className={`flex items-center space-x-2 py-2 px-4 rounded ${
                isDarkMode
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="container mx-auto py-6 px-4 flex">
        {/* Sidebar */}
        <aside className={`w-64 mr-8 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/"
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <FaHome />
                  <span>Back to Site</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/profile"
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <FaUser />
                  <span>Profile</span>
                </Link>
              </li>
              {/* Add more admin navigation items here */}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
