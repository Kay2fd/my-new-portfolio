import React from 'react';
import { Card } from '../../../common';
import ImageUploader from '../../../common/ImageUploader/ImageUploader';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import type { Certificate } from '../../../../services/certificateServices';

interface CertificatesAdminViewProps {
  isDarkMode: boolean;
  certificates: Certificate[];
  loading: boolean;
  error: string | null;
  isEditing: boolean;
  currentCertificate: Certificate | null;
  title: string;
  issuer: string;
  description: string;
  imageUrl: string;
  formError: string | null;
  formSuccess: string | null;
  handleEdit: (certificate: Certificate) => void;
  handleDelete: (id: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleImageUploaded: (url: string) => void;
  resetForm: () => void;
  setTitle: (title: string) => void;
  setIssuer: (issuer: string) => void;
  setDescription: (description: string) => void;
}

const CertificatesAdminView: React.FC<CertificatesAdminViewProps> = ({
  isDarkMode,
  certificates,
  loading,
  error,
  isEditing,
  title,
  issuer,
  description,
  imageUrl,
  formError,
  formSuccess,
  handleEdit,
  handleDelete,
  handleSubmit,
  handleImageUploaded,
  resetForm,
  setTitle,
  setIssuer,
  setDescription,
}) => {
  return (
    <div className="w-full">
      <h1 className={`text-2xl md:text-3xl font-bold mb-4 md:mb-8 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
        Manage Certificates
      </h1>

      <div className="grid grid-cols-1 gap-4 md:gap-8">
        {/* Certificate Form */}
        <Card
          variant="glass"
          className="p-4 md:p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg md:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
              {isEditing ? 'Edit Certificate' : 'Add New Certificate'}
            </h2>
            {isEditing && (
              <button
                onClick={resetForm}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                aria-label="Cancel editing"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {formError && (
            <div className="mb-4 p-2 md:p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm md:text-base">
              {formError}
            </div>
          )}

          {formSuccess && (
            <div className="mb-4 p-2 md:p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm md:text-base">
              {formSuccess}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                }`}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="issuer"
                className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Issuer
              </label>
              <input
                id="issuer"
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                }`}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                }`}
                required
              />
            </div>

            <div className="mb-6">
              <label
                className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Certificate Image
              </label>
              <ImageUploader
                onImageUploaded={handleImageUploaded}
                currentImageUrl={imageUrl}
                bucketName="certificate-images"
                folderPath="public"
              />
            </div>

            <button
              type="submit"
              className={`w-full md:w-auto py-2 px-4 rounded transition-colors duration-300 text-sm md:text-base ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isEditing ? 'Update Certificate' : 'Add Certificate'}
            </button>
          </form>
        </Card>

        <Card
          variant="glass"
          className="p-4 md:p-6 mb-14"
        >
          <h2 className={`text-lg md:text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
            Certificates List
          </h2>

          {error && (
            <div className="mb-4 p-2 md:p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm md:text-base">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center p-4">Loading certificates...</div>
          ) : certificates.length === 0 ? (
            <div className={`text-center p-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No certificates found. Add your first certificate above.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-md shadow-md">
              <table className={`min-w-full divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                <thead className={isDarkMode ? 'bg-blue-800/20' : 'bg-blue-200'}>
                  <tr>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Image
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Title
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Issuer
                    </th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {certificates.map((certificate) => (
                    <tr key={certificate.id} className={isDarkMode ? 'bg-blue-800/10' : 'bg-blue-100'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-18 w-36 rounded overflow-hidden">
                          <img 
                            src={certificate.image_url} 
                            alt={certificate.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
                            }}
                          />
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {certificate.title}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {certificate.issuer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(certificate)}
                            className={`p-2 rounded transition-colors ${
                              isDarkMode 
                                ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/50' 
                                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            }`}
                            aria-label="Edit certificate"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(certificate.id)}
                            className={`p-2 rounded transition-colors ${
                              isDarkMode 
                                ? 'bg-red-900/30 text-red-300 hover:bg-red-800/50' 
                                : 'bg-red-100 text-red-600 hover:bg-red-200'
                            }`}
                            aria-label="Delete certificate"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CertificatesAdminView;
