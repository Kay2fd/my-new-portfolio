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