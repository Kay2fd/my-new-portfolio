import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeProvider";
import { FaCode, FaLaptopCode, FaRocket } from "react-icons/fa";
import { MdOutlineDesignServices, MdOutlineIntegrationInstructions } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import { Card } from "../../common";

interface HighlightCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ icon, title, description, delay }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <Card
            variant="default"
            className="p-6"
            motionProps={{
                initial: { opacity: 0, y: 10 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.2 + delay * 0.1 },
                viewport: { once: true }
            }}
        >
            <div className={`text-3xl mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {icon}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                {title}
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {description}
            </p>
        </Card>
    );
};

const QuickIntro: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <section id="quick-intro" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        initial={{ y: -20 }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-700'}`}
                    >
                        Quick Intro
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        viewport={{ once: true }}
                        className={`mt-4 text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-blue-600'}`}
                    >
                        I'm a passionate developer focused on creating beautiful, functional, and user-friendly applications.
                    </motion.p>
                </motion.div>

                <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-blue-700'}`}
                >
                    What I Do
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <HighlightCard
                        icon={<FaCode />}
                        title="Clean Code"
                        description="I write clean, maintainable code with a focus on best practices and modern development standards."
                        delay={0.2}
                    />
                    <HighlightCard
                        icon={<FaLaptopCode />}
                        title="Responsive Design"
                        description="Creating applications that work flawlessly across all devices and screen sizes is my priority."
                        delay={0.4}
                    />
                    <HighlightCard
                        icon={<FaRocket />}
                        title="Performance Focused"
                        description="I optimize applications for speed and efficiency, ensuring the best possible user experience."
                        delay={0.6}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <HighlightCard
                        icon={<MdOutlineDesignServices />}
                        title="UI/UX Design"
                        description="I create intuitive and engaging user interfaces with a focus on user experience and accessibility."
                        delay={0.3}
                    />
                    <HighlightCard
                        icon={<MdOutlineIntegrationInstructions />}
                        title="API Integration"
                        description="I seamlessly connect applications with third-party services and APIs to extend functionality."
                        delay={0.5}
                    />
                    <HighlightCard
                        icon={<BsGraphUp />}
                        title="Scalable Solutions"
                        description="I build applications that can grow with your business, from MVP to enterprise-level solutions."
                        delay={0.7}
                    />
                </div>
            </div>
        </section>
    );
};

export default QuickIntro;
