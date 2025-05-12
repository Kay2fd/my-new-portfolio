import { supabase } from '../lib/supabase';

export interface AuthResponse {
  success: boolean;
  error?: any;
  user?: any;
}

export async function loginWithEmail(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Login error:', error);
      return { success: false, error };
    }
    
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Unexpected login error:', error);
    return { success: false, error };
  }
}

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    
    if (error) {
      console.error('Signup error:', error);
      return { success: false, error };
    }
    
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Unexpected signup error:', error);
    return { success: false, error };
  }
}

export async function logout(): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Logout error:', error);
      return { success: false, error };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Unexpected logout error:', error);
    return { success: false, error };
  }
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function isAuthenticated(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}