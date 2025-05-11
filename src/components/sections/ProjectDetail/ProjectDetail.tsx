import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeProvider';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import { Button, Card } from '../../common';
import projectsData from '../../../data/projects';

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const project = projectsData.find(p => p.id === id);

    // Helper function to check if a URL is valid (not null, undefined, empty, or just whitespace)
    const isValidUrl = (url?: string): boolean => {
        return !!url && url.trim() !== '';
    };

    useEffect(() => {
        if (!project) {
            navigate('/not-found', { replace: true });
        }
    }, [project, navigate]);

    if (!project) {
        return null;
    }

    const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            to="/projects"
                            className={`inline-flex items-center mb-8 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                                }`}
                        >
                            <FaArrowLeft className="mr-2" /> Back to Projects
                        </Link>

                        <div className="relative rounded-xl overflow-hidden mb-8">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-64 sm:h-80 md:h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                <div className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag.name}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm"
                                                style={{ color: tag.color }}
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                                        {project.title}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mb-6">
                            <FaCalendarAlt className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                            <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {formattedDate}
                            </span>
                        </div>

                        <Card
                            variant="glass"
                            className="p-6 mb-8"
                        >
                            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Project Overview
                            </h2>
                            <p className={`whitespace-pre-line ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {project.description}
                            </p>
                        </Card>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {isValidUrl(project.repoUrl) && (
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant="primary" fullWidth={true}>
                                        <FaGithub className="mr-2" /> View Repository
                                    </Button>
                                </a>
                            )}
                            {isValidUrl(project.demoUrl) && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant={isValidUrl(project.repoUrl) ? "secondary" : "primary"} fullWidth={true}>
                                        <FaExternalLinkAlt className="mr-2" /> Live Demo
                                    </Button>
                                </a>
                            )}
                        </div>

                        <div className="mt-16">
                            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                More Projects
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {projectsData
                                    .filter(p => p.id !== project.id)
                                    .slice(0, 2)
                                    .map((relatedProject, index) => (
                                        <Card
                                            key={relatedProject.id}
                                            variant="glass"
                                            hoverEffect={true}
                                            clickable={true}
                                            className="overflow-hidden"
                                            motionProps={{
                                                initial: { opacity: 0, y: 20 },
                                                animate: { opacity: 1, y: 0 },
                                                transition: { duration: 0.5, delay: 0.2 + index * 0.1 }
                                            }}
                                        >
                                            <Link to={`/projects/${relatedProject.id}`} className="flex flex-col h-full">
                                                <div className="flex-shrink-0 relative h-40 overflow-hidden">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={relatedProject.image}
                                                        alt={relatedProject.title}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                                        <div className="p-4">
                                                            <h3 className="text-lg font-semibold text-white">
                                                                {relatedProject.title}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetail;
