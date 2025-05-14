import React, { useState, useEffect } from 'react';
import { useTheme } from "../../../context/ThemeProvider";
import { Link } from "react-router-dom";
import { Card } from "../../common";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import PageHeader from "../../common/PageHeader/PageHeader";
import { fetchProjects, type Project } from "../../../services/projectService";
import projectsData from "../../../data/projects"; // Fallback data

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          // Fallback to static data if no projects in database
          setProjects(projectsData as unknown as Project[]);
        }
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects');
        // Fallback to static data on error
        setProjects(projectsData as unknown as Project[]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const isValidUrl = (url?: string): boolean => {
    return !!url && url.trim() !== '';
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="My Projects"
            subtitle="Loading projects..."
          />
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && projects.length === 0) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="My Projects"
            subtitle="There was an error loading projects."
          />
          <div className="mt-10 text-center">
            <p className={isDarkMode ? 'text-red-400' : 'text-red-600'}>
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="My Projects"
          subtitle="Here are all the projects I've worked on."
        />

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                variant="glass"
                hoverEffect={true}
                clickable={true}
                className="h-full overflow-hidden"
                motionProps={{
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay: index * 0.1 },
                  viewport: { once: true }
                }}
              >
                <Link to={`/projects/${project.id}`} className="flex flex-col h-full">
                  <div className="flex-shrink-0 relative h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      src={project.thumbnail_image_url}
                      alt={project.title}
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                            style={{
                              backgroundColor: isDarkMode ? `${tag.color}30` : `${tag.color}20`,
                              color: tag.color
                            }}
                          >
                            {tag.name}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                              }`}
                          >
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                      <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {project.title}
                      </h3>
                      <p className={`mt-3 text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {project.short_description}
                      </p>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      {/* Perbaikan: Gunakan div atau span dengan styling yang sama, bukan Link lagi */}
                      <span
                        className={`text-sm font-medium ${isDarkMode
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-blue-600 hover:text-blue-500'
                          }`}
                      >
                        View Details →
                      </span>

                      <div className="flex space-x-2">
                        {isValidUrl(project.repo_url) && (
                          <a
                            href={project.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                            aria-label="GitHub Repository"
                            onClick={(e) => e.stopPropagation()} // Prevent triggering parent link
                          >
                            <FaGithub className="h-5 w-5" />
                          </a>
                        )}
                        {isValidUrl(project.demo_url) && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                            aria-label="Live Demo"
                            onClick={(e) => e.stopPropagation()} // Prevent triggering parent link
                          >
                            <FiExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
