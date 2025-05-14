import React, { useState, useEffect } from 'react';
import Card from '../../common/Card/Card';
import { FaCertificate } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeProvider';
import { fetchCertificates, type Certificate } from '../../../services/certificateServices';

const Certificates: React.FC = () => {
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    useEffect(() => {
        const loadCertificates = async () => {
            try {
                setLoading(true);
                const data = await fetchCertificates();
                setCertificates(data);
            } catch (err) {
                console.error('Error loading certificates:', err);
                setError('Failed to load certificates');
            } finally {
                setLoading(false);
            }
        };

        loadCertificates();
    }, []);

    const openCertificate = (cert: Certificate) => {
        setSelectedCertificate(cert);
    };

    const closeCertificate = () => {
        setSelectedCertificate(null);
    };

    if (loading) {
        return (
            <section className="py-12" id="certificates">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Loading certificates...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-12" id="certificates">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <p className={`text-xl text-red-500`}>
                            {error}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (certificates.length === 0) {
        return (
            <section className="py-12" id="certificates">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            No certificates found.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12" id="certificates">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="lg:text-center"
                >
                    <h2 className="text-base font-semibold tracking-wide uppercase text-blue-600 dark:text-blue-400">
                        Achievements
                    </h2>
                    <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                        My Certifications
                    </p>
                    <p className={`mt-4 max-w-2xl text-xl lg:mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Professional certifications I've earned throughout my career
                    </p>
                </motion.div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <Card
                            key={cert.id}
                            variant="glass"
                            hoverEffect={true}
                            clickable={true}
                            className={`p-0 overflow-hidden h-full ${isDarkMode ? 'bg-blue-900/20' : 'bg-white shadow-lg border border-blue-100'}`}
                            onClick={() => openCertificate(cert)}
                            motionProps={{
                                initial: { opacity: 0, y: 20 },
                                whileInView: { opacity: 1, y: 0 },
                                transition: { duration: 0.5, delay: index * 0.1 },
                                viewport: { once: true },
                                whileHover: { y: -5, transition: { duration: 0.2 } }
                            }}
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={cert.image_url}
                                    alt={cert.title}
                                    className="w-full h-full transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <div className={`p-6 ${isDarkMode ? '' : 'bg-white'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <FaCertificate className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                            <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                                                {cert.title}
                                            </h4>
                                        </div>
                                        <div className="flex items-center mb-3">
                                            <HiAcademicCap className={`mr-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                            <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                                {cert.issuer}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {cert.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCertificate && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCertificate}
                    >
                        <motion.div
                            className={`rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-xl ${isDarkMode
                                ? "bg-blue-900/20 backdrop-blur-sm border border-blue-800/30"
                                : "bg-white shadow-lg border border-blue-200"
                                }`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={`relative h-96 ${isDarkMode ? "bg-gray-800/50" : "bg-blue-50"
                                }`}>
                                <img
                                    src={selectedCertificate.image_url}
                                    alt={selectedCertificate.title}
                                    className="w-full h-full"
                                />
                                <button
                                    className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
                                    onClick={closeCertificate}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className={`p-6 ${isDarkMode ? "" : "bg-white"
                                }`}>
                                <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                                    {selectedCertificate.title}
                                </h3>
                                <div className="flex items-center mb-4">
                                    <HiAcademicCap className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <span className={`text-lg font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                        {selectedCertificate.issuer}
                                    </span>
                                </div>
                                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {selectedCertificate.description}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;
