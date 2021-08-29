import React, { useState, useContext, useEffect } from 'react';
// import firebase from 'firebase/app'; // for emailProvider static object
// import { auth, db, googleProvider, githubProvider } from '../firebase-configuration/firebase'; // firebase and sso providers
import { supabase } from '../supabase-config/supabase';
import { v4 as uuidv4 } from 'uuid';
interface Props {
  children: React.ReactNode;
}

// define the context
const AuthContext = React.createContext<any>(null);

// export context as a custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// export hook as a global context provider to manage authentication state
export const AuthProvider = ({ children }: Props) => {
  // authenticated session
  const [supabaseSession, setSupabaseSession] = useState(null);
  // set loading state for async operations
  const [loading, setLoading] = useState<boolean>(true);

  /**
   *
   * checks if user already exists via database lookup
   *
   * @param email
   */
  const doesUserExist = async (email: string): Promise<boolean> => {
    const { data } = await supabase
      .from('socioprophet-users')
      .select('email_hash')
      .eq('email_hash', email);

    // data.length will be zero if no matching user is found...
    if (data.length === 0) {
      return false;
    }

    // else a matching user is found and we return 'true'...
    return true;
  };

  /**
   *
   * @param email
   * adds new user to supabase managed PostgreSQL database
   */
  const addNewUser = async (email: string): Promise<void> => {
    const newUserId = uuidv4();
    const { error } = await supabase
      .from('socioprophet-users')
      .insert([{ user_id: newUserId, email_hash: email }]);

    if (error) {
      console.log(error);
      return;
    }
    // since we added a new user, the survey has not been completed yet...
    sendToSurvey();
  };

  /**
   *
   * @param email
   * sends user to survey route
   */
  const sendToSurvey = (): void => {
    let r = uuidv4();
    window.localStorage.setItem('id', r);
    window.location.href = `/get-started?id=${r}&via=site_signup`;
  };

  /**
   *
   * @param email
   * send email with link authentication for requested signins
   */
  const sendEmailAuthentication = async (email: string): Promise<void> => {
    const { error } = await supabase.auth.signIn({ email: email });
    if (error) {
      console.log(error);
    }
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
   * signs in a user using Google Signin with Redirect
   *
   */
  const googleSignIn = async (): Promise<void> => {
    return auth
      .signInWithRedirect(googleProvider)
      .catch((err) => console.log(`There was an error signing in: ${err}`));
  };

  /**
   *
   * signs in a user using GitHub Signin with Redirect
   *
   */
  const githubSignIn = (): Promise<void> => {
    return auth
      .signInWithRedirect(githubProvider)
      .catch((err) => console.log(`There was an error signing in: ${err}`));
  };

  /**
   *
   * gets the signin result of an SSO signin provider -> adds new user as defined by the resut to the database
   *
   */
  const getSigninResult = async (): Promise<void> => {
    auth
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          // check if signin is a new user and add to db
          if (result.additionalUserInfo.isNewUser) {
            addUser(currentUser.email, 'SSO');
          }
          checkSurveyCompletion(currentUser.email, false);
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
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
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
    setLoading(false);

    setSupabaseSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseSession(session);
    });
  }, []);

  const value = {
    supabaseSession,
    doesUserExist,
    addNewUser,
    sendEmailAuthentication,
    addUser,
    logout,
    googleSignIn,
    getSigninResult,
    githubSignIn,
    deleteUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
