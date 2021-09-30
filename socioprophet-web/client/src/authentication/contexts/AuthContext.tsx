import React, { useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase-config/supabase';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

interface Props {
  children: React.ReactNode;
}

type User = {
  user_id: string;
  email_hash: string;
};

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
  const doesUserExist = async (): Promise<boolean> => {
    const { data } = await supabase
      .from<User>('socioprophet_users')
      .select('user_id')
      .eq('user_id', supabaseSession.user.id);

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
    // do the email hashing here...

    let saltRounds: number = 10;

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.log(`There was an error salting: ${err}`);
      }

      bcrypt.hash(email, salt, (err, hash) => {
        if (err) {
          console.log(`There wasn an error hashing: ${err}`);
        }
        // STORE PASSWORD HERE...

        insertHash(hash);
      });
    });
  };

  const insertHash = async (hash: string): Promise<void> => {
    const { error } = await supabase
      .from<User>('socioprophet_users')
      .insert([{ user_id: supabaseSession.user.id, email_hash: hash }]);

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
   * signs in a user using Google Signin with Redirect
   *
   */
  const googleSignIn = async (): Promise<void> => {
    // let { error } = await supabase.auth.signIn({
    //   provider: 'google',
    // });
    // if (error) {
    //   console.log(error);
    // }
    await supabase.from('countries').select().then(console.log);
  };

  /**
   *
   * signs in a user using GitHub Signin with Redirect
   *
   */
  const githubSignIn = async (): Promise<void> => {
    let { error } = await supabase.auth.signIn({
      provider: 'github',
    });
    if (error) {
      console.log(error);
    }
  };

  /**
   *
   * signs out a authenticated firebase user
   *
   */
  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  /**
   *
   * deletes a user from socioprophet_users database
   *
   */
  const deleteUser = async (id: string): Promise<void> => {
    const { error } = await supabase.from('socioprophet_users').delete().eq('user_id', id);
    if (error) {
      console.log(error);
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
    googleSignIn,
    githubSignIn,
    logout,
    deleteUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
