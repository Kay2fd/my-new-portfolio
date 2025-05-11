import { useTheme } from '../../../context/ThemeProvider';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { MdCode, MdHome, MdPerson, MdWork, MdContactMail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Kay2fd',
      icon: <FaGithub size={20} />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dika-pangestu/',
      icon: <FaLinkedinIn size={20} />,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: <FaTwitter size={20} />,
    },
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: <FaEnvelope size={20} />,
    },
  ];

  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', path: '/', icon: <MdHome size={16} /> },
        { name: 'About', path: '/about', icon: <MdPerson size={16} /> },
        { name: 'Projects', path: '/projects', icon: <MdCode size={16} /> },
        { name: 'Experience', path: '/experience', icon: <MdWork size={16} /> },
        { name: 'Contact', path: '/contact', icon: <MdContactMail size={16} /> },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy', icon: null },
        { name: 'Terms of Service', path: '/terms', icon: null },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className={`relative z-10 ${isDarkMode
      ? 'bg-gradient-to-b from-blue-950/20 to-blue-950/40'
      : 'bg-gradient-to-b from-[#e6f7ee]/60 to-[#e6f7ee]/90'
      } backdrop-blur-md border-t ${isDarkMode ? 'border-blue-500/30' : 'border-blue-400/50'
      } transition-colors duration-300`}>

      <div className="absolute top-0 left-0 w-full transform -translate-y-full overflow-hidden hidden sm:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-[70px]">
          <path
            fill={isDarkMode ? '#172554' : '#e6f7ee'}
            fillOpacity={isDarkMode ? "0.2" : "0.6"}
            d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto pt-10 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10"
        >
          <motion.div variants={itemVariants} className="col-span-1 sm:col-span-2 lg:col-span-1 mb-6 sm:mb-0">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
                }`}>
                <span className="text-xl font-bold">K</span>
              </div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                Kay2fd Portfolio
              </h2>
            </div>

            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'} max-w-md sm:max-w-xs lg:max-w-none`}>
              A creative developer passionate about building beautiful and functional web experiences with a focus on performance and user experience.
            </p>

            <div className="flex mt-5 space-x-3 sm:space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 sm:p-2.5 rounded-full ${isDarkMode
                    ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/50 hover:text-blue-200'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700'
                    } transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerSections.map((section) => (
            <motion.div key={section.title} variants={itemVariants} className="col-span-1">
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 pb-2 border-b ${isDarkMode
                ? 'text-blue-300 border-blue-800/50'
                : 'text-blue-700 border-blue-200'
                }`}>
                {section.title}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`text-sm flex items-center gap-2 group ${isDarkMode
                        ? 'text-neutral-300 hover:text-blue-300'
                        : 'text-neutral-600 hover:text-blue-600'
                        } transition-colors duration-300`}
                    >
                      {link.icon ? (
                        <span className={`${isDarkMode ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-500 group-hover:text-blue-600'}`}>
                          {link.icon}
                        </span>
                      ) : null}                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div variants={itemVariants} className="col-span-1 sm:col-span-2 lg:col-span-1 mt-2 sm:mt-0">
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 pb-2 border-b ${isDarkMode
              ? 'text-blue-300 border-blue-800/50'
              : 'text-blue-700 border-blue-200'
              }`}>
              Newsletter
            </h3>
            <p className={`text-sm mb-3 sm:mb-4 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              Subscribe to receive updates on new projects and articles.
            </p>
            <form className="flex flex-col space-y-2 sm:space-y-3 sm:max-w-xs lg:max-w-none">
              <input
                type="email"
                placeholder="Your email address"
                className={`px-3 sm:px-4 py-2 text-sm rounded-md focus:outline-none focus:ring-2 ${isDarkMode
                  ? 'bg-blue-900/30 border border-blue-800 text-white placeholder:text-neutral-400 focus:ring-blue-500'
                  : 'bg-white border border-blue-200 text-neutral-800 placeholder:text-neutral-500 focus:ring-blue-400'
                  }`}
                required
              />
              <button
                type="submit"
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </motion.div>

        <div className="my-6 sm:my-8">
          <div className={`h-px w-full ${isDarkMode
            ? 'bg-gradient-to-r from-transparent via-blue-500/40 to-transparent'
            : 'bg-gradient-to-r from-transparent via-blue-400/30 to-transparent'
            }`}></div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              &copy; {new Date().getFullYear()} Kay2fd Portfolio. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-3 sm:mt-0 flex items-center justify-center sm:justify-end"
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${isDarkMode ? 'bg-green-400' : 'bg-green-500'}`}></div>
            <p className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Built with React, Tailwind CSS & Framer Motion
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
