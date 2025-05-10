import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeProvider';

interface ScrollToTopProps {
    className?: string;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const defaultClasses = `
    fixed bottom-6 right-6 sm:bottom-8 sm:right-8
    p-3 rounded-full shadow-lg z-50
    ${isDarkMode
            ? 'bg-blue-600 hover:bg-blue-500 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'}
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${isDarkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-600'}
  `;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className={`${defaultClasses} ${className}`.trim()}
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    <FaArrowUp />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
