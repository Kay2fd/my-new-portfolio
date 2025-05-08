import Button from '../../common/Button/Button';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Website',
    description: 'A fully responsive e-commerce platform built with React, Redux, and Node.js.',
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    tags: ['React', 'Redux', 'Node.js', 'MongoDB'],
    link: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A productivity app that helps users organize and track their daily tasks.',
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    tags: ['React', 'TypeScript', 'Firebase'],
    link: '#',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A weather application that displays current and forecasted weather data.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
    tags: ['JavaScript', 'API', 'CSS'],
    link: '#',
  },
];

const Projects = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Projects</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            My Recent Work
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Here are a few projects I've worked on recently.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={project.image} alt={project.title} />
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} className="block">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="mt-3 text-base text-gray-500 dark:text-gray-400">{project.description}</p>
                    </a>
                  </div>
                  <div className="mt-6">
                    <a href={project.link} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium">
                      View Project →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="primary">View All Projects</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;