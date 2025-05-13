import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../context/ThemeProvider';
import { FaUpload, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthProvider';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  bucketName?: string;
  folderPath?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUploaded,
  currentImageUrl = '',
  bucketName = 'profile-images',
  folderPath = 'public'
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(currentImageUrl);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Auth session:", data.session ? "Logged in" : "Not logged in");
    };
    
    checkAuth();
  }, []);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setUploading(true);

      if (!isAuthenticated) {
        setError('You must be logged in to upload images');
        return;
      }

      if (!event.target.files || event.target.files.length === 0) {
        setError('You must select an image to upload.');
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${folderPath}/${fileName}`;

      console.log(`Uploading file: ${filePath}`);

      const { data: sessionData } = await supabase.auth.getSession();
      console.log("Current session:", sessionData.session ? "Active" : "None");

      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error details:", uploadError);
        throw uploadError;
      }

      console.log('Upload successful, data:', data);

      const { data: urlData } = await supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      console.log('Public URL:', urlData.publicUrl);
      
      setPreview(urlData.publicUrl);
      
      onImageUploaded(urlData.publicUrl);
      
      console.log('Profile avatar updated in database');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setError(error.message || 'Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'}`}>
        You must be logged in to upload images.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {preview && (
        <div className="mb-4">
          <div className={`w-48 h-48 rounded-full overflow-hidden mx-auto border-4 ${isDarkMode ? 'border-blue-500/30' : 'border-blue-200'}`}>
            <img
              src={preview}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <label
        className={`flex flex-col items-center px-4 py-6 rounded-lg cursor-pointer ${
          isDarkMode
            ? 'bg-blue-900/30 hover:bg-blue-800/50 border border-blue-800/50'
            : 'bg-blue-50 hover:bg-blue-100 border border-blue-200'
        }`}
      >
        <div className="flex flex-col items-center">
          {uploading ? (
            <FaSpinner className={`w-8 h-8 mb-2 animate-spin ${isDarkMode ? 'text-blue-300' : 'text-blue-500'}`} />
          ) : (
            <FaUpload className={`w-8 h-8 mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'}`} />
          )}
          <span className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
            {uploading ? 'Uploading...' : 'Select an image to upload'}
          </span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
        />
      </label>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
