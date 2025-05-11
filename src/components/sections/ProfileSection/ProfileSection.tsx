import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeProvider';

import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { MdSchool, MdWork, MdLocationOn, MdCode } from 'react-icons/md';
import { Card } from '../../common';
import profileData from '../../../data/profile';

const renderIcon = (iconType: string, size: number = 20) => {
    switch (iconType) {
        case 'github':
            return <FaGithub size={size} />;
        case 'linkedin':
            return <FaLinkedinIn size={size} />;
        case 'twitter':
            return <FaTwitter size={size} />;
        case 'email':
            return <FaEnvelope size={size} />;
        case 'school':
            return <MdSchool size={size} />;
        case 'work':
            return <MdWork size={size} />;
        case 'location':
            return <MdLocationOn size={size} />;
        default:
            return null;
    }
};

const ProfileSection: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                    <Card
                        variant="glass"
                        className="p-6 text-center"
                        motionProps={{
                            whileHover: { y: -5 }
                        }}
                    >
                        <div className="mb-6 relative mx-auto">
                            <div className={`w-48 h-48 rounded-full overflow-hidden mx-auto border-4 ${isDarkMode ? 'border-blue-500/30' : 'border-blue-200'}`}>
                                <img
                                    src={profileData.avatar}
                                    alt={profileData.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${profileData.name.replace(' ', '+')}&background=${isDarkMode ? '0F172A' : 'E0F2FE'}&color=${isDarkMode ? '60A5FA' : '2563EB'}&size=200`;
                                    }}
                                />
                            </div>
                            <div className={`absolute bottom-0 right-1/4 w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900/80 text-blue-300' : 'bg-blue-100 text-blue-600'} border-2 ${isDarkMode ? 'border-blue-800' : 'border-white'}`}>
                                <MdCode size={24} />
                            </div>
                        </div>

                        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                            {profileData.name}
                        </h2>
                        <p className={`text-lg mb-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                            {profileData.role}
                        </p>

                        <div className="flex justify-center space-x-3 mb-6">
                            {profileData.socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-full ${isDarkMode
                                        ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/50 hover:text-blue-200'
                                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700'
                                        } transition-colors duration-300`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={link.name}
                                >

                                    {renderIcon(link.iconType)}
                                </motion.a>
                            ))}
                        </div>

                        <div className="space-y-3 text-left">
                            {profileData.details.map((detail, index) => (
                                <div key={index} className="flex items-center">
                                    <span className={`mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}>

                                        {renderIcon(detail.iconType)}
                                    </span>
                                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                        {detail.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card
                        variant="glass"
                        className="p-6 h-full"
                    >
                        <h3 className={`text-2xl font-bold mb-4 pb-3 border-b ${isDarkMode ? 'text-white border-blue-800/30' : 'text-blue-700 border-blue-200'
                            }`}>
                            Profile
                        </h3>

                        <div className="space-y-4">
                            {profileData.bio.paragraphs.map((paragraph, index) => (
                                <p key={index} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {paragraph}
                                </p>
                            ))}

                            <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-100'
                                }`}>
                                <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                                    Quick Facts:
                                </h4>
                                <ul className={`list-disc list-inside space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {profileData.bio.quickFacts.map((fact, index) => (
                                        <li key={index}>{fact}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default ProfileSection;