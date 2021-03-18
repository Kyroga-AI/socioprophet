import React, { useState, useReducer, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
} from "carbon-components-react/lib/components/UIShell";

import Header from "./landing_components/Header";
import HeaderLinks from "./landing_components/HeaderLinks";
import TickerFeed from "../ticker-feed/TickerFeed";
import Offering from "./landing_components/Offering";
import Footer from "./landing_components/Footer";

import LoginForm from "./landing_components/login-form/LoginForm";
import { useAuth } from "../../authentication/contexts/AuthContext";

// main SocioProphet logo image
import logo from "../../../public/images/mothership-logo.png";

// email validator
import { validateEmail } from "../landing/validate-email/validateEmail";
// reducer
import { emailReducer } from "../../reducers/emailReducer";
// styles
import "./styles/landing.css";

// state for reducer
const emailState = {
  loading: false,
  emailError: { isError: false, message: "" },
};

const Landing = () => {
  // states
  const [state, dispatch] = useReducer(emailReducer, emailState);
  const [isExpanded, setExpanded] = useState(false);

  // refs
  const emailRef = useRef();
  // other hooks
  const history = useHistory();
  // custom hooks
  const { currentUser, setEmail, emailAddress } = useAuth();

  // computed css classes for invalid email error message
  const computedClassName = state.emailError.isError
    ? "landing__container__main__email__field__input--error"
    : "";

  // toggles the side login panel
  const loginToggle = () => {
    setExpanded(isExpanded === false ? true : false);
  };

  // handles the email submission and sends user to survey
  const handleEmail = async () => {
    // set loading to disable 'begin' button
    dispatch({ type: "SET_LOADING", payload: true });

    // check for valid email and dispatch error accordingly
    if (!validateEmail(emailRef.current.value)) {
      return dispatch({ type: "EMAIL_ERROR", payload: true });
    }

    // if email check passes, reset any previously dispatched error
    dispatch({ type: "EMAIL_ERROR", payload: false });

    // create email query string to pass to survey url
    const emailQuery = encodeURIComponent(emailRef.current.value);

    // set loading back to false and enable button again
    dispatch({ type: "SET_LOADING", payload: false });

    // using custom useAuth hook to set the user email in global context
    setEmail(emailRef.current.value);

    // send to survey route
    history.push(`/get-started?email_address=${emailQuery}&via=site_signup`);
  };

  // when user presses 'enter' for email submition
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEmail();
    } else {
      return;
    }
  };

  return (
    <div className="landing">
      <nav className="landing__header">
        <Header />
        <HeaderLinks />
        <HeaderGlobalBar>
          {currentUser !== null ? (
            <HeaderGlobalAction
              id="userIcon"
              aria-label="App Switcher"
              onClick={() => {
                history.push("/alpha");
              }}
            >
              <svg width="20" height="20">
                <title>user</title>
                <path d="M6 15.745A6.968 6.968 0 0 0 10 17a6.968 6.968 0 0 0 4-1.255V15.5a2.5 2.5 0 0 0-2.5-2.5h-3A2.5 2.5 0 0 0 6 15.5v.245zm-.956-.802A3.5 3.5 0 0 1 8.5 12h3a3.5 3.5 0 0 1 3.456 2.943 7 7 0 1 0-9.912 0zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
                <path d="M10 9.841a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
              </svg>
            </HeaderGlobalAction>
          ) : (
            <p className="landing__header__login" onClick={loginToggle}>
              Login
            </p>
          )}
        </HeaderGlobalBar>
        <HeaderPanel aria-label="Header Panel" expanded={isExpanded}>
          <LoginForm />
        </HeaderPanel>
      </nav>

      <div className="landing__container">
        {/* <TickerFeed /> */}
        <div className="landing__container__main">
          <img src={logo} width="450px" height="auto" />
          <p className="landing__container__main__subtitle">
            <strong>
              Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.
            </strong>
          </p>

          <div className="landing__container__main__email">
            <div className="landing__container__main__email__field">
              {state.emailError.isError && (
                <p className="landing__container__main__email__field__error">
                  {"PLEASE ENTER A VALID EMAIL"}
                </p>
              )}
              <input
                className={`landing__container__main__email__field__input ${computedClassName}`}
                name="email"
                type="email"
                spellCheck="false"
                ref={emailRef}
                value={emailAddress || ""}
                onChange={(e) => setEmail(e.target.value)}
                required
                onKeyDown={handleKeyPress}
                placeholder="ENTER EMAIL"
              />
            </div>

            <div
              className="landing__container__main__email__btn"
              onClick={handleEmail}
              disabled={state.loading}
            >
              BEGIN
            </div>
          </div>
          <div className="landing__container__main__login">
            <p
              onClick={loginToggle}
              className="landing__container__main__login__text"
            >
              Already have an account?
            </p>
          </div>
        </div>

        <Offering />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
