import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../authentication/contexts/AuthContext';

const AuthRouter = (props: any) => {
  const { supabaseSession } = useAuth();

  if (supabaseSession) {
    return <Route {...props} />;
  }

  return <Navigate to={'/'} />;
};

export default AuthRouter;
