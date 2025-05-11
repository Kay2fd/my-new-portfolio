import { useTheme } from "../../../context/ThemeProvider";
import projectsData from "../../../data/projects";
import { Link } from "react-router-dom";
import { Card } from "../../common";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import PageHeader from "../../common/PageHeader/PageHeader";

const Projects = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const allProjects = projectsData;

  const isValidUrl = (url?: string): boolean => {
    return !!url && url.trim() !== '';
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="My Projects"
          subtitle="Here are all the projects I've worked on."
        />

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allProjects.map((project, index) => (
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
                      src={project.image}
                      alt={project.title}
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.name}
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
                        {project.shortDescription}
                      </p>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <Link
                        to={`/projects/${project.id}`}
                        className={`text-sm font-medium ${isDarkMode
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-blue-600 hover:text-blue-500'
                          }`}
                      >
                        View Details →
                      </Link>

                      <div className="flex space-x-2">
                        {isValidUrl(project.repoUrl) && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                            aria-label="GitHub Repository"
                          >
                            <FaGithub className="h-5 w-5" />
                          </a>
                        )}
                        {isValidUrl(project.demoUrl) && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                            aria-label="Live Demo"
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
