import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../../components/common';
import { FunFacts, ProfileSection, } from '../../components/sections';

const AboutPage: React.FC = () => {
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

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <PageHeader 
            title="About Me" 
            subtitle="Get to know more about who I am and what drives my passion for development."
          />
          
          <ProfileSection />
          
          <FunFacts />
          
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;