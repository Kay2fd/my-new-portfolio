import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeProvider";
import {
    FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaGitAlt,
    FaFigma, FaNpm, FaGithub
} from "react-icons/fa";
import {
    SiTypescript, SiTailwindcss, SiNextdotjs, SiFirebase, SiVercel, SiFramer,
    SiLaravel
} from "react-icons/si";
import { Card } from "../../common";

interface TechItem {
    name: string;
    icon: React.ReactNode;
    color: string;
}

const TechStack = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const topRowItems: TechItem[] = [
        { name: "React", icon: <FaReact />, color: "text-[#61DAFB]" },
        { name: "TypeScript", icon: <SiTypescript />, color: "text-[#3178C6]" },
        { name: "JavaScript", icon: <FaJs />, color: "text-[#F7DF1E]" },
        { name: "HTML5", icon: <FaHtml5 />, color: "text-[#E34F26]" },
        { name: "CSS3", icon: <FaCss3Alt />, color: "text-[#1572B6]" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-[#06B6D4]" },
        { name: "Next.js", icon: <SiNextdotjs />, color: isDarkMode ? "text-white" : "text-black" },
        { name: "Node.js", icon: <FaNodeJs />, color: "text-[#339933]" },
    ];

    const bottomRowItems: TechItem[] = [
        { name: "Firebase", icon: <SiFirebase />, color: "text-[#FFCA28]" },
        { name: "Git", icon: <FaGitAlt />, color: "text-[#F05032]" },
        { name: "GitHub", icon: <FaGithub />, color: isDarkMode ? "text-white" : "text-black" },
        { name: "Figma", icon: <FaFigma />, color: "text-[#F24E1E]" },
        { name: "NPM", icon: <FaNpm />, color: "text-[#CB3837]" },
        { name: "Vercel", icon: <SiVercel />, color: isDarkMode ? "text-white" : "text-black" },
        { name: "Framer Motion", icon: <SiFramer />, color: isDarkMode ? "text-white" : "text-black" },
        { name: "Laravel", icon: <SiLaravel />, color: "text-[#FF2D20]" },
    ];

    return (
        <section id="tech-stack" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                        Tech Stack
                    </h2>
                    <p className={`mt-4 text-xl ${isDarkMode ? 'text-gray-300' : 'text-blue-600'}`}>
                        Technologies and tools I work with
                    </p>
                </motion.div>

                <div className="space-y-12">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
                        {topRowItems.map((tech, index) => (
                            <Card
                                key={tech.name}
                                variant="glass"
                                className="flex flex-col items-center justify-center p-4"
                                motionProps={{
                                    layout: true,
                                    initial: { x: -50, opacity: 0 },
                                    whileInView: { x: 0, opacity: 1 },
                                    transition: { duration: 0.5, delay: index * 0.1 },
                                    viewport: { once: true }
                                }}
                            >
                                <div className={`text-4xl md:text-5xl ${tech.color}`}>
                                    {tech.icon}
                                </div>
                                <span className={`mt-3 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {tech.name}
                                </span>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
                        {bottomRowItems.map((tech, index) => (
                            <Card
                                key={tech.name}
                                variant="glass"
                                className="flex flex-col items-center justify-center p-4"
                                motionProps={{
                                    initial: { x: 50, opacity: 0 },
                                    whileInView: { x: 0, opacity: 1 },
                                    transition: { duration: 0.5, delay: index * 0.1 },
                                    viewport: { once: true }
                                }}
                            >
                                <div className={`text-4xl md:text-5xl ${tech.color}`}>
                                    {tech.icon}
                                </div>
                                <span className={`mt-3 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {tech.name}
                                </span>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className={`mt-16 text-center`}>
                    <p className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Always exploring and learning new technologies to stay at the cutting edge.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
