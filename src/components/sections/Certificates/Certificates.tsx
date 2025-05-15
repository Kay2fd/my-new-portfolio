import React, { useState, useEffect } from 'react';
import Card from '../../common/Card/Card';
import Button from '../../common/Button/Button';
import { FaCertificate, FaTimes } from 'react-icons/fa';
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
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <Card
                                key={`loader-${index}`}
                                variant="glass"
                                isLoading={true}
                                loaderLines={3}
                                loaderImageHeight="h-48"
                                className={`p-0 overflow-hidden h-full ${isDarkMode ? 'bg-blue-900/20' : 'bg-white shadow-lg border border-blue-100'}`} children={undefined}                            >
                            </Card>
                        ))
                    ) : certificates.length === 0 ? (
                        <div className="col-span-3 text-center py-12">
                            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                No certificates found.
                            </p>
                        </div>
                    ) : (
                        certificates.map((cert, index) => (
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
                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <img
                                        src={cert.image_url}
                                        alt={cert.title}
                                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        onLoad={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            const aspectRatio = img.naturalWidth / img.naturalHeight;
                                            
                                            // For extreme aspect ratios, adjust the container
                                            if (aspectRatio > 2 || aspectRatio < 0.5) {
                                                const container = img.parentElement as HTMLElement;
                                                container.style.aspectRatio = aspectRatio > 2 ? '2/1' : '1/2';
                                            }
                                        }}
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
                        ))
                    )}
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
                            className={`relative rounded-xl overflow-hidden shadow-xl ${
                                isDarkMode 
                                    ? "bg-blue-900/20 backdrop-blur-sm border border-blue-800/30"
                                    : "bg-white shadow-lg border border-blue-200"
                            }`}
                            style={{
                                width: '95vw',
                                maxWidth: '1400px',
                                height: '90vh',
                            }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button
                                variant="text"
                                size="sm"
                                onClick={closeCertificate}
                                className="absolute top-3 right-3 z-50 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
                                aria-label="close"
                            >
                                <FaTimes className="w-5 h-5" />
                            </Button>

                            <div className="flex flex-col md:flex-row h-full">
                                <div className={`flex-1 flex items-center justify-center p-4 md:p-8 ${
                                    isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                                }`}>
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <img
                                            src={selectedCertificate.image_url}
                                            alt={selectedCertificate.title}
                                            className="max-w-full max-h-full object-contain"
                                            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
                                        />
                                    </div>
                                </div>

                                <div className={`w-full md:w-96 flex flex-col p-6 ${
                                    isDarkMode ? "bg-blue-900/30" : "bg-white"
                                }`}>
                                    <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                                        {selectedCertificate.title}
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <HiAcademicCap className={`mr-2 text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                        <span className={`text-lg font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                            {selectedCertificate.issuer}
                                        </span>
                                    </div>
                                    <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {selectedCertificate.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;
