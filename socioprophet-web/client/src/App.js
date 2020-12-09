import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // provide application routing
import Landing from "./components/landing/Landing"; // Landing Component for default route
import PrivateRoute from "./components/private-route/PrivateRoute"; // Component for private route
/**
 *
 *  Components for private routing
 *
 */
import Welcome from "./components/postRegistration/Welcome"; // post auth component for alpha registration signup/login
import PasswordReset from "./components/postRegistration/PasswordReset"; // post auth component for password reset
import UpdateProfile from "./components/postRegistration/UpdateProfile"; // post auth component for email and/or password update
// Component has routing but is dashboard for later launch...
import UInterface from "./components/postAuth/UInterface";
// Component has routing but is dashboard for later launch...
import PopoutTerminal from "./components/postAuth/interface_components/dashboard_components/PopoutTerminal";

import { AuthProvider } from "./authentication/contexts/AuthContext"; // context for authentication

// Google Analytics
import ReactGA from "react-ga";

import { createBrowserHistory } from "history";

import Search from "./search/Search";

import "./App.scss";

ReactGA.initialize("UA-184834195-1");

const history = createBrowserHistory();

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const App = () => {
  return (
    <Router history={history}>
      <AuthProvider>
        <div className="App">
          <Route exact path="/" component={Landing} />

          <Route path="/search" component={Search} />

          <Route path="/password-reset" component={PasswordReset} />
          <Switch>
            <PrivateRoute path="/dashboard" component={UInterface} />
            <PrivateRoute path="/terminal" component={PopoutTerminal} />
            <PrivateRoute path="/alpha" component={Welcome} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />

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
