import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app'; // for emailProvider static object
import { auth, db, googleProvider, githubProvider } from '../firebase-configuration/firebase';

interface Props {
  children: React.ReactNode;
}
const AuthContext = React.createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Props) => {
  // states
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [emailAddress, setEmailAddress] = useState<string>('');
  // router hook
  const history = useHistory();

  /**
   *
   * @param {string} email
   * captured email address stored in case user 'returns' to landing from survey component
   *
   */
  const setEmail = (email: string): void => {
    setEmailAddress(email);
  };

  /**
   *
   *  signs in user with email link authentication -> then call checkSurveyCompletion function
   *
   */
  const signinUser = () => {
    // check for url details from emailed link
    if (auth.isSignInWithEmailLink(window.location.href)) {
      // check email in link matches local storage (ensure same device sign in)
      let email = window.localStorage.getItem('signin_email');
      // get user to re-enter email if different device
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }

      // use link code to authenticate user
      auth.signInWithEmailLink(email, window.location.href).then((result) => {
        window.localStorage.removeItem('signin_email');

        // check for a new user sign up
        if (result.additionalUserInfo.isNewUser) {
          // add user to firestore
          addUser(email, 'email');
          // user won't have completed survey at this point, but this function will
          // direct them accordingly
          checkSurveyCompletion(email, false);
        } else {
          // check if existing user has completed the survey
          checkSurveyCompletion(email, false);
        }
      });
    }
  };

  /**
   *
   *  @param {string} email
   *  @param {string} emailQuery
   *  @param {boolean} fromDashboard
   *  checks if currently authenticated user has completed the survey or not
   *
   */
  const checkSurveyCompletion = async (email: string, fromDashboard: boolean) => {
    // create doc reference from firestore collection
    const userRef = db.collection('users');
    const snapshot = await userRef.where('emailAddress', '==', email).get();
    if (snapshot.empty) {
      console.log('No matching documents found');
    }
    snapshot.forEach((doc) => {
      // if user has not completed survey -> set email to local storage for an id check
      // send user to protected survey route
      if (!doc.data().survey) {
        let r = Math.random().toString(36).substring(7);
        window.localStorage.setItem('id', r);
        window.location.href = `/get-started?id=${r}&via=site_signup`;
      } else {
        // in this case, user has completed survey, remove email from local storage
        window.localStorage.removeItem('id');
        if (!fromDashboard) {
          window.location.href = '/alpha';
        }
      }
    });
  };

  /**
   *
   *  @param {string} email
   *  updates the survey field in user document to 'true'
   *
   */
  const updateSurveyCompleted = async (email: string) => {
    const userRef = db.collection('users');

    const snapshot = await userRef.where('emailAddress', '==', email).get();
    if (snapshot.empty) {
      console.log('No matching documents found');
    }
    // update survey completion to true
    snapshot.forEach((doc) => {
      doc.ref.update({ survey: true });
    });
  };
  /**
   *
   * @param {string} email
   * @param {string} password
   * creates a firebase user with email and password - simultaneous authentication occurs
   *
   */
  const signup = (
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential | void> => {
    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
      console.log(result);
      emailVerification(result.user);
    });
  };

  /**
   *
   * @param {string} email
   * adds new firebase user to Firestore db under 'users' collection with 'emailAddress: email' field
   *
   */
  const addUser = async (email: string, method: string): Promise<void> => {
    const collectionName = 'users';
    const data = {
      emailAddress: email,
      survey: false,
      method: method,
    };

    await db.collection(collectionName).add(data);
  };

  /**
   *
   * @param {string} email
   * @param {string} password
   * signs in a firebase user with email and password (authentication)
   *
   */
  const login = (email: string, password: string): Promise<firebase.auth.UserCredential> => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  /**
   *
   * signs in a user using Google Signin with Redirect
   *
   */
  const googleSignIn = async (): Promise<void> => {
    return auth
      .signInWithRedirect(googleProvider)
      .catch((err) => console.log(`There was an error signing in: ${err}`));

    // const googleAuth = gapi.auth2.getAuthInstance();
    // const googleUser = await googleAuth.signIn();
    // const profile = googleAuth.currentUser.get().getBasicProfile();
    // const token = googleUser.getAuthResponse().id_token;
    // const credential = firebase.auth.GoogleAuthProvider.credential(token);
    // await auth.signInWithCredential(credential);
    // await gapi.client.directory.members.insert(
    //   {
    //     groupKey: "free-tier-users@socioprophet.ai",
    //   },
    //   {
    //     email: profile.getEmail(),
    //   }
    // );
  };

  const githubSignIn = (): Promise<void> => {
    return auth
      .signInWithRedirect(githubProvider)
      .catch((err) => console.log(`There was an error signing in: ${err}`));
  };

  const getSigninResult = async (): Promise<void> => {
    auth
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          if (result.additionalUserInfo.isNewUser) {
            addUser(currentUser.email, 'SSO');
            checkSurveyCompletion(currentUser.email, false);
          } else {
            checkSurveyCompletion(currentUser.email, false);
          }
        }
      })
      .catch((err) => {
        return err;
      });
  };

  /**
   *
   * signs out a authenticated firebase user
   *
   */
  const logout = (): Promise<void> => {
    return auth.signOut();
  };

  /**
   *
   * sends a verification link to user for email address verification
   *
   */
  const emailVerification = (user?: firebase.User): Promise<void> | undefined => {
    if (user) {
      return user.sendEmailVerification();
    } else if (currentUser) {
      return currentUser.sendEmailVerification();
    }

    return;
  };

  /**
   *
   * @param {string} actionCode
   * verifies user's email address by applying the oobCode in the verification link
   *
   */
  const applyVerificationCode = (actionCode: string) => {
    return auth.applyActionCode(actionCode);
  };

  /**
   *
   * @param {string} email
   * sends a reset password email to given user email address
   *
   */
  const resetPassword = (email: string) => {
    return auth.sendPasswordResetEmail(email);
  };

  /**
   *
   * @param {string} actionCode
   * @param {string} newPassword
   * verifies that the reset password code is valid and then updates new password with 'newPassword' param
   *
   */
  const verifyResetCode = (actionCode: string, newPassword: string) => {
    auth
      .verifyPasswordResetCode(actionCode)
      .then(() => {
        auth.confirmPasswordReset(actionCode, newPassword);
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
  const updateEmail = (email: string): Promise<void> | undefined => {
    if (currentUser) {
      return currentUser.updateEmail(email);
    }
    return;
  };

  /**
   *
   * @param {string} password
   * uses Email Auth Provider to re-authenticate the current user for security sensitive operations (eg, password update, account deletion)
   *
   */
  const reAuth = (password: string): Promise<firebase.auth.UserCredential> | undefined => {
    if (currentUser) {
      if (currentUser.email) {
        const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, password);
        return currentUser.reauthenticateWithCredential(credential);
      }
    }
    return;
  };

  /**
   *
   * @param {string} password
   * updates the password of the current authenticated user
   *
   */
  const updatePassword = (password: string): Promise<void> | undefined => {
    if (currentUser) {
      return currentUser.updatePassword(password);
    }
    return;
  };

  /**
   *
   * deletes the current user from the Firestore db and then from Firebase Authentication
   */
  const deleteUser = (): void => {
    if (currentUser) {
      const userRef = db.collection('users').where('emailAddress', '==', currentUser.email);

      userRef.get().then((userQuerySnapshot) => {
        userQuerySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              currentUser.delete();
            })
            .catch((err) => {
              console.error(`Error deleting document: ${err}`);
            });
        });
      });
    }
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
    signinUser,
    setEmail,
    signup,
    checkSurveyCompletion,
    updateSurveyCompleted,
    addUser,
    login,
    logout,
    googleSignIn,
    getSigninResult,
    githubSignIn,
    resetPassword,
    verifyResetCode,
    emailVerification,
    applyVerificationCode,
    updateEmail,
    updatePassword,
    reAuth,
    deleteUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
