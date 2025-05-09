import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import ParticlesBackground from './ParticlesBackground/ParticlesBackground';
import { useTheme } from '../../context/ThemeProvider';

const Layout = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <div
        className={`fixed top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] transition-opacity duration-500 ease-in-out ${isDarkMode ? 'opacity-100' : 'opacity-0'
          }`}
      ></div>

      <div
        className={`fixed top-0 z-[-2] h-full w-full bg-white transition-opacity duration-500 ease-in-out ${isDarkMode ? 'opacity-0' : 'opacity-100'
          }`}
      >
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px] transition-all duration-500 ease-in-out">
        </div>
      </div>

      <div className="fixed inset-0 z-[-1]">
        <ParticlesBackground />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen w-full transition-colors duration-500">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
