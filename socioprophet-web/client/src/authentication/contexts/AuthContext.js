import React, { useState, useContext, useEffect } from "react";
import { auth, db, googleProvider } from "../firebase-configuration/firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [documentId, setDocumentId] = useState(1234);
  const [loading, setLoading] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");

  const setEmail = (email) => {
    setEmailAddress(email);
  };

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const addUser = (email) => {
    const collectionName = "users";
    const data = {
      emailAddress: email,
      surveyCompleted: false,
    };

    db.collection(collectionName)
      .add(data)
      .then((doc) => {
        console.log(doc.id);
        setDocumentId(doc.id);
      });
  };

  const checkForUserDocument = (docId, password) => {
    const usersRef = db.collection("users").doc(docId);

    usersRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        const userData = docSnapshot.data();

        return auth.signInWithEmailAndPassword(userData.emailAddress, password);
      }
    });
  };

  const updateUserSurveyCompleted = (docId) => {
    db.collection("users").doc(docId).update({
      surveyCompleted: true,
    });
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

  const googleSignIn = () => {
    return auth.signInWithRedirect(googleProvider);
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
    emailAddress,
    setEmail,
    currentUser,
    documentId,
    signup,
    addUser,
    checkForUserDocument,
    updateUserSurveyCompleted,
    login,
    logout,
    resetPassword,
    googleSignIn,
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
