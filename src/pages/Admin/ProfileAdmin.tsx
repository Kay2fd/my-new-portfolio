import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common';
import ImageUploader from '../../components/common/ImageUploader/ImageUploader';
import { useTheme } from '../../context/ThemeProvider';
import { fetchProfileData, updateProfileImage, updateProfileInfo } from '../../services/profilService';

const ProfileAdmin: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [infoSuccess, setInfoSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const data = await fetchProfileData();
        if (data) {
          setCurrentImageUrl(data.avatar);
          setName(data.name);
          setRole(data.role);
        }
      } catch (err) {
        console.error('Error loading profile data:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const handleImageUploaded = async (url: string) => {
    try {
      setError(null);
      setSuccess(null);
      
      const result = await updateProfileImage(url);
      
      if (result) {
        setSuccess('Profile image updated successfully!');
        setCurrentImageUrl(url);
      } else {
        setError('Failed to update profile image in database');
      }
    } catch (err) {
      console.error('Error updating profile image:', err);
      setError('An unexpected error occurred');
    }
  };

  const handleProfileInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setInfoError(null);
      setInfoSuccess(null);

      if (!name.trim()) {
        setInfoError('Name cannot be empty');
        return;
      }

      const result = await updateProfileInfo(name, role);
      
      if (result) {
        setInfoSuccess('Profile information updated successfully!');
      } else {
        setInfoError('Failed to update profile information');
      }
    } catch (err) {
      console.error('Error updating profile info:', err);
      setInfoError('An unexpected error occurred');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
        Manage Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card
          variant="glass"
          className="p-6"
        >
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
            Profile Image
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
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
            />
          )}
        </Card>

        <Card
          variant="glass"
          className="p-6"
        >
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
            Profile Information
          </h2>
          
          {infoError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {infoError}
            </div>
          )}

          {infoSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
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
                  className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  }`}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label 
                  htmlFor="role" 
                  className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                  }`}
                />
              </div>
              
              <button
                type="submit"
                className={`py-2 px-4 rounded transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Update Profile Info
              </button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfileAdmin;
