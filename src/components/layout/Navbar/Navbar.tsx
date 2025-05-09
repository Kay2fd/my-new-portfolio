import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaHome, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 10);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (Math.abs(currentScrollY - lastScrollY) > 20) {
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        setVisible(false);
                    } else {
                        setVisible(true);
                    }
                    setLastScrollY(currentScrollY);
                }
            }, 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, [lastScrollY]);

    return (
        <motion.nav
            initial={{ y: 0, opacity: 1 }}
            animate={{
                y: visible ? 0 : -100,
                opacity: visible ? 1 : 0
            }}
            transition={{
                duration: 0.4,
                ease: "easeInOut"
            }}
            className={`fixed top-0 w-full z-50 ${isScrolled
                ? isDarkMode
                    ? 'backdrop-blur-sm'
                    : 'bg-[#e6f7ee]/60 backdrop-blur-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <FaCode className={`text-2xl ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'} group-hover:scale-110 transition-transform`} />
                        <span className={`text-xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Web3folio
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" icon={<FaHome />} label="Home" />
                        <NavLink to="/about" icon={<FaUser />} label="About" />
                        <NavLink to="/projects" icon={<FaProjectDiagram />} label="Projects" />
                        <NavLink to="/contact" icon={<FaEnvelope />} label="Contact" />
                        <ThemeToggle />
                    </div>

                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                            className={`p-2 rounded-md focus:outline-none ${isDarkMode ? 'text-cyan-400 hover:bg-[#1a1a2f]' : 'text-blue-700 hover:bg-blue-100'
                                } transition`}
                            aria-label="Toggle Menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={`md:hidden px-6 pt-4 pb-6 space-y-4 ${isDarkMode ? 'bg-[#0f0f1a]/90' : 'bg-[#f0faf5]/90'
                            } backdrop-blur-md`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MobileNavLink to="/" icon={<FaHome />} label="Home" onClick={() => setIsMobileMenuOpen(false)} />
                        <MobileNavLink to="/about" icon={<FaUser />} label="About" onClick={() => setIsMobileMenuOpen(false)} />
                        <MobileNavLink to="/projects" icon={<FaProjectDiagram />} label="Projects" onClick={() => setIsMobileMenuOpen(false)} />
                        <MobileNavLink to="/contact" icon={<FaEnvelope />} label="Contact" onClick={() => setIsMobileMenuOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};


const NavLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    return (
        <Link
            to={to}
            className={`group relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-blue-700'
                }`}
        >
            <span className="text-lg">{icon}</span>
            <span className="relative">
                {label}
                <span className={`absolute left-1/2 -bottom-0.5 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full group-hover:left-0`}></span>
            </span>
        </Link>
    );
};

const MobileNavLink = ({ to, icon, label, onClick }: { to: string; icon: React.ReactNode; label: string; onClick: () => void }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Link
                to={to}
                onClick={onClick}
                className={`group relative flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-all duration-300 ${isDarkMode ? 'text-blue-600' : 'text-blue-700'
                    }`}
            >
                <span className="text-xl">{icon}</span>
                <span className="relative">
                    {label}
                    <span className={`absolute left-1/2 -bottom-0.5 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full group-hover:left-0`}></span>
                </span>
            </Link>
        </motion.div>
    );
};

export default Navbar;
