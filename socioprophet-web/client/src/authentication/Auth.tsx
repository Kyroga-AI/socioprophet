import React, { useEffect, useState } from 'react';
import { supabase } from '../authentication/supabase-config/supabase';
interface Props {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<any>(null);

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.onAuthStateChange((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
