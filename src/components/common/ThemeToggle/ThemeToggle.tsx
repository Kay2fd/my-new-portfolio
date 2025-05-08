import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      }`}
      aria-label="Toggle Theme"
    >
      {isDarkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
