export interface ProjectTag {
  name: string;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  tags: ProjectTag[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  date: string; 
}

const projectsData: Project[] = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features dark mode, animations with Framer Motion, and a clean, minimalist design.",
    shortDescription: "Modern portfolio website with React, TypeScript, and Tailwind CSS",
    image: "/images/projects/portfolio.jpg",
    tags: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "Framer Motion", color: "#0055FF" }
    ],
    demoUrl: "https://your-portfolio-url.com",
    repoUrl: "https://github.com/Kay2fd/my-new-portfolio",
    featured: true,
    date: "2023-09-15"
  },
  {
    id: "e-commerce-dashboard",
    title: "E-Commerce Dashboard",
    description: "A comprehensive admin dashboard for e-commerce platforms. Includes sales analytics, inventory management, order tracking, and customer insights. Built with React, Redux, and Material UI.",
    shortDescription: "Admin dashboard for e-commerce with analytics and management features",
    image: "/images/projects/ecommerce-dashboard.jpg",
    tags: [
      { name: "React", color: "#61DAFB" },
      { name: "Redux", color: "#764ABC" },
      { name: "Material UI", color: "#0081CB" },
      { name: "Chart.js", color: "#FF6384" }
    ],
    demoUrl: "https://demo-ecommerce-dashboard.example.com",
    repoUrl: "https://github.com/yourusername/ecommerce-dashboard",
    featured: true,
    date: "2023-07-20"
  },
  {
    id: "weather-app",
    title: "Weather Forecast App",
    description: "A weather application that provides current conditions and 5-day forecasts for any location. Features include geolocation, interactive maps, and detailed weather metrics. Built with React Native and OpenWeatherMap API.",
    shortDescription: "Weather app with forecasts and geolocation using React Native",
    image: "/images/projects/weather-app.jpg",
    tags: [
      { name: "React Native", color: "#61DAFB" },
      { name: "API Integration", color: "#FF5722" },
      { name: "Geolocation", color: "#4CAF50" }
    ],
    demoUrl: "https://weather-app-demo.example.com",
    repoUrl: "https://github.com/yourusername/weather-app",
    featured: false,
    date: "2023-05-10"
  },
  {
    id: "task-manager",
    title: "Task Manager Application",
    description: "A productivity tool for managing tasks and projects. Features include task categorization, due dates, priority levels, and progress tracking. Built with React, Firebase, and styled-components.",
    shortDescription: "Productivity tool for task and project management",
    image: "/images/projects/task-manager.jpg",
    tags: [
      { name: "React", color: "#61DAFB" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "styled-components", color: "#DB7093" }
    ],
    demoUrl: " ",
    repoUrl: " ",
    featured: false,
    date: "2023-03-15"
  }
];

export default projectsData;