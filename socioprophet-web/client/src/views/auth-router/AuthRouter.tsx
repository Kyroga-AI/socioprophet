import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../authentication/contexts/AuthContext';

const AuthRouter = ({ component: Component, ...rest }: any): JSX.Element => {
  const { supabaseSession } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => (supabaseSession ? <Component {...props} /> : <Redirect to={'/'} />)}
    />
  );
};

export default AuthRouter;
