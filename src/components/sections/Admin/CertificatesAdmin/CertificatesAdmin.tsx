import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../../context/ThemeProvider';
import {
  fetchCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  type Certificate
} from '../../../../services/certificateServices';
import CertificatesAdminView from './CertificatesAdmin.view';

const CertificatesAdmin: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState<Certificate | null>(null);

  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const data = await fetchCertificates();
      setCertificates(data);
    } catch (err) {
      console.error('Error loading certificates:', err);
      setError('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setIssuer('');
    setDescription('');
    setImageUrl('');
    setCurrentCertificate(null);
    setIsEditing(false);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleEdit = (certificate: Certificate) => {
    setCurrentCertificate(certificate);
    setTitle(certificate.title);
    setIssuer(certificate.issuer);
    setDescription(certificate.description);
    setImageUrl(certificate.image_url);
    setIsEditing(true);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        const success = await deleteCertificate(id);
        if (success) {
          setCertificates(certificates.filter(cert => cert.id !== id));
        } else {
          setError('Failed to delete certificate');
        }
      } catch (err) {
        console.error('Error deleting certificate:', err);
        setError('An unexpected error occurred');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!title.trim() || !issuer.trim() || !description.trim() || !imageUrl.trim()) {
      setFormError('All fields are required');
      return;
    }

    try {
      if (isEditing && currentCertificate) {
        const success = await updateCertificate(currentCertificate.id, {
          title,
          issuer,
          description,
          image_url: imageUrl
        });

        if (success) {
          setFormSuccess('Certificate updated successfully!');
          setCertificates(certificates.map(cert =>
            cert.id === currentCertificate.id
              ? { ...cert, title, issuer, description, image_url: imageUrl }
              : cert
          ));
          resetForm();
        } else {
          setFormError('Failed to update certificate');
        }
      } else {
        const newCertificate = await createCertificate({
          title,
          issuer,
          description,
          image_url: imageUrl
        });

        if (newCertificate) {
          setFormSuccess('Certificate created successfully!');
          setCertificates([newCertificate, ...certificates]);
          resetForm();
        } else {
          setFormError('Failed to create certificate');
        }
      }
    } catch (err) {
      console.error('Error saving certificate:', err);
      setFormError('An unexpected error occurred');
    }
  };

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
  };

  return (
    <CertificatesAdminView
      isDarkMode={isDarkMode}
      certificates={certificates}
      loading={loading}
      error={error}
      isEditing={isEditing}
      currentCertificate={currentCertificate}
      title={title}
      issuer={issuer}
      description={description}
      imageUrl={imageUrl}
      formError={formError}
      formSuccess={formSuccess}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
      handleImageUploaded={handleImageUploaded}
      resetForm={resetForm}
      setTitle={setTitle}
      setIssuer={setIssuer}
      setDescription={setDescription}
    />
  );
};

export default CertificatesAdmin;
