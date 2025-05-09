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
      url: 'https://linkedin.com/in/yourusername',
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

  return (
    <footer className={`relative z-10 ${isDarkMode ? 'bg-blue-950/10' : 'bg-[#e6f7ee]/60'} backdrop-blur-md border-t border-blue-400 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
                Kay2fd Portfolio
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                A creative developer passionate about building beautiful and functional web experiences.
              </p>

              <div className="flex mt-6 space-x-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${isDarkMode ? 'text-neutral-400 hover:text-blue-400' : 'text-neutral-600 hover:text-blue-600'} transition-colors duration-300`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.name}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {footerSections.map((section, index) => (
            <div key={section.title} className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-neutral-400 hover:text-blue-400' : 'text-neutral-600 hover:text-blue-600'} transition-colors duration-300`}
                      >
                        {link.icon && link.icon}
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="my-8">
          <div className={`h-0.5 w-full bg-gradient-to-r ${isDarkMode ? 'from-transparent via-blue-500/50 to-transparent' : 'from-transparent via-blue-600/30 to-transparent'}`}></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'} transition-colors duration-300`}>
              &copy; {new Date().getFullYear()} Kay2fd Portfolio. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 md:mt-0"
          >
            <p className={`text-xs ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
              Built with React, Tailwind CSS & Framer Motion
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
