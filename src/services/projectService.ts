import { supabase } from '../lib/supabase';

export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  short_description: string;
  description: string;
  thumbnail_image_url: string;
  detail_images?: string[];
  tags: ProjectTag[];
  repo_url?: string;
  demo_url?: string;
  created_at?: string;
}

export interface ProjectInput {
  title: string;
  short_description: string;
  description: string;
  thumbnail_image_url: string;
  detail_images?: string[];
  tags: ProjectTag[];
  repo_url?: string;
  demo_url?: string;
}

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchProjects service:', error);
    return [];
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching project by ID:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getProjectById service:', error);
    return null;
  }
};

export const createProject = async (project: ProjectInput): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createProject service:', error);
    return null;
  }
};

export const updateProject = async (id: string, project: ProjectInput): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id);

    if (error) {
      console.error('Error updating project:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateProject service:', error);
    return false;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteProject service:', error);
    return false;
  }
};

export const uploadThumbnailImage = async (file: File): Promise<string | null> => {
  return uploadImage(file, 'thumbnails');
};

export const uploadDetailImage = async (file: File): Promise<string | null> => {
  return uploadImage(file, 'details');
};

const uploadImage = async (file: File, folderPath: string): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${folderPath}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: urlData } = await supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export const deleteImage = async (url: string): Promise<boolean> => {
  try {
    // Extract the path from the URL
    // Example URL: https://xxxx.supabase.co/storage/v1/object/public/project-images/thumbnails/123.jpg
    const urlParts = url.split('/project-images/');
    if (urlParts.length < 2) {
      console.error('Invalid image URL format');
      return false;
    }
    
    const path = urlParts[1]; // e.g., "thumbnails/123.jpg"
    
    const { error } = await supabase.storage
      .from('project-images')
      .remove([path]);

    if (error) {
      console.error('Error deleting image from storage:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteImage service:', error);
    return false;
  }
};