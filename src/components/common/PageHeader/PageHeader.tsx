import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeProvider';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16"
        >
            <div className="max-w-7xl mx-auto sm:px-4">
                <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r pb-3 ${
                    isDarkMode
                        ? 'from-blue-600 via-blue-800 to-blue-100'
                        : 'from-blue-400 via-blue-500 to-indigo-900'
                    } transition-colors duration-200`}>
                    {title}
                </h1>
                {subtitle && (
                    <p className={`mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    } transition-colors duration-200 leading-relaxed`}>
                        {subtitle}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default PageHeader;