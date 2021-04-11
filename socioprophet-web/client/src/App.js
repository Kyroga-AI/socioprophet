import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./components/landing/Landing";
import Survey from "./components/registration/survey/Survey";
import Registration from "./components/registration/Registration";
import Account from "./components/registration/Account";
import PasswordReset from "./components/dashboard/profile/PasswordReset";
import Alpha from "./components/dashboard/Alpha";
import NotFound from "./components/not-found/NotFound";
import Terms from "./components/legal/Terms";
import Privacy from "./components/legal/Privacy";

import PrivateRoute from "./components/private-route/PrivateRoute";
import { AuthProvider } from "./authentication/contexts/AuthContext";

// import UInterface from "./components/original-carbon-dashboard/UInterface";
// import PopoutTerminal from "./components/original-carbon-dashboard/interface_components/dashboard_components/PopoutTerminal";

import "./App.css";
import "./components/global-styles/button.css";
import "./components/global-styles/inputText.css";

const App = () => {
  gapi.load("client", () => {
    console.log("loaded client");

    gapi.client.init({
      apiKey: "AIzaSyDeZueSUiuOAgQuDOBAF5QWvFce_fjkMMc",
      clientId:
        "392608809931-uktf79hjt5o91r2fmvvm8fnfe4grfipv.apps.googleusercontent.com",
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/admin/directory_v1/rest",
      ],
      scope:
        "https://www.googleapis.com/auth/admin.directory.group https://www.googleapis.com/auth/admin.directory.group.member",
    });
  });
  return (
    <Router history={history}>
      <AuthProvider>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/terms-of-use" component={Terms} />
            <Route path="/privacy-policy" component={Privacy} />
            <Route path="/get-started" component={Survey} />
            <Route path="/signup" component={Registration} />
            <Route path="/account" component={Account} />
            <Route path="/password-reset" component={PasswordReset} />
            <PrivateRoute exact path="/alpha" component={Alpha} />
            <Route component={NotFound} />
            {/* <PrivateRoute path="/dashboard" component={UInterface} /> */}
            {/* <PrivateRoute path="/terminal" component={PopoutTerminal} /> */}
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
};
export default App;
