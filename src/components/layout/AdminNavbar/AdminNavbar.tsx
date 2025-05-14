import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaHome, FaBars, FaTimes, FaChevronLeft, FaChevronRight, FaCertificate, FaProjectDiagram } from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeProvider';
import { supabase } from '../../../lib/supabase';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchProfileData } from '../../../services/profilService';

interface AdminNavbarProps {
  onSidebarCollapse?: (collapsed: boolean) => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ onSidebarCollapse }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileData, setProfileData] = useState<{ name: string; role: string; avatar: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }

      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setSidebarCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false);
      }
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (onSidebarCollapse) {
      onSidebarCollapse(isSidebarCollapsed);
    }
  }, [isSidebarCollapsed, onSidebarCollapse]);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await fetchProfileData();
        if (data) {
          setProfileData(data);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 h-16 ${isDarkMode ? 'backdrop-blur-sm' : 'bg-[#e6f7ee]/90 backdrop-blur-sm'} shadow-md`}>
        <div className="container mx-auto h-full flex justify-between items-center px-6">
          <div className="flex items-center space-x-2">
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className={`flex items-center space-x-2 py-2 px-4 rounded transition-all duration-300 cursor-pointer ${isDarkMode
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
            >
              <FaSignOutAlt className="sm:block" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="md:hidden fixed bottom-6 left-6 z-50">
        <button
          onClick={toggleSidebar}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-colors ${isDarkMode
            ? 'bg-blue-900/90 text-white hover:bg-blue-700'
            : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          aria-label="Toggle sidebar"
        >
          <FaBars size={20} />
        </button>
      </div>

      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            className={`fixed z-40 transform transition-all duration-300 ease-in-out rounded-xl shadow-xl ${isDarkMode
              ? 'bg-blue-600/20 backdrop-blur-md border border-gray-700'
              : 'bg-white/10 backdrop-blur-md border border-blue-200'
              } ${isSidebarCollapsed
                ? 'w-20'
                : 'w-64'
              }`}
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              top: '5rem',
              left: '1.25rem',
              maxHeight: 'calc(100vh - 7rem)'
            }}
          >
            <div className={`h-16 flex items-center justify-between px-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {!isSidebarCollapsed && (
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-700'} truncate md:hidden`}>
                  Menu
                </h1>
              )}

              <button
                onClick={toggleSidebar}
                className={`md:hidden flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isDarkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-200 text-gray-600'
                  }`}
                aria-label="Close sidebar"
              >
                <FaTimes size={16} />
              </button>

              <button
                onClick={toggleSidebarCollapse}
                className={`hidden md:flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isDarkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-200 text-gray-600'
                  }`}
                aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isSidebarCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
              </button>
            </div>

            {!loading && profileData && !isSidebarCollapsed && (
              <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      src={profileData.avatar || '/images/default-avatar.png'}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                    />
                  </div>
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {profileData.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {profileData.role}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!loading && profileData && isSidebarCollapsed && (
              <div className={`py-4 flex justify-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex-shrink-0">
                  <img
                    src={profileData.avatar || '/images/default-avatar.png'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                </div>
              </div>
            )}

            <nav className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-2'} p-3 rounded-lg transition-all duration-300 cursor-pointer ${isDarkMode
                      ? 'hover:bg-blue-100/10 text-cyan-400 hover:text-white'
                      : 'hover:bg-blue-100 text-blue-700 hover:text-blue-600'
                      }`}
                    onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                  >
                    <FaHome />
                    {!isSidebarCollapsed && <span>Back to Site</span>}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/profile"
                    className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-2'} p-3 rounded-lg transition-all duration-300 cursor-pointer ${isDarkMode
                      ? 'hover:bg-blue-100/10 text-cyan-400 hover:text-white'
                      : 'hover:bg-blue-100 text-blue-700 hover:text-blue-600'
                      }`}
                    onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                  >
                    <FaUser />
                    {!isSidebarCollapsed && <span>Profile</span>}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/certificates"
                    className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-2'} p-3 rounded-lg transition-all duration-300 cursor-pointer ${isDarkMode
                      ? 'hover:bg-blue-100/10 text-cyan-400 hover:text-white'
                      : 'hover:bg-blue-100 text-blue-700 hover:text-blue-600'
                      }`}
                    onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                  >
                    <FaCertificate />
                    {!isSidebarCollapsed && <span>Certificates</span>}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/projects"
                    className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-2'} p-3 rounded-lg transition-all duration-300 cursor-pointer ${isDarkMode
                      ? 'hover:bg-blue-100/10 text-cyan-400 hover:text-white'
                      : 'hover:bg-blue-100 text-blue-700 hover:text-blue-600'
                      }`}
                    onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                  >
                    <FaProjectDiagram />
                    {!isSidebarCollapsed && <span>Projects</span>}
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminNavbar;
