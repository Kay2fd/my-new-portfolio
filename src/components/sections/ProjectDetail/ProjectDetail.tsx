// Perbaikan untuk hook order issue
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeProvider';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import { Button, Card } from '../../common';
import { getProjectById, fetchProjects, type Project } from '../../../services/projectService';
import projectsData from '../../../data/projects'; // Fallback data

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const [project, setProject] = useState<Project | null>(null);
    const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    // Definisikan allImages di luar useEffect untuk menghindari hook order issue
    const allImages = project
        ? [project.thumbnail_image_url, ...(project.detail_images || [])]
        : [];

    // Load project data
    useEffect(() => {
        const loadProject = async () => {
            if (!id) {
                navigate('/not-found', { replace: true });
                return;
            }

            try {
                setLoading(true);
                const projectData = await getProjectById(id);

                if (projectData) {
                    setProject(projectData);
                    setSelectedImage(projectData.thumbnail_image_url);

                    // Load related projects
                    const allProjects = await fetchProjects();
                    if (allProjects.length > 0) {
                        setRelatedProjects(
                            allProjects
                                .filter(p => p.id !== id)
                                .slice(0, 2)
                        );
                    } else {
                        // Fallback to static data
                        setRelatedProjects(
                            (projectsData as unknown as Project[])
                                .filter(p => p.id !== id)
                                .slice(0, 2)
                        );
                    }
                } else {
                    // Try to find in static data as fallback
                    const staticProject = projectsData.find(p => p.id === id);
                    if (staticProject) {
                        setProject(staticProject as unknown as Project);
                        setSelectedImage(staticProject.image);

                        // Set related projects from static data
                        setRelatedProjects(
                            projectsData
                                .filter(p => p.id !== id)
                                .slice(0, 2) as unknown as Project[]
                        );
                    } else {
                        navigate('/not-found', { replace: true });
                    }
                }
            } catch (err) {
                console.error('Error loading project:', err);
                setError('Failed to load project details');

                // Try to find in static data as fallback
                const staticProject = projectsData.find(p => p.id === id);
                if (staticProject) {
                    setProject(staticProject as unknown as Project);
                    setSelectedImage(staticProject.image);

                    // Set related projects from static data
                    setRelatedProjects(
                        projectsData
                            .filter(p => p.id !== id)
                            .slice(0, 2) as unknown as Project[]
                    );
                } else {
                    navigate('/not-found', { replace: true });
                }
            } finally {
                setLoading(false);
            }
        };

        loadProject();
    }, [id, navigate]);

    // Handle keyboard events for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                const currentIndex = allImages.findIndex(img => img === lightboxImage);
                const nextIndex = (currentIndex + 1) % allImages.length;
                setLightboxImage(allImages[nextIndex]);
            } else if (e.key === 'ArrowLeft') {
                const currentIndex = allImages.findIndex(img => img === lightboxImage);
                const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
                setLightboxImage(allImages[prevIndex]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [lightboxOpen, lightboxImage, allImages]);

    const isValidUrl = (url?: string): boolean => {
        return !!url && url.trim() !== '';
    };

    const openLightbox = (image: string) => {
        setLightboxImage(image);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const getGridClass = () => {
        const count = allImages.length;
        if (count <= 1) return "grid-cols-1";
        if (count === 2) return "grid-cols-1 sm:grid-cols-2";
        if (count === 3) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
        if (count === 4) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4";
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    };

    if (loading) {
        return (
            <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
                <div className="text-center">
                    <FaSpinner className={`animate-spin mx-auto h-10 w-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading project details...</p>
                </div>
            </div>
        );
    }

    if (error && !project) {
        return (
            <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Error Loading Project
                    </h1>
                    <p className={isDarkMode ? 'text-red-400' : 'text-red-600'}>
                        {error}
                    </p>
                    <Link
                        to="/projects"
                        className={`inline-flex items-center mt-6 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                    >
                        <FaArrowLeft className="mr-2" /> Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    if (!project) {
        return null;
    }

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

                        <div
                            className="relative rounded-xl overflow-hidden mb-8 cursor-pointer"
                            onClick={() => openLightbox(selectedImage || project.thumbnail_image_url)}
                        >
                            <img
                                src={selectedImage || project.thumbnail_image_url}
                                alt={project.title}
                                className="w-full h-64 sm:h-80 md:h-1/2 object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/1200x630?text=No+Image';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                <div className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.tags.map((tag, index) => (
                                            <span
                                                key={index}
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

                        {allImages.length > 1 && (
                            <div className={`grid ${getGridClass()} gap-4 mb-8`}>
                                {allImages.map((img, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className={`cursor-pointer rounded-lg overflow-hidden border-2 ${selectedImage === img
                                            ? isDarkMode ? 'border-blue-500' : 'border-blue-600'
                                            : 'border-transparent'
                                            }`}
                                        onClick={() => {
                                            setSelectedImage(img);
                                            openLightbox(img);
                                        }}
                                    >
                                        <div className="relative group">
                                            <img
                                                src={img}
                                                alt={`${project.title} - view ${index + 1}`}
                                                className="w-full h-40 sm:h-48 md:h-72 object-cover transition-all duration-300 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                                                <span className="text-white text-sm font-medium">View</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

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
                            {isValidUrl(project.repo_url) && (
                                <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant="primary" fullWidth={true}>
                                        <FaGithub className="mr-2" /> View Repository
                                    </Button>
                                </a>
                            )}
                            {isValidUrl(project.demo_url) && (
                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant={isValidUrl(project.repo_url) ? "secondary" : "primary"} fullWidth={true}>
                                        <FaExternalLinkAlt className="mr-2" /> Live Demo
                                    </Button>
                                </a>
                            )}
                        </div>

                        {relatedProjects.length > 0 && (
                            <div className="mt-16">
                                <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    More Projects
                                </h2>

                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                                    {relatedProjects.map((relatedProject, index) => (
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
                                                        src={relatedProject.thumbnail_image_url}
                                                        alt={relatedProject.title}
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                                        }}
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
                        )}
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {lightboxOpen && lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={closeLightbox}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative max-w-5xl max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={lightboxImage}
                                alt={project.title}
                                className="max-h-[90vh] max-w-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                                }}
                            />

                            {allImages.length > 1 && (
                                <>
                                    <button
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const currentIndex = allImages.findIndex(img => img === lightboxImage);
                                            const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
                                            setLightboxImage(allImages[prevIndex]);
                                        }}
                                    >
                                        <FaChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const currentIndex = allImages.findIndex(img => img === lightboxImage);
                                            const nextIndex = (currentIndex + 1) % allImages.length;
                                            setLightboxImage(allImages[nextIndex]);
                                        }}
                                    >
                                        <FaChevronRight className="h-6 w-6" />
                                    </button>
                                </>
                            )}
                        </motion.div>

                        <button
                            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                            onClick={closeLightbox}
                        >
                            <FaTimes className="h-6 w-6" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                            {allImages.findIndex(img => img === lightboxImage) + 1} / {allImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProjectDetail;
