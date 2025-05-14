import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../../components/common';
import { useTheme } from '../../context/ThemeProvider';
import { supabase } from '../../lib/supabase';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const LoginPage: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is already logged in
    useEffect(() => {
        const checkAuth = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setIsAuthenticated(true);
                // Redirect to admin dashboard or intended page
                const from = (location.state as any)?.from?.pathname || '/admin/profile';
                navigate(from, { replace: true });
            }
        };

        checkAuth();
    }, [navigate, location]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError(null);
            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            if (data.user) {
                // Redirect to admin dashboard or intended page
                const from = (location.state as any)?.from?.pathname || '/admin/profile';
                navigate(from, { replace: true });
            }
        } catch (error: any) {
            console.error('Error logging in:', error);
            setError(error.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                        You are already logged in. Redirecting...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto">
                <Card
                    variant="glass"
                    className="p-8"
                >
                    <h1 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                        Admin Login
                    </h1>

                    {error && (
                        <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Email
                            </label>
                            <div className={`flex items-center border rounded overflow-hidden ${isDarkMode
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-300'
                                }`}>
                                <span className={`px-3 py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <FaEnvelope />
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full p-2 focus:outline-none ${isDarkMode
                                            ? 'bg-gray-800 text-white'
                                            : 'bg-white text-gray-900'
                                        }`}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Password
                            </label>
                            <div className={`flex items-center border rounded overflow-hidden ${isDarkMode
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-300'
                                }`}>
                                <span className={`px-3 py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <FaLock />
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full p-2 focus:outline-none ${isDarkMode
                                            ? 'bg-gray-800 text-white'
                                            : 'bg-white text-gray-900'
                                        }`}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 rounded transition-colors duration-300 ${isDarkMode
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
