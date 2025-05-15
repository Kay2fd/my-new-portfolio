import React from 'react';
import { Card, Button } from '../../../common';
import ImageUploader from '../../../common/ImageUploader/ImageUploader';
import { FaEdit, FaTrash, FaTimes, FaPlus, FaTags } from 'react-icons/fa';
import type { Project, ProjectTag } from '../../../../services/projectService';

interface ProjectAdminViewProps {
    isDarkMode: boolean;
    projects: Project[];
    loading: boolean;
    error: string | null;
    isEditing: boolean;
    currentProject: Project | null;
    title: string;
    shortDescription: string;
    description: string;
    thumbnailUrl: string;
    detailImages: string[];
    repoUrl: string;
    demoUrl: string;
    tags: ProjectTag[];
    tagName: string;
    tagColor: string;
    formError: string | null;
    formSuccess: string | null;
    uploadingImage: boolean;
    handleEdit: (project: Project) => void;
    handleDelete: (id: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleThumbnailUploaded: (url: string) => void;
    handleDetailImageUploaded: (url: string) => void;
    handleRemoveDetailImage: (url: string, index: number) => Promise<void>;
    addTag: () => void;
    removeTag: (index: number) => void;
    resetForm: () => void;
    setTitle: (title: string) => void;
    setShortDescription: (shortDescription: string) => void;
    setDescription: (description: string) => void;
    setRepoUrl: (repoUrl: string) => void;
    setDemoUrl: (demoUrl: string) => void;
    setTagName: (tagName: string) => void;
    setTagColor: (tagColor: string) => void;
}

const ProjectAdminView: React.FC<ProjectAdminViewProps> = ({
    isDarkMode,
    projects,
    loading,
    error,
    isEditing,
    title,
    shortDescription,
    description,
    thumbnailUrl,
    detailImages,
    repoUrl,
    demoUrl,
    tags,
    tagName,
    tagColor,
    formError,
    formSuccess,
    uploadingImage,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleThumbnailUploaded,
    handleDetailImageUploaded,
    handleRemoveDetailImage,
    addTag,
    removeTag,
    resetForm,
    setTitle,
    setShortDescription,
    setDescription,
    setRepoUrl,
    setDemoUrl,
    setTagName,
    setTagColor,
}) => {
    return (
        <div className="w-full">
            <h1 className={`text-2xl md:text-3xl font-bold mb-4 md:mb-8 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                Manage Projects
            </h1>

            <div className="grid grid-cols-1 gap-4 md:gap-8">
                <Card
                    variant="glass"
                    className="p-4 md:p-6 mb-6"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={`text-lg md:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                            {isEditing ? 'Edit Project' : 'Add New Project'}
                        </h2>
                        {isEditing && (
                            <Button
                                variant="text"
                                size="sm"
                                onClick={resetForm}
                                className="rounded-full"
                                aria-label="Cancel editing"
                            >
                                <FaTimes />
                            </Button>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label
                                    htmlFor="title"
                                    className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Title*
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`w-full p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${isDarkMode
                                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                                        }`}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="shortDescription"
                                    className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Short Description*
                                </label>
                                <input
                                    id="shortDescription"
                                    type="text"
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    className={`w-full p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${isDarkMode
                                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                                        }`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Full Description*
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${isDarkMode
                                    ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                                    }`}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label
                                    htmlFor="repoUrl"
                                    className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Repository URL (optional)
                                </label>
                                <div className="relative">
                                    <input
                                        id="repoUrl"
                                        type="url"
                                        value={repoUrl}
                                        onChange={(e) => setRepoUrl(e.target.value)}
                                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${isDarkMode
                                            ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                                        }`}
                                        placeholder="https://github.com/username/repo"
                                    />
                                    {repoUrl && (
                                        <button
                                            type="button"
                                            onClick={() => setRepoUrl('')}
                                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ${
                                                isDarkMode 
                                                    ? 'bg-red-900/30 text-red-300 hover:bg-red-800/50' 
                                                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                                            }`}
                                            title="Clear repository URL"
                                        >
                                            <FaTimes size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="demoUrl"
                                    className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Demo URL (optional)
                                </label>
                                <div className="relative">
                                    <input
                                        id="demoUrl"
                                        type="url"
                                        value={demoUrl}
                                        onChange={(e) => setDemoUrl(e.target.value)}
                                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 text-sm md:text-base ${isDarkMode
                                            ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                                        }`}
                                        placeholder="https://example.com"
                                    />
                                    {demoUrl && (
                                        <button
                                            type="button"
                                            onClick={() => setDemoUrl('')}
                                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ${
                                                isDarkMode 
                                                    ? 'bg-red-900/30 text-red-300 hover:bg-red-800/50' 
                                                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                                            }`}
                                            title="Clear demo URL"
                                        >
                                            <FaTimes size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <h3 className={`text-base md:text-lg font-medium mb-3 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    <FaTags className="mr-2" /> Project Tags*
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                                            style={{
                                                backgroundColor: isDarkMode ? `${tag.color}30` : `${tag.color}20`,
                                                color: tag.color
                                            }}
                                        >
                                            {tag.name}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="ml-2 focus:outline-none"
                                                aria-label={`Remove ${tag.name} tag`}
                                            >
                                                <FaTimes size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    {tags.length === 0 && (
                                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            No tags added yet. Add at least one tag.
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        value={tagName}
                                        onChange={(e) => setTagName(e.target.value)}
                                        placeholder="Add a tag (e.g., React, TypeScript)"
                                        className={`flex-1 p-2 border rounded focus:outline-none focus:ring-2 text-sm ${isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                                            }`}
                                    />

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={tagColor}
                                            onChange={(e) => setTagColor(e.target.value)}
                                            className="w-10 h-10 rounded cursor-pointer"
                                            title="Choose tag color"
                                        />

                                        <Button
                                            type="button"
                                            variant="primary"
                                            size="sm"
                                            onClick={addTag}
                                        >
                                            <FaPlus className="inline mr-1" /> Add Tag
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label
                                className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Thumbnail Image*
                            </label>
                            <ImageUploader
                                onImageUploaded={handleThumbnailUploaded}
                                currentImageUrl={thumbnailUrl}
                                bucketName="project-images"
                                folderPath="thumbnails"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                className={`block mb-1 md:mb-2 text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Detail Images (optional)
                            </label>

                            {detailImages.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                                    {detailImages.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={img}
                                                alt={`Detail ${index + 1}`}
                                                className="w-full h-32 object-cover rounded"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveDetailImage(img, index)}
                                                disabled={uploadingImage}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-label="Remove image"
                                            >
                                                <FaTimes size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <ImageUploader
                                onImageUploaded={handleDetailImageUploaded}
                                bucketName="project-images"
                                folderPath="details"
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            disabled={uploadingImage}
                            fullWidth={true}
                            className="md:w-auto"
                        >
                            {isEditing ? 'Update Project' : 'Add Project'}
                        </Button>
                    </form>
                </Card>

                <Card
                    variant="glass"
                    className="p-4 md:p-6 mb-14"
                >
                    <h2 className={`text-lg md:text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                        Projects List
                    </h2>

                    {error && (
                        <div className="mb-4 p-2 md:p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm md:text-base">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center p-4">Loading projects...</div>
                    ) : projects.length === 0 ? (
                        <div className={`text-center p-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            No projects found. Add your first project above.
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-md shadow-md">
                            <table className={`min-w-full divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                <thead className={isDarkMode ? 'bg-blue-800/20' : 'bg-blue-200'}>
                                    <tr>
                                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                            Thumbnail
                                        </th>
                                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                            Title
                                        </th>
                                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                            Tags
                                        </th>
                                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'}`}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                    {projects.map((project) => (
                                        <tr key={project.id} className={isDarkMode ? 'bg-blue-800/10' : 'bg-blue-100'}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-16 w-24 rounded overflow-hidden">
                                                    <img
                                                        src={project.thumbnail_image_url}
                                                        alt={project.title}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {project.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {project.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs"
                                                            style={{
                                                                backgroundColor: isDarkMode ? `${tag.color}30` : `${tag.color}20`,
                                                                color: tag.color
                                                            }}
                                                        >
                                                            {tag.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="text"
                                                        size="sm"
                                                        onClick={() => handleEdit(project)}
                                                        className={isDarkMode
                                                            ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/50'
                                                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                        }
                                                        aria-label="Edit project"
                                                    >
                                                        <FaEdit size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="text"
                                                        size="sm"
                                                        onClick={() => handleDelete(project.id)}
                                                        className={isDarkMode
                                                            ? 'bg-red-900/30 text-red-300 hover:bg-red-800/50'
                                                            : 'bg-red-100 text-red-600 hover:bg-red-200'
                                                        }
                                                        aria-label="Delete project"
                                                    >
                                                        <FaTrash size={16} />
                                                    </Button>
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

export default ProjectAdminView;
