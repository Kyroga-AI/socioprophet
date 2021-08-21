import React, { useState, useContext, useEffect } from 'react';
// import firebase from 'firebase/app'; // for emailProvider static object
// import { auth, db, googleProvider, githubProvider } from '../firebase-configuration/firebase'; // firebase and sso providers
import { supabase } from '../supabase-config/supabase';
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
  // store email state (here if it needs to be used (can be instead of using localStorage))
  const [emailAddress, setEmailAddress] = useState<string>('');

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
  const signinUser = async (email: string) => {
    // // check for url details from emailed link
    // if (auth.isSignInWithEmailLink(window.location.href)) {
    //   // check email in link matches local storage (ensure same device sign in)
    //   let email = window.localStorage.getItem('signin_email');
    //   // get user to re-enter email if different device
    //   if (!email) {
    //     email = window.prompt('Please provide your email for confirmation.');
    //   }
    //   // use link code to authenticate user
    //   auth.signInWithEmailLink(email, window.location.href).then((result) => {
    //     window.localStorage.removeItem('signin_email');
    //     // check for a new user sign up
    //     if (result.additionalUserInfo.isNewUser) {
    //       // add user to firestore
    //       addUser(email, 'email');
    //       // user won't have completed survey at this point, but this function will
    //       // direct them accordingly
    //       checkSurveyCompletion(email, false);
    //     } else {
    //       // check if existing user has completed the survey
    //       checkSurveyCompletion(email, false);
    //     }
    //   });
    // }
    // TESTING WITH SUPABASE INSTEAD OF FIREBASE...
    console.log(email);

    // const { user, session, error } = await supabase.auth.signIn({ email: email });
    // if (error) {
    //   alert(error);
    // } else {
    //   alert('Check your email for the login link!');
    //   console.log('email sent');
    // }

    const { data, error } = await supabase
      .from('Users')
      .insert([{ id: 'f7c52a33-a8f4-44a9-8bb4-dc1e1c54f181', name: email }]);
  };

  const doesUserExist = async (email: string) => {
    console.log('Email Address in Context: ' + email);

    const { data, error } = await supabase.from('Users').select('email').eq('email', email);

    console.log(data);

    if (error) {
      console.log('There was a problem checking for this user.');
      return error;
    }

    if (data.length === 0) {
      console.log('in here');

      return false;
    }

    return true;
  };

  /**
   *
   *  @param {string} email
   *  @param {string} emailQuery
   *  @param {boolean} fromDashboard
   *  checks if currently authenticated user has completed the survey or not
   *
   */
  const checkSurveyCompletion = async (email: string, fromDashboard: boolean): Promise<void> => {
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
        // set a random id value to match in localStoarge to redirect query param from Typeform, to determine if a user just completed the survey
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
  const updateSurveyCompleted = async (email: string): Promise<void> => {
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

  // FIREBASE USEEFFECT
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    setLoading(false);

    setSupabaseSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseSession(session);
    });
  }, []);

  const value = {
    emailAddress,
    supabaseSession,
    signinUser,
    setEmail,
    doesUserExist,
    checkSurveyCompletion,
    updateSurveyCompleted,
    addUser,
    logout,
    googleSignIn,
    getSigninResult,
    githubSignIn,
    deleteUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
