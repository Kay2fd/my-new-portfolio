import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../context/ThemeProvider';
import { FaUpload, FaSpinner, FaTrash, FaExclamationCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  bucketName: string;
  folderPath?: string;
  previewShape?: 'circle' | 'rectangle';
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUploaded,
  currentImageUrl = '',
  bucketName,
  folderPath = '',
  previewShape = 'rectangle'
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(currentImageUrl);
  const [imageLoaded, setImageLoaded] = useState(!!currentImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentImageUrl) {
      setPreview(currentImageUrl);
      setImageLoaded(true);
    }
  }, [currentImageUrl]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const files = event.target.files;
      if (!files || files.length === 0) {
        return;
      }

      const file = files[0];

      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (JPEG, PNG, etc.)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setImageLoaded(false);

      setUploading(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('User not authenticated');
        setError('You must be logged in to upload images');
        setUploading(false);
        return;
      }

      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        setError(`Error uploading image: ${uploadError.message || 'Unknown error'}`);
        setUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      onImageUploaded(publicUrl);
      setUploading(false);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('An unexpected error occurred while uploading the image');
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setPreview('');
    setImageLoaded(false);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
    setError('Failed to load image preview');
  };

  const previewContainerClasses = `mb-4 relative overflow-hidden shadow-lg ${
    previewShape === 'circle' 
      ? 'rounded-full aspect-square w-60 h-60 mx-auto' 
      : 'rounded-lg w-full max-w-md'
  }`;

  const imageObjectFit = previewShape === 'circle' ? 'object-cover' : 'object-contain';

  const containerStyle = previewShape === 'rectangle'
    ? { aspectRatio: '16/9' }
    : {};

  return (
    <div className="w-full">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm flex items-center"
          >
            <FaExclamationCircle className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center">
        <AnimatePresence>
          {preview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={previewContainerClasses}
              style={{
                ...containerStyle,
                backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.5)'
              }}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaSpinner className="animate-spin text-2xl text-gray-400" />
                </div>
              )}
              <img
                src={preview}
                alt="Preview"
                className={`w-full h-full ${imageObjectFit} transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className={`p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-md`}
                  aria-label="Remove image"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={uploading}
        />

        <button
          onClick={triggerFileInput}
          disabled={uploading}
          className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-all duration-300 ${isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/20'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30'
            } ${uploading ? 'opacity-70 cursor-not-allowed' : ''} shadow-lg hover:shadow-xl`}
          type="button"
        >
          {uploading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <FaUpload className="mr-2" />
              <span>{preview ? 'Change Image' : 'Upload Image'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
