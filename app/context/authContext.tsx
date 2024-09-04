'use client';
import { useContext, createContext, useState, useEffect } from 'react';

import { createClient } from '@/utils/supabase/client';
import { Session } from 'next-auth';

type AuthContextType = {
  currentUser: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    group: string;
    avatar_url: string;
  };
};

const AuthContext = createContext<AuthContextType | any>(null);
export const AuthProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<
    AuthContextType['currentUser'] | any
  >(null);
  const [authSession, setAuthSession] = useState<Session | null | undefined>(
    null
  );

  const supabase = createClient();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setAuthSession(session);
    });
  }, []);
  useEffect(() => {
    const user = async () => {
      if (authSession) {
        const { data: userData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authSession?.user?.id)
          .single();
        setCurrentUser(userData);
      }
    };
    user();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
