/**
 *
 *  File: App.tsx
 *  Author: William Jones
 *  Desciption: Main application wrapper for all view routes
 *
 */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/**
 *  unauthenticated view imports (latest version)
 *
 */
import Terms from './views/unauthenticated/legal/Terms';
import Privacy from './views/unauthenticated/legal/Privacy';
import NotFound from './views/unauthenticated/not-found/NotFound';

/***************************************************/

import Landing from './components/landing/Landing';
import EmailSubmission from './components/landing/forms/email-submission/EmailSubmission';
import Survey from './components/survey/Survey';

import Alpha from './components/dashboard/Alpha';

import AuthRouter from './views/auth-router/AuthRouter';
import { AuthProvider } from './authentication/contexts/AuthContext';

import './App.scss';
import './components/global-styles/button.scss';
import './components/global-styles/inputText.scss';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Landing} />

            <Route exact path="/submit" component={EmailSubmission} />
            <Route path="/terms-of-use" component={Terms} />
            <Route path="/privacy-policy" component={Privacy} />
            <AuthRouter path="/get-started" component={Survey} />
            <AuthRouter exact path="/alpha" component={Alpha} />
            <Route component={NotFound} />
            {/* <Route path="/account" component={Account} />
              {/* <Route path="/password-reset" component={PasswordReset} /> */}
            {/* <PrivateRoute path="/dashboard" component={UInterface} /> */}
            {/* <PrivateRoute path="/terminal" component={PopoutTerminal} />  */}
          </Switch>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
