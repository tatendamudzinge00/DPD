import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'analyst' | 'sector-lead';
  sector: 'government' | 'banking' | 'private' | 'education' | 'industrial' | 'telecoms' | 'health' | 'energy' | 'transport' | 'media' | 'zchpc';
  is_active: boolean;
}

// Mock user and profile data
const mockUser = {
  id: 'mock-user-id',
  email: 'admin@dashboard.com',
  user_metadata: {},
  app_metadata: {},
  aud: 'authenticated',
  role: 'authenticated',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
} as User;

const mockProfile: UserProfile = {
  id: 'mock-profile-id',
  user_id: 'mock-user-id',
  email: 'admin@dashboard.com',
  full_name: 'Dashboard Admin',
  role: 'admin',
  sector: 'government',
  is_active: true,
};

const mockSession = {
  access_token: 'mock-token',
  token_type: 'bearer',
  expires_in: 3600,
  expires_at: Date.now() + 3600000,
  refresh_token: 'mock-refresh',
  user: mockUser,
} as Session;

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading then set mock data
    const timer = setTimeout(() => {
      setUser(mockUser);
      setSession(mockSession);
      setProfile(mockProfile);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // These functions are kept for compatibility but do nothing
  const signIn = async (email: string, password: string) => {
    return { data: null, error: null };
  };

  const signUp = async (email: string, password: string) => {
    return { data: null, error: null };
  };

  const signOut = async () => {
    return { error: null };
  };

  const resetPassword = async (email: string) => {
    return { error: null };
  };

  return {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
}
