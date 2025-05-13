import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../../context/ThemeProvider';
import { fetchProfileData, updateProfileImage, updateProfileInfo, updateProfileBio, updateProfileQuickFacts } from '../../../../services/profilService';
import ProfileAdminView from './ProfileAdmin.view';

const ProfileAdmin: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [quickFacts, setQuickFacts] = useState<string[]>([]);
  const [newQuickFact, setNewQuickFact] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [infoSuccess, setInfoSuccess] = useState<string | null>(null);
  const [bioError, setBioError] = useState<string | null>(null);
  const [bioSuccess, setBioSuccess] = useState<string | null>(null);
  const [factsError, setFactsError] = useState<string | null>(null);
  const [factsSuccess, setFactsSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const data = await fetchProfileData();
        if (data) {
          setCurrentImageUrl(data.avatar);
          setName(data.name);
          setRole(data.role);
          setBio(data.bio.paragraphs.join('\n\n'));
          setQuickFacts(data.bio.quickFacts);
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

  const handleBioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setBioError(null);
      setBioSuccess(null);

      if (!bio.trim()) {
        setBioError('Bio cannot be empty');
        return;
      }

      const result = await updateProfileBio(bio);
      
      if (result) {
        setBioSuccess('Bio updated successfully!');
      } else {
        setBioError('Failed to update bio');
      }
    } catch (err) {
      console.error('Error updating bio:', err);
      setBioError('An unexpected error occurred');
    }
  };

  const handleAddQuickFact = () => {
    if (newQuickFact.trim()) {
      // Create a new array with the added fact to ensure state update
      const updatedFacts = [...quickFacts, newQuickFact.trim()];
      setQuickFacts(updatedFacts);
      setNewQuickFact('');
    }
  };

  const handleRemoveQuickFact = (index: number) => {
    // Create a new array without the removed fact
    const updatedFacts = quickFacts.filter((_, i) => i !== index);
    setQuickFacts(updatedFacts);
  };

  const handleQuickFactsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFactsError(null);
      setFactsSuccess(null);

      if (quickFacts.length === 0) {
        setFactsError('At least one quick fact is required');
        return;
      }

      console.log('Submitting quick facts:', quickFacts); // Debug log
      
      const result = await updateProfileQuickFacts(quickFacts);
      
      if (result) {
        setFactsSuccess('Quick facts updated successfully!');
      } else {
        setFactsError('Failed to update quick facts');
      }
    } catch (err) {
      console.error('Error updating quick facts:', err);
      setFactsError('An unexpected error occurred');
    }
  };

  return (
    <ProfileAdminView
      isDarkMode={isDarkMode}
      currentImageUrl={currentImageUrl}
      name={name}
      role={role}
      bio={bio}
      quickFacts={quickFacts}
      newQuickFact={newQuickFact}
      loading={loading}
      error={error}
      success={success}
      infoError={infoError}
      infoSuccess={infoSuccess}
      bioError={bioError}
      bioSuccess={bioSuccess}
      factsError={factsError}
      factsSuccess={factsSuccess}
      handleImageUploaded={handleImageUploaded}
      handleProfileInfoSubmit={handleProfileInfoSubmit}
      handleBioSubmit={handleBioSubmit}
      handleQuickFactsSubmit={handleQuickFactsSubmit}
      handleAddQuickFact={handleAddQuickFact}
      handleRemoveQuickFact={handleRemoveQuickFact}
      setName={setName}
      setRole={setRole}
      setBio={setBio}
      setNewQuickFact={setNewQuickFact}
    />
  );
};

export default ProfileAdmin;
