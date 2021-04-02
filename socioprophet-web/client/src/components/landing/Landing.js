import React, { Suspense, useState, useReducer, useRef } from "react";
import { useHistory } from "react-router-dom";
import Header from "./landing_components/Header";
import HeaderLinks from "./landing_components/HeaderLinks";
const TickerFeed = React.lazy(() => import("../ticker-feed/TickerFeed"));
// import Offering from "./landing_components/Offering";
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

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

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

  const togglePanelClassName = isExpanded
    ? "landing__header__panel--expanded"
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
      <nav className="nav--header">
        <Header />
        <HeaderLinks />
        {currentUser !== null ? (
          <div className="landing__header__login">
            <p
              className="landing__header__login__avatar"
              onClick={() => history.push("/alpha")}
            >
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </p>
          </div>
        ) : (
          <p className="landing__header__login" onClick={loginToggle}>
            Login
          </p>
        )}
        <div className={`landing__header__panel ${togglePanelClassName}`}>
          <div className="landing__login__close">
            <p className="landing__login__close__btn" onClick={loginToggle}>
              &#10005;
            </p>
          </div>
          <LoginForm />
        </div>
      </nav>
      <Suspense fallback={<p>Loading ...</p>}>
        <TickerFeed />
      </Suspense>
      <div className="landing__container">
        <div className="landing__container__main">
          <div className="landing__container__main__logo">
            <img src={logo} width="450px" height="77px" />
          </div>
          <p className="landing__container__main__subtitle">
            <strong>
              Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.
            </strong>
          </p>

          <div className="landing__container__main__email">
            <div className="landing__container__main__email__field">
              {state.emailError.isError && (
                <p className="landing__container__main__email__field__error">
                  {state.emailError.message}
                </p>
              )}
              <input
                className={`inputText inputText--lg ${computedClassName}`}
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
              className="button button--lg"
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

        {/* <Offering /> */}
      </div>
      <div className="landing__more">
        <div className="landing__more__section platform">
          <h2 className="landing__more__section__heading">PLATFORM</h2>
          <FadeInSection>
            <p className="landing__more__section__info">
              Built as a social networking platform. For geeks, but simple
              enough for everyone to use.
            </p>
          </FadeInSection>
        </div>

        <div className="landing__more__section community">
          <h2 className="landing__more__section__heading ">COMMUNITY</h2>
          <FadeInSection>
            <p className="landing__more__section__info">
              Unlock the world's best ideas through democratized social
              intelligence, data, analytics & AI.
            </p>
          </FadeInSection>
        </div>

        <div className="landing__more__section dataAi">
          <h2 className="landing__more__section__heading">DATA & AI</h2>
          <FadeInSection>
            <p className="landing__more__section__info">
              Share your compute through leveraging peer to peer and federated
              networks or centralized collaboration models.
            </p>
          </FadeInSection>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
