import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app"; // for emailProvider static object
import { auth, db, googleProvider } from "../firebase-configuration/firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const [addUserEmail, setAddUserEmail] = useState("");
  const history = useHistory();

  /**
   *
   * @param {string} email
   * captured email address stored in case user 'returns' to landing from survey component
   *
   */
  const setEmail = (email) => {
    setEmailAddress(email);
  };

  /**
   *
   * @param {string} email
   * @param {string} password
   * creates a firebase user with email and password - simultaneous authentication occurs
   *
   */
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  /**
   *
   * @param {string} email
   * adds new firebase user to Firestore db under 'users' collection with 'emailAddress: email' field
   *
   */
  const addUser = (email) => {
    const collectionName = "users";
    const data = {
      emailAddress: email,
    };

    db.collection(collectionName).add(data);
  };

  /**
   *
   * @param {string} email
   * @param {string} password
   * signs in a firebase user with email and password (authentication)
   *
   */
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  /**
   *
   * signs in a user using Google Signin with Redirect
   *
   */
  const googleSignIn = async () => {
    // return auth
    //   .signInWithRedirect(googleProvider)
    //   .catch((err) => console.log(err));

    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn({ prompt: "consent" });
    const profile = googleAuth.currentUser.get().getBasicProfile();

    const token = googleUser.getAuthResponse().id_token;

    const credential = firebase.auth.GoogleAuthProvider.credential(token);

    await auth.signInWithCredential(credential);

    await gapi.client.directory.members.insert(
      {
        groupKey: "free-tier-users@socioprophet.ai",
      },
      {
        email: profile.getEmail(),
      }
    );
  };

  const getSigninResult = () => {
    auth.getRedirectResult().then((result) => {
      if (result.credential) {
        // history.push("/alpha");
        console.log(result);
        const accessToken = result.credential.accessToken;
        const refreshToken = currentUser.refreshToken;
        const postData = async () => {
          const response = await fetch("/api/test/data", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accessToken: accessToken,
              refreshToken: refreshToken,
            }),
          });
          console.log(response);
        };
        postData();
      }
    });
  };

  /**
   *
   * signs out a authenticated firebase user
   *
   */
  const logout = () => {
    return auth.signOut();
  };

  /**
   *
   * sends a verification link to user for email address verification
   *
   */
  const emailVerification = () => {
    return currentUser.sendEmailVerification();
  };

  /**
   *
   * @param {string} actionCode
   * verifies user's email address by applying the oobCode in the verification link
   *
   */
  const applyVerificationCode = (actionCode) => {
    return auth.applyActionCode(actionCode);
  };

  /**
   *
   * @param {string} email
   * sends a reset password email to given user email address
   *
   */
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  /**
   *
   * @param {string} actionCode
   * @param {string} newPassword
   * verifies that the reset password code is valid and then updates new password with 'newPassword' param
   *
   */
  const verifyResetCode = (actionCode, newPassword) => {
    auth
      .verifyPasswordResetCode(actionCode)
      .then(() => {
        auth.confirmPasswordReset(actionCode, newPassword).then(() => {
          console.log("successful");
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   *
   * @param {string} email
   * updates stored firebase email for user - 'email' param is the new email address
   *
   */
  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  /**
   *
   * @param {string} password
   * uses Email Auth Provider to re-authenticate the current user for security sensitive operations (eg, password update, account deletion)
   *
   */
  const reAuth = (password) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    return currentUser.reauthenticateWithCredential(credential);
  };

  /**
   *
   * @param {string} password
   * updates the password of the current authenticated user
   *
   */
  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  /**
   *
   * deletes the current user from the Firestore db and then from Firebase Authentication
   */
  const deleteUser = () => {
    const userRef = db
      .collection("users")
      .where("emailAddress", "==", currentUser.email);

    userRef.get().then((userQuerySnapshot) => {
      userQuerySnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log(userData);
        doc.ref
          .delete()
          .then(() => {
            console.log("Successfully deleted...");
            currentUser.delete();
          })
          .catch((err) => {
            console.error(`Error deleting document: ${err}`);
          });
      });
    });
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
    currentUser,
    setEmail,
    signup,
    addUser,
    login,
    logout,
    googleSignIn,
    getSigninResult,
    resetPassword,
    verifyResetCode,
    emailVerification,
    applyVerificationCode,
    updateEmail,
    updatePassword,
    reAuth,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
