import React from 'react';
import { Card } from '../../../../components/common';
import ImageUploader from '../../../../components/common/ImageUploader/ImageUploader';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface ProfileAdminViewProps {
    isDarkMode: boolean;
    currentImageUrl: string;
    name: string;
    role: string;
    bio: string;
    quickFacts: string[];
    newQuickFact: string;
    loading: boolean;
    error: string | null;
    success: string | null;
    infoError: string | null;
    infoSuccess: string | null;
    bioError: string | null;
    bioSuccess: string | null;
    factsError: string | null;
    factsSuccess: string | null;
    handleImageUploaded: (url: string) => Promise<void>;
    handleProfileInfoSubmit: (e: React.FormEvent) => Promise<void>;
    handleBioSubmit: (e: React.FormEvent) => Promise<void>;
    handleQuickFactsSubmit: (e: React.FormEvent) => Promise<void>;
    handleAddQuickFact: () => void;
    handleRemoveQuickFact: (index: number) => void;
    setName: (name: string) => void;
    setRole: (role: string) => void;
    setBio: (bio: string) => void;
    setNewQuickFact: (fact: string) => void;
}

const ProfileAdminView: React.FC<ProfileAdminViewProps> = ({
    isDarkMode,
    currentImageUrl,
    name,
    role,
    bio,
    quickFacts,
    newQuickFact,
    loading,
    error,
    success,
    infoError,
    infoSuccess,
    bioError,
    bioSuccess,
    factsError,
    factsSuccess,
    handleImageUploaded,
    handleProfileInfoSubmit,
    handleBioSubmit,
    handleQuickFactsSubmit,
    handleAddQuickFact,
    handleRemoveQuickFact,
    setName,
    setRole,
    setBio,
    setNewQuickFact,
}) => {
    return (
        <div className="w-full">
            <h1 className={`text-2xl md:text-3xl font-bold mb-4 md:mb-8 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                Manage Profile
            </h1>

            <div className="grid grid-cols-1 gap-4 md:gap-8">
                <Card
                    variant="glass"
                    className="p-4 md:p-6"
                >
                    <h2 className={`text-lg md:text-xl font-semibold mb-3 md:mb-4 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                        Profile Image
                    </h2>

                    {error && (
                        <div className="mb-4 p-2 md:p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm md:text-base">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-2 md:p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm md:text-base">
                            {success}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center p-4">Loading...</div>
                    ) : (
                        <ImageUploader
                            onImageUploaded={handleImageUploaded}
                            currentImageUrl={currentImageUrl}
                            bucketName="profile-images"
                            folderPath="public"
                            previewShape="circle"
                        />
                    )}
                </Card>

                <Card
                    variant="glass"
                    className="p-4 md:p-6"
                >
                    <h2 className={`text-lg md:text-xl font-semibold mb-3 md:mb-4 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                        Profile Information
                    </h2>

                    {infoError && (
                        <div className="mb-4 p-2 md:p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm md:text-base">
                            {infoError}
                        </div>
                    )}

                    {infoSuccess && (
                        <div className="mb-4 p-2 md:p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm md:text-base">
                            {infoSuccess}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center p-4">Loading...</div>
                    ) : (
                        <form onSubmit={handleProfileInfoSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-full p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${isDarkMode
                                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                                        }`}
                                    required
                                />
                            </div>

                            <div className="mb-4 md:mb-6">
                                <label
                                    htmlFor="role"
                                    className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Role
                                </label>
                                <input
                                    id="role"
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className={`w-full p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${isDarkMode
                                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                                        }`}
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full md:w-auto py-2 px-4 rounded transition-colors duration-300 text-sm md:text-base ${isDarkMode
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                            >
                                Update Profile Info
                            </button>
                        </form>
                    )}
                </Card>

                <Card
                    variant="glass"
                    className="p-4 md:p-6"
                >
                    <h2 className={`text-lg md:text-xl font-semibold mb-3 md:mb-4 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                        Biography
                    </h2>

                    {bioError && (
                        <div className="mb-4 p-2 md:p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm md:text-base">
                            {bioError}
                        </div>
                    )}

                    {bioSuccess && (
                        <div className="mb-4 p-2 md:p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm md:text-base">
                            {bioSuccess}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center p-4">Loading...</div>
                    ) : (
                        <form onSubmit={handleBioSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="bio"
                                    className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Bio (separate paragraphs with blank lines)
                                </label>
                                <textarea
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={6}
                                    className={`w-full p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${isDarkMode
                                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                                        }`}
                                    required
                                />
                                <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Leave a blank line between paragraphs to create separate paragraphs.
                                </p>
                            </div>

                            <button
                                type="submit"
                                className={`w-full md:w-auto py-2 px-4 rounded transition-colors duration-300 text-sm md:text-base ${isDarkMode
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                            >
                                Update Bio
                            </button>
                        </form>
                    )}
                </Card>

                <Card
                    variant="glass"
                    className="p-4 md:p-6"
                >
                    <h2 className={`text-lg md:text-xl font-semibold mb-3 md:mb-4 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                        Quick Facts
                    </h2>

                    {factsError && (
                        <div className="mb-4 p-2 md:p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm md:text-base">
                            {factsError}
                        </div>
                    )}

                    {factsSuccess && (
                        <div className="mb-4 p-2 md:p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm md:text-base">
                            {factsSuccess}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center p-4">Loading...</div>
                    ) : (
                        <form onSubmit={handleQuickFactsSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="quickFacts"
                                    className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Current Quick Facts
                                </label>

                                <div className={`mb-4 p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                                    {quickFacts.length > 0 ? (
                                        <ul className="space-y-2">
                                            {quickFacts.map((fact, index) => (
                                                <li key={index} className="flex items-center justify-between">
                                                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        {fact}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveQuickFact(index)}
                                                        className={`p-1 rounded-full ${isDarkMode
                                                            ? 'bg-red-900/30 text-red-300 hover:bg-red-800/50'
                                                            : 'bg-red-100 text-red-600 hover:bg-red-200'
                                                            }`}
                                                        aria-label="Remove fact"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            No quick facts added yet.
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="newQuickFact"
                                        className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                    >
                                        Add New Quick Fact
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            id="newQuickFact"
                                            type="text"
                                            value={newQuickFact}
                                            onChange={(e) => setNewQuickFact(e.target.value)}
                                            className={`flex-1 p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${isDarkMode
                                                ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                                                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                                                }`}
                                            placeholder="Enter a new quick fact"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddQuickFact();
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddQuickFact}
                                            className={`p-2 rounded transition-colors duration-300 ${isDarkMode
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                                                }`}
                                            disabled={!newQuickFact.trim()}
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`w-full md:w-auto py-2 px-4 rounded transition-colors duration-300 text-sm md:text-base ${isDarkMode
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                                disabled={quickFacts.length === 0}
                            >
                                Save Quick Facts
                            </button>
                        </form>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ProfileAdminView;
