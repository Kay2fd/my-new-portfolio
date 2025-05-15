import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../../context/ThemeProvider';
import {
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    deleteImage,
    type Project,
    type ProjectTag
} from '../../../../services/projectService';
import ProjectAdminView from './ProjectAdmin.view';

const ProjectAdmin: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);

    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [detailImages, setDetailImages] = useState<string[]>([]);
    const [repoUrl, setRepoUrl] = useState('');
    const [demoUrl, setDemoUrl] = useState('');

    const [tags, setTags] = useState<ProjectTag[]>([]);
    const [tagName, setTagName] = useState('');
    const [tagColor, setTagColor] = useState('#3B82F6');

    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);
            const data = await fetchProjects();
            setProjects(data);
        } catch (err) {
            console.error('Error loading projects:', err);
            setError('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setShortDescription('');
        setDescription('');
        setThumbnailUrl('');
        setDetailImages([]);
        setRepoUrl('');
        setDemoUrl('');
        setTags([]);
        setTagName('');
        setTagColor('#3B82F6');
        setCurrentProject(null);
        setIsEditing(false);
        setFormError(null);
        setFormSuccess(null);
    };

    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setTitle(project.title);
        setShortDescription(project.short_description);
        setDescription(project.description);
        setThumbnailUrl(project.thumbnail_image_url);
        setDetailImages(project.detail_images || []);
        setRepoUrl(project.repo_url || '');
        setDemoUrl(project.demo_url || '');
        setTags(project.tags || []);
        setIsEditing(true);
        setFormError(null);
        setFormSuccess(null);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            try {
                const success = await deleteProject(id);
                if (success) {
                    setProjects(projects.filter(proj => proj.id !== id));
                    setFormSuccess('Project deleted successfully!');
                } else {
                    setError('Failed to delete project');
                }
            } catch (err) {
                console.error('Error deleting project:', err);
                setError('An unexpected error occurred');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setFormSuccess(null);

        if (!title.trim() || !shortDescription.trim() || !description.trim() || !thumbnailUrl.trim()) {
            setFormError('Title, short description, description, and thumbnail image are required');
            return;
        }

        if (tags.length === 0) {
            setFormError('At least one tag is required');
            return;
        }

        try {
            const projectData: any = {
                title,
                short_description: shortDescription,
                description,
                thumbnail_image_url: thumbnailUrl,
                detail_images: detailImages,
                tags,
            };

            if (repoUrl.trim()) {
                projectData.repo_url = repoUrl.trim();
            }
            if (demoUrl.trim()) {
                projectData.demo_url = demoUrl.trim();
            }

            if (isEditing && currentProject) {
                if (!repoUrl.trim()) {
                    projectData.repo_url = null;
                }
                if (!demoUrl.trim()) {
                    projectData.demo_url = null;
                }

                const success = await updateProject(currentProject.id, projectData);

                if (success) {
                    setFormSuccess('Project updated successfully!');
                    setProjects(projects.map(proj =>
                        proj.id === currentProject.id
                            ? { ...proj, ...projectData }
                            : proj
                    ));
                    resetForm();
                } else {
                    setFormError('Failed to update project');
                }
            } else {
                const newProject = await createProject(projectData);

                if (newProject) {
                    setFormSuccess('Project created successfully!');
                    setProjects([newProject, ...projects]);
                    resetForm();
                } else {
                    setFormError('Failed to create project');
                }
            }
        } catch (err) {
            console.error('Error saving project:', err);
            setFormError('An unexpected error occurred');
        }
    };

    const handleThumbnailUploaded = (url: string) => {
        setThumbnailUrl(url);
    };

    const handleDetailImageUploaded = (url: string) => {
        setDetailImages([...detailImages, url]);
    };

    const handleRemoveDetailImage = async (url: string, index: number) => {
        try {
            setUploadingImage(true);

            const isUsedElsewhere = projects.some(project => {
                if (isEditing && currentProject && project.id === currentProject.id) {
                    return false;
                }

                if (project.thumbnail_image_url === url) {
                    return true;
                }

                return project.detail_images?.includes(url) || false;
            });

            if (!isUsedElsewhere) {
                await deleteImage(url);
            }

            const newDetailImages = [...detailImages];
            newDetailImages.splice(index, 1);
            setDetailImages(newDetailImages);
        } catch (error) {
            console.error('Error removing detail image:', error);
            setFormError('Failed to remove image');
        } finally {
            setUploadingImage(false);
        }
    };

    const addTag = () => {
        if (!tagName.trim()) {
            setFormError('Tag name is required');
            return;
        }

        if (tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())) {
            setFormError('Tag already exists');
            return;
        }

        const newTag: ProjectTag = {
            name: tagName.trim(),
            color: tagColor
        };

        setTags([...tags, newTag]);
        setTagName('');
        setTagColor('#3B82F6');
        setFormError(null);
    };

    const removeTag = (index: number) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    return (
        <ProjectAdminView
            isDarkMode={isDarkMode}
            projects={projects}
            loading={loading}
            error={error}
            isEditing={isEditing}
            currentProject={currentProject}
            title={title}
            shortDescription={shortDescription}
            description={description}
            thumbnailUrl={thumbnailUrl}
            detailImages={detailImages}
            repoUrl={repoUrl}
            demoUrl={demoUrl}
            tags={tags}
            tagName={tagName}
            tagColor={tagColor}
            formError={formError}
            formSuccess={formSuccess}
            uploadingImage={uploadingImage}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleSubmit={handleSubmit}
            handleThumbnailUploaded={handleThumbnailUploaded}
            handleDetailImageUploaded={handleDetailImageUploaded}
            handleRemoveDetailImage={handleRemoveDetailImage}
            addTag={addTag}
            removeTag={removeTag}
            resetForm={resetForm}
            setTitle={setTitle}
            setShortDescription={setShortDescription}
            setDescription={setDescription}
            setRepoUrl={setRepoUrl}
            setDemoUrl={setDemoUrl}
            setTagName={setTagName}
            setTagColor={setTagColor}
        />
    );
};

export default ProjectAdmin;
