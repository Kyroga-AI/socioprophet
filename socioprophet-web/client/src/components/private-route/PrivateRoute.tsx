import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../authentication/contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => (currentUser ? <Component {...props} /> : <Redirect to={'/'} />)}
    />
  );
};

export default PrivateRoute;
