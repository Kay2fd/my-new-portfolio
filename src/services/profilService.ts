import { supabase } from '../lib/supabase';
import type { ProfileInfo } from '../data/profile';

// Fetch profile data from Supabase
export const fetchProfileData = async (): Promise<ProfileInfo | null> => {
  try {
    // Ambil data dari tabel profile
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .single(); // Gunakan single() untuk mendapatkan satu baris

    if (error) {
      console.error('Error fetching profile data:', error);
      return null;
    }

    // Jika tidak ada data, kembalikan null
    if (!data) return null;

    // Konversi data dari database ke format ProfileInfo
    return {
      name: data.name || 'Dika Pangestu',
      role: data.role || 'Frontend Developer',
      avatar: data.avatar_url || '/path/to/profile-image.jpg',
      bio: {
        paragraphs: data.bio_paragraphs || [
          "Hello! I'm Dika Pangestu, a passionate Software Engineering student with a focus on frontend development.",
          "My journey in tech began with a curiosity about how websites work.",
          "As a student, I'm constantly learning and expanding my knowledge."
        ],
        quickFacts: data.bio_quick_facts || [
          "Currently in my final year of Software Engineering studies",
          "Working as a Frontend Developer Intern at a tech startup",
          "Passionate about creating intuitive user interfaces"
        ]
      },
      socialLinks: data.social_links || [
        {
          name: "GitHub",
          url: "https://github.com/Kay2fd",
          iconType: "github"
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/dika-pangestu/",
          iconType: "linkedin"
        },
        {
          name: "Email",
          url: "mailto:dikaphangestu@gmail.com",
          iconType: "email"
        }
      ],
      details: data.details || [
        {
          iconType: "school",
          text: "Software Engineering Student"
        },
        {
          iconType: "work",
          text: "Frontend Developer Intern"
        },
        {
          iconType: "location",
          text: "Malang, Indonesia"
        }
      ]
    };
  } catch (error) {
    console.error('Error in fetchProfileData service:', error);
    return null;
  }
};

// Update profile image
export const updateProfileImage = async (imageUrl: string): Promise<boolean> => {
  try {
    // Cek apakah profil sudah ada
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profile')
      .select('*')
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching existing profile:', fetchError);
      return false;
    }

    // Jika profil sudah ada, update avatar_url
    if (existingProfile) {
      const { error: updateError } = await supabase
        .from('profile')
        .update({ avatar_url: imageUrl })
        .eq('id', existingProfile.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        return false;
      }
    } else {
      // Jika profil belum ada, buat profil baru
      const { error: insertError } = await supabase
        .from('profile')
        .insert([
          { 
            name: 'Dika Pangestu', 
            role: 'Frontend Developer',
            avatar_url: imageUrl 
          }
        ]);

      if (insertError) {
        console.error('Error creating new profile:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in updateProfileImage service:', error);
    return false;
  }
};

// Update profile information (name and role)
export const updateProfileInfo = async (name: string, role: string): Promise<boolean> => {
  try {
    // Cek apakah profil sudah ada
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profile')
      .select('*')
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching existing profile:', fetchError);
      return false;
    }

    // Jika profil sudah ada, update name dan role
    if (existingProfile) {
      const { error: updateError } = await supabase
        .from('profile')
        .update({ name, role })
        .eq('id', existingProfile.id);

      if (updateError) {
        console.error('Error updating profile info:', updateError);
        return false;
      }
    } else {
      // Jika profil belum ada, buat profil baru
      const { error: insertError } = await supabase
        .from('profile')
        .insert([{ name, role }]);

      if (insertError) {
        console.error('Error creating new profile with info:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in updateProfileInfo service:', error);
    return false;
  }
};
