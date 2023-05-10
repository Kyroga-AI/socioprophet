/**
 *
 *  File: App.tsx
 *  Author: William Jones
 *  Desciption: Main application wrapper for all view routes
 *
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/submit" element={<EmailSubmission />} />
          <Route path="/terms-of-use" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <AuthRouter path="/get-started" element={<Survey />} />
          <AuthRouter exact path="/alpha" element={<Alpha />} />
          <Route element={<NotFound />} />
          {/* <Route path="/account" component={Account} />
              {/* <Route path="/password-reset" component={PasswordReset} /> */}
          {/* <PrivateRoute path="/dashboard" component={UInterface} /> */}
          {/* <PrivateRoute path="/terminal" component={PopoutTerminal} />  */}
        </Routes>
      </div>
    </AuthProvider>
  );
};
export default App;
