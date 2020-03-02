import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/landing/Landing";
// Using ComingSoon page as temp before users
import ComingSoon from "./components/landing/ComingSoon";
import Register from "./components/landing/Register";
import Login from "./components/landing/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import UInterface from "./components/postAuth/UInterface";
import PopoutTerminal from "./components/postAuth/components/dashboardComponents/PopoutTerminal";
import News from "./components/postAuth/components/dashboardComponents/pages/News";

import "./App.scss";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={ComingSoon} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={UInterface} />
              <PrivateRoute exact path="/terminal" component={PopoutTerminal} />
              <PrivateRoute exact path="/news" component={News} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
