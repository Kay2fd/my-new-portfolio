import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeProvider';
import { FaHome, FaSearch } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Button } from '../../components/common';

const NotFound: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            <motion.div
                className="text-center max-w-2xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center mb-6"
                >
                    <div className={`relative w-32 h-32 flex items-center justify-center rounded-full ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100/70'
                        }`}>
                        <RiErrorWarningLine className={`text-7xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'
                            }`} />
                        <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-red-500/80' : 'bg-red-500'
                            }`}>
                            <span className="text-white font-bold text-xl">4</span>
                        </div>
                        <div className={`absolute -bottom-2 -left-2 w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-red-500/80' : 'bg-red-500'
                            }`}>
                            <span className="text-white font-bold text-xl">4</span>
                        </div>
                    </div>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-700'
                        }`}
                >
                    Page Not Found
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                >
                    Oops! The page you're looking for seems to have wandered off into the digital wilderness.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="relative h-32 mb-10 overflow-hidden"
                >
                    <motion.div
                        className={`absolute inset-0 flex items-center justify-center text-9xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'
                            }`}
                    >
                        404
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className={`mb-8 p-6 rounded-xl ${isDarkMode ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-100'
                        }`}
                >
                    <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'
                        }`}>
                        <FaSearch className="inline mr-2 mb-1" />
                        You might want to try:
                    </h3>
                    <ul className={`text-left list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        <li>Checking the URL for typos</li>
                        <li>Going back to the previous page</li>
                        <li>Visiting our homepage to start fresh</li>
                    </ul>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link to="/">
                        <Button
                            variant="primary"
                            size="lg"
                            className="flex items-center justify-center gap-2"
                        >
                            <FaHome />
                            Back to Home
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center"
                    >
                        Go Back
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFound;
