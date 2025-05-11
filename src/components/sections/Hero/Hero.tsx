import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa6";
import { useTheme } from "../../../context/ThemeProvider";
import { Button } from "../../common";

const Hero = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className={`text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode
                        ? 'from-blue-600 via-blue-600 to-blue-300'
                        : 'from-blue-600 via-blue-500 to-indigo-600'
                        }`}
                >
                    Dika Pangestu
                    <span className={`block text-3xl md:text-4xl lg:text-5xl mt-3 transition-colors duration-300 ${isDarkMode ? 'text-blue-600' : 'text-blue-500'
                        }`}>
                        Frontend Developer
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`mt-6 max-w-2xl mx-auto text-xl transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-blue-600'
                        }`}
                >
                    Crafting modern, interactive, and responsive web experiences with a strong focus on design quality and performance.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                >
                    <Button
                        variant="primary"
                        size="lg"
                    >
                        View My Work
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                    >
                        Contact Me
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className={`justify-center mt-5 flex flex-col items-center transition-colors duration-300 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'
                        }`}
                >
                    <span
                        onClick={() => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-sm cursor-pointer hover:opacity-80"
                    >
                        Scroll Down
                    </span>
                    <FaArrowDown
                        onClick={() => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' })}
                        className="animate-bounce text-xl cursor-pointer hover:opacity-80"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
