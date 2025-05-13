import { supabase } from '../lib/supabase';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  description: string;
  image_url: string;
  created_at?: string;
}

export interface CertificateInput {
  title: string;
  issuer: string;
  description: string;
  image_url: string;
}

export const fetchCertificates = async (): Promise<Certificate[]> => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching certificates:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchCertificates service:', error);
    return [];
  }
};

export const createCertificate = async (certificate: CertificateInput): Promise<Certificate | null> => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .insert([certificate])
      .select()
      .single();

    if (error) {
      console.error('Error creating certificate:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createCertificate service:', error);
    return null;
  }
};

export const updateCertificate = async (id: string, certificate: CertificateInput): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('certificates')
      .update(certificate)
      .eq('id', id);

    if (error) {
      console.error('Error updating certificate:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateCertificate service:', error);
    return false;
  }
};

export const deleteCertificate = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting certificate:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteCertificate service:', error);
    return false;
  }
};

export const getCertificateById = async (id: string): Promise<Certificate | null> => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching certificate by ID:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getCertificateById service:', error);
    return null;
  }
};
