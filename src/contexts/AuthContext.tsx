
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  kyc_status: string;
  role: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.log('Profile fetch error:', error);
        // If profile doesn't exist, create a default one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating default profile');
          await createDefaultProfile(userId);
          return;
        }
        return;
      }

      console.log('Profile data:', data);
      setProfile(data);
    } catch (error) {
      console.log('Profile fetch error:', error);
    }
  };

  const createDefaultProfile = async (userId: string) => {
    try {
      const currentUser = await supabase.auth.getUser();
      const email = currentUser.data.user?.email;
      
      // Determine role based on email for demo accounts
      let role = 'client';
      let full_name = 'Cliente Demo';
      let kyc_status = 'approved';
      
      if (email === 'admin@ebridge.ee') {
        role = 'admin';
        full_name = 'Amministratore E-Bridge';
        kyc_status = 'approved';
      } else if (email === 'cliente@ebridge.ee') {
        role = 'client';
        full_name = 'Cliente Demo';
        kyc_status = 'approved';
      }

      console.log('Creating profile with:', { userId, role, full_name, kyc_status });

      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          id: userId,
          full_name: full_name,
          role: role,
          kyc_status: kyc_status
        }])
        .select()
        .single();

      if (error) {
        console.log('Error creating profile:', error);
        return;
      }

      console.log('Created profile:', data);
      setProfile(data);
    } catch (error) {
      console.log('Error creating default profile:', error);
    }
  };

  useEffect(() => {
    console.log('AuthProvider useEffect triggered');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
