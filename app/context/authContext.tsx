'use client';
import {
  useContext,
  createContext,
  useState,
  useEffect,
  SetStateAction,
} from 'react';
import Cookies from 'js-cookie';
import { firebaseAuth } from '@/firebase/client';
import { createClient } from '@/utils/supabase/client';
import { fetchUser } from '@/utils/supabase/actions';
import { Session, User } from '@supabase/supabase-js';

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

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<
    AuthContextType['currentUser'] | null
  >(null);
  const [group, setGroup] = useState('');

  const supabase = createClient();

  useEffect(() => {
    const user = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session) {
        const { data: userData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data?.session?.user?.id)
          .single();
        setCurrentUser(userData || null);
        setGroup(userData?.group);
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
