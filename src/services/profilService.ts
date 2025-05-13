import { supabase } from '../lib/supabase';
import type { ProfileInfo } from '../data/profile';

export const fetchProfileData = async (): Promise<ProfileInfo | null> => {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching profile data:', error);
      return null;
    }

    if (!data) return null;

    let quickFactsArray: string[] = [];
    if (data.quick_facts) {
      if (Array.isArray(data.quick_facts)) {
        quickFactsArray = data.quick_facts;
      } else {
        try {
          const parsed = JSON.parse(data.quick_facts);
          if (Array.isArray(parsed)) {
            quickFactsArray = parsed;
          }
        } catch (e) {
          console.error('Error parsing quick_facts:', e);
        }
      }
    }

    return {
      name: data.name || 'Dika Pangestu',
      role: data.role || 'Frontend Developer',
      avatar: data.avatar_url || '/path/to/profile-image.jpg',
      bio: {
        paragraphs: data.bio ? data.bio.split('\n\n') : [
          "Hello! I'm Dika Pangestu, a passionate Software Engineering student with a focus on frontend development.",
          "My journey in tech began with a curiosity about how websites work.",
          "As a student, I'm constantly learning and expanding my knowledge."
        ],
        quickFacts: quickFactsArray.length > 0 ? quickFactsArray : [
          "Currently in my final year of Software Engineering studies",
          "Working as a Frontend Developer Intern at a tech startup",
          "Passionate about creating intuitive user interfaces"
        ]
      },
      socialLinks: data.social_links || [
        {
          name: "GitHub",
          iconType: "github"
        },
        {
          name: "LinkedIn",
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

export const updateProfileImage = async (imageUrl: string): Promise<boolean> => {
  try {
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profile')
      .select('*')
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching existing profile:', fetchError);
      return false;
    }

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

export const updateProfileInfo = async (
  name: string,
  role: string,
  bio?: string
): Promise<boolean> => {
  try {
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profile')
      .select('*')
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching existing profile:', fetchError);
      return false;
    }

    const updateData: any = { name, role };
    if (bio !== undefined) {
      updateData.bio = bio;
    }

    if (existingProfile) {
      const { error: updateError } = await supabase
        .from('profile')
        .update(updateData)
        .eq('id', existingProfile.id);

      if (updateError) {
        console.error('Error updating profile info:', updateError);
        return false;
      }
    } else {
      const { error: insertError } = await supabase
        .from('profile')
        .insert([updateData]);

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

export const updateProfileBio = async (bio: string): Promise<boolean> => {
  try {
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profile')
      .select('*')
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching existing profile:', fetchError);
      return false;
    }

    if (existingProfile) {
      const { error: updateError } = await supabase
        .from('profile')
        .update({ bio })
        .eq('id', existingProfile.id);

      if (updateError) {
        console.error('Error updating profile bio:', updateError);
        return false;
      }
    } else {
      const { error: insertError } = await supabase
        .from('profile')
        .insert([{ bio }]);

      if (insertError) {
        console.error('Error creating new profile with bio:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in updateProfileBio service:', error);
    return false;
  }
};

export const updateProfileQuickFacts = async (quickFacts: string[]): Promise<boolean> => {
  try {
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profile')
      .select('*')
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching existing profile:', fetchError);
      return false;
    }

    if (existingProfile) {
      const { error: updateError } = await supabase
        .from('profile')
        .update({ quick_facts: quickFacts })
        .eq('id', existingProfile.id);

      if (updateError) {
        console.error('Error updating profile quick facts:', updateError);
        return false;
      }
    } else {
      const { error: insertError } = await supabase
        .from('profile')
        .insert([{ quick_facts: quickFacts }]);

      if (insertError) {
        console.error('Error creating new profile with quick facts:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in updateProfileQuickFacts service:', error);
    return false;
  }
};
