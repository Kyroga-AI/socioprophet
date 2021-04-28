import React, { useEffect, useState } from 'react';
import app from './firebase-configuration/firebase';
import firebase from 'firebase/app'; // for emailProvider static object

interface Props {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<any>(null);

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
