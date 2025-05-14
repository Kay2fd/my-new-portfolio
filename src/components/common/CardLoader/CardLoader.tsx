import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeProvider';

interface CardLoaderProps {
  lines?: number;
  imageHeight?: string;
  hasImage?: boolean;
  className?: string;
}

const CardLoader: React.FC<CardLoaderProps> = ({
  lines = 3,
  imageHeight = 'h-48',
  hasImage = true,
  className = '',
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const shimmerVariants = {
    initial: {
      backgroundPosition: '-500px 0',
    },
    animate: {
      backgroundPosition: '500px 0',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'linear',
      },
    },
  };

  const baseClasses = 'rounded-xl transition-all duration-300';
  const variantClasses = isDarkMode
    ? 'bg-blue-900/10 border border-blue-800/30'
    : 'bg-blue-50/50 border border-blue-200';

  const shimmerClasses = isDarkMode
    ? 'bg-gradient-to-r from-blue-900/10 via-blue-800/30 to-blue-900/10'
    : 'bg-gradient-to-r from-blue-50/50 via-blue-100/70 to-blue-50/50';

  return (
    <div className={`${baseClasses} ${variantClasses} overflow-hidden ${className}`}>
      {hasImage && (
        <motion.div
          className={`${imageHeight} w-full ${shimmerClasses}`}
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />
      )}
      <div className="p-4 space-y-3">
        <motion.div
          className={`h-6 w-3/4 rounded ${shimmerClasses}`}
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />

        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-4 w-full rounded ${shimmerClasses} ${index === lines - 1 ? 'w-2/3' : 'w-full'
              }`}
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          />
        ))}

        <motion.div
          className={`h-8 w-1/3 mt-4 rounded ${shimmerClasses}`}
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />
      </div>
    </div>
  );
};

export default CardLoader;