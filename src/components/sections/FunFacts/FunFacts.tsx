import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeProvider';
import {
  FaCoffee, FaCode, FaMusic, FaBook, FaGamepad,
  FaPlane, FaLanguage, FaBicycle, FaUtensils, FaCamera,
  FaMountain, FaGuitar, FaDrum
} from 'react-icons/fa';
import funFactsData from '../../../data/funFacts';
import { Card } from '../../common';

const renderIcon = (iconType: string, size: number = 24, color?: string) => {
  const iconProps = { size, color };

  switch (iconType) {
    case 'coffee':
      return <FaCoffee {...iconProps} />;
    case 'code':
      return <FaCode {...iconProps} />;
    case 'music':
      return <FaMusic {...iconProps} />;
    case 'book':
      return <FaBook {...iconProps} />;
    case 'gamepad':
      return <FaGamepad {...iconProps} />;
    case 'plane':
      return <FaPlane {...iconProps} />;
    case 'language':
      return <FaLanguage {...iconProps} />;
    case 'bicycle':
      return <FaBicycle {...iconProps} />;
    case 'food':
      return <FaUtensils {...iconProps} />;
    case 'camera':
      return <FaCamera {...iconProps} />;
    case 'mountain':
      return <FaMountain {...iconProps} />;
    case 'guitar':
      return <FaGuitar {...iconProps} />;
    case 'drum':
      return <FaDrum {...iconProps} />;
    default:
      return <FaCode {...iconProps} />;
  }
};

const FunFacts: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
            Fun Facts About Me
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Beyond coding, here are some things that make me who I am
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {funFactsData.map((fact, index) => (
            <Card
              key={fact.title}
              variant="glass"
              hoverEffect={true}
              className="h-full shadow-lg"
              motionProps={{
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: index * 0.1 },
                viewport: { once: true },
                whileHover: { y: -5, transition: { duration: 0.2 } }
              }}
            >
              <div className="p-4 sm:p-5 md:p-6 h-full">
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                  <div
                    className={`p-3 rounded-lg mb-3 sm:mb-0 sm:mr-4 ${isDarkMode
                      ? 'bg-blue-900/30'
                      : 'bg-blue-100'
                      }`}
                    style={{ color: fact.color || (isDarkMode ? '#60A5FA' : '#2563EB') }}
                  >
                    {renderIcon(fact.icon, 28, fact.color)}
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                      {fact.title}
                    </h3>
                    <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {fact.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunFacts;
