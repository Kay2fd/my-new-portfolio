import { supabaseAdmin } from '../lib/supabaseAdmin';

export async function updateProfileImageAsAdmin(imageUrl: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('profile')
      .update({ avatar_url: imageUrl })
      .eq('id', 1);

    if (error) {
      console.error('Error updating profile image as admin:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in updateProfileImageAsAdmin service:', error);
    return false;
  }
}

export async function updateProfileInfoAsAdmin(
  name: string,
  role: string,
  bio?: string
): Promise<boolean> {
  try {
    const updateData: any = { name, role };
    if (bio !== undefined) {
      updateData.bio = bio;
    }

    const { error } = await supabaseAdmin
      .from('profile')
      .update(updateData)
      .eq('id', 1);

    if (error) {
      console.error('Error updating profile info as admin:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in updateProfileInfoAsAdmin service:', error);
    return false;
  }
}

export async function updateProfileBioAsAdmin(bio: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('profile')
      .update({ bio })
      .eq('id', 1);

    if (error) {
      console.error('Error updating profile bio as admin:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in updateProfileBioAsAdmin service:', error);
    return false;
  }
}

export async function updateProfileQuickFactsAsAdmin(quickFacts: string[]): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('profile')
      .update({ quick_facts: quickFacts })
      .eq('id', 1);

    if (error) {
      console.error('Error updating profile quick facts as admin:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in updateProfileQuickFactsAsAdmin service:', error);
    return false;
  }
}
