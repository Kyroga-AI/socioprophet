import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ComingSoon from './components/coming-soon/ComingSoon';
import Landing from './components/landing/Landing';
import EmailSubmission from './components/landing/forms/email-submission/EmailSubmission';
import Survey from './components/survey/Survey';

import Alpha from './components/dashboard/Alpha';
import NotFound from './components/not-found/NotFound';
import Terms from './components/legal/Terms';
import Privacy from './components/legal/Privacy';

import PrivateRoute from './components/private-route/PrivateRoute';
import { AuthProvider } from './authentication/contexts/AuthContext';
import { ThemeProvider } from './theme/ThemeContext';

import './App.scss';
import './components/global-styles/button.scss';
import './components/global-styles/inputText.scss';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="app">
            <Switch>
              {/* <Route exact path="/" component={Landing} /> */}
              <Route exact path="/" component={ComingSoon} />
              {/* <Route exact path="/submit" component={EmailSubmission} />
              <Route path="/terms-of-use" component={Terms} />
              <Route path="/privacy-policy" component={Privacy} />
              <PrivateRoute path="/get-started" component={Survey} />
              <PrivateRoute exact path="/alpha" component={Alpha} /> */}
              <Route component={NotFound} />
              {/* <Route path="/account" component={Account} /> */}
              {/* <Route path="/password-reset" component={PasswordReset} /> */}
              {/* <PrivateRoute path="/dashboard" component={UInterface} /> */}
              {/* <PrivateRoute path="/terminal" component={PopoutTerminal} /> */}
            </Switch>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
export default App;
