import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // provide application routing

import NotFound from "./components/not-found/NotFound";
import Landing from "./components/landing/Landing"; // Landing Component for default route
import Survey from "./components/registration/survey/Survey";
import Registration from "./components/registration/Registration";

import PrivateRoute from "./components/private-route/PrivateRoute"; // Component for private route

import Alpha from "./components/postRegistration/Alpha"; // post auth component for alpha registration signup/login
import PasswordReset from "./components/postRegistration/PasswordReset"; // post auth component for password reset
import VerifyEmail from "./components/postRegistration/VerifyEmail";
import UpdateProfile from "./components/postRegistration/UpdateProfile"; // post auth component for email and/or password update
// import User from "./components/postRegistration/User";
// Component has routing but is dashboard for later launch...
// import UInterface from "./components/postAuth/UInterface";
// Component has routing but is dashboard for later launch...
// import PopoutTerminal from "./components/postAuth/interface_components/dashboard_components/PopoutTerminal";

import { AuthProvider } from "./authentication/contexts/AuthContext"; // context for authentication

// import Search from "./search/Search"; // header search component

// global styles
import "./App.scss";

const App = () => {
  return (
    <Router history={history}>
      <AuthProvider>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/get-started" component={Survey} />
            <Route path="/signup" component={Registration} />
            <Route path="/verify-email" component={VerifyEmail} />
            <Route path="/password-reset" component={PasswordReset} />

            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute exact path="/alpha" component={Alpha} />

            <Route component={NotFound} />
            {/* <PrivateRoute path="/dashboard" component={UInterface} /> */}
            {/* <PrivateRoute path="/terminal" component={PopoutTerminal} /> */}
            {/* This is route to render pages w/in dashboard */}
            {/* <PrivateRoute path="/:id" component={UInterface} /> */}
            {/* This is route for now until private issues are fixed */}
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
};
export default App;
