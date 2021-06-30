import React, { useEffect } from 'react';

// custom hook
import { useAuth } from '../../authentication/contexts/AuthContext';

const EmailAuth = () => {
  // custom hooks
  const { signinUser } = useAuth();

  const register = async () => {
    try {
      await signinUser();
    } catch (err) {
      console.log('There was an error in Registration');
      console.log(err);
    }
  };

  useEffect(() => {
    register();
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default EmailAuth;
