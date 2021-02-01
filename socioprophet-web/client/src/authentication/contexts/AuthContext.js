import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth, googleProvider } from "../firebase-configuration/firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [surveyResponse, setSurveyResponse] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  // Google Auth...
  const googleSignIn = () => {
    return auth.signInWithRedirect(googleProvider);
  };

  const getGoogleResult = () => {
    return auth.getRedirectResult().then((result) => {});
  };

  const emailVerification = () => {
    return currentUser.sendEmailVerification();
  };

  const applyVerificationCode = (actionCode) => {
    return auth.applyActionCode(actionCode);
  };

  const surveyResponseCompleted = () => {
    setSurveyResponse(true);
  };
  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    surveyResponse,
    signup,
    login,
    logout,
    resetPassword,
    googleSignIn,
    getGoogleResult,
    emailVerification,
    applyVerificationCode,
    surveyResponseCompleted,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
