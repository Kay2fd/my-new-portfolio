import { motion } from "framer-motion";
import Button from "../../common/Button/Button";
import ParticlesBackground from "../../layout/ParticlesBackground/ParticlesBackground";
import { FaArrowDown } from "react-icons/fa6";
import { useTheme } from "../../../context/ThemeProvider";

const Hero = () => {
    const { theme } = useTheme();
    const isLightMode = theme === 'light';
    
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Particles */}
            <div className="absolute inset-0 z-0">
                <ParticlesBackground />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className={`text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${
                        isLightMode 
                            ? 'from-blue-600 via-blue-500 to-indigo-600' 
                            : 'from-white via-gray-200 to-gray-100'
                    }`}
                >
                    John Doe
                    <span className={`block text-3xl md:text-4xl lg:text-5xl mt-3 transition-colors duration-300 ${
                        isLightMode ? 'text-blue-700' : 'text-white'
                    }`}>
                        Frontend Developer
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`mt-6 max-w-2xl mx-auto text-xl transition-colors duration-300 ${
                        isLightMode ? 'text-blue-600' : 'text-gray-300'
                    }`}
                >
                    Creating exceptional digital experiences with modern web technologies. Specializing in React, TypeScript, and responsive design.
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
                        className="px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        View My Work
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="px-8 py-4 text-lg rounded-full border-2 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Contact Me
                    </Button>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-colors duration-300 ${
                        isLightMode ? 'text-blue-500' : 'text-gray-400'
                    }`}
                >
                    <span className="text-sm mb-1">Scroll Down</span>
                    <FaArrowDown className="animate-bounce text-xl" />
                </motion.div>
            </div>

            {/* Decorative blurs */}
            <div className={`absolute top-1/4 left-10 w-64 h-64 rounded-full filter blur-3xl transition-colors duration-300 ${
                isLightMode ? 'bg-blue-700/20' : 'bg-indigo-400/10'
            }`}></div>
            <div className={`absolute bottom-1/4 right-10 w-64 h-64 rounded-full filter blur-3xl transition-colors duration-300 ${
                isLightMode ? 'bg-indigo-700/20' : 'bg-purple-400/10'
            }`}></div>
        </div>
    );
};

export default Hero;
