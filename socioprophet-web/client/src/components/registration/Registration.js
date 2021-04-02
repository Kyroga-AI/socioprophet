import React, { Suspense, useEffect, useReducer, useRef } from "react";
import { useHistory } from "react-router-dom";
import Header from "../landing/landing_components/Header";
import HeaderLinks from "../landing/landing_components/HeaderLinks";
const TickerFeed = React.lazy(() => import("../ticker-feed/TickerFeed"));
import Footer from "../landing/landing_components/Footer";

// custom hook
import { useAuth } from "../../authentication/contexts/AuthContext";

// reducer
import { registrationReducer } from "../../reducers/registrationReducer";

// styles
import "./styles/registration.css";
import logo from "../../../public/images/mothership-logo.png";

// state for reducer
const registrationState = {
  loading: false,
  emailAddress: "",
  errors: {
    passwordError: { isError: false, message: "" },
    confirmationError: { isError: false, message: "" },
  },
};

const Registration = () => {
  // states
  const [state, dispatch] = useReducer(registrationReducer, registrationState);
  // refs
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // hooks
  const history = useHistory();
  // custom hooks
  const { signup, addUser } = useAuth();

  // computed css classes for invalid email error message
  const computedClassNamePasswordError = state.errors.passwordError.isError
    ? "registration__container__main__password__section__field__input--error"
    : "";

  const computedClassNamePasswordConfirmError = state.errors.confirmationError
    .isError
    ? "registration__container__main__password__section__field__input--error"
    : "";

  // handles password confirmation submission and sends user to alpha
  const handleSubmit = async (e) => {
    // check as password has been entered
    if (passwordRef.current.value.length == 0) {
      return dispatch({ type: "MISSING_PASSWORD" });
    }
    // check password created is at least six characters long
    if (passwordRef.current.value.length < 6) {
      return dispatch({ type: "INVALID_PASSWORD" });
    }
    // check if password and password confirmation are the same
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return dispatch({ type: "NO_MATCH" });
    }

    try {
      // set loading to disable 'begin' button
      dispatch({ type: "SET_LOADING", payload: true });
      const emailAddress = getUrlParams();
      // signup user to Firebase with email and password
      await signup(emailAddress, passwordRef.current.value);
      // add user to Firestore with email
      await addUser(emailAddress);
    } catch (err) {
      console.error(err);
      // check if the error is because a user with the email address already exists
      if (err.code === "auth/email-already-in-use") {
        return dispatch({ type: "EMAIL_TAKEN" });
      }
    }
    // set loading back to false and enable button again
    dispatch({ type: "SET_LOADING", payload: false });
    // after successful authentication, send user to alpha dashboard
    history.push("/alpha");
  };

  // when user presses 'enter' for email submition
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else {
      return;
    }
  };

  // set the user email address in state
  const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailAddress = urlParams.get("id");
    return emailAddress;
  };

  // on initial render, check the email address from url
  useEffect(() => {
    const emailAddress = getUrlParams();
    if (emailAddress === null || emailAddress === "") {
      history.push("/");
    }
  }, []);

  return (
    <div className="registration">
      <nav className="nav--header">
        <Header />
        <HeaderLinks />
      </nav>
      <div className="registration__container">
        <Suspense fallback={<p>Loading ...</p>}>
          <TickerFeed />
        </Suspense>
        <div className="registration__container__main">
          <div className="registration__container__main__logo">
            <img src={logo} width="450px" height="77px" />
          </div>
          <p className="registration__container__main__subtitle">
            <strong>
              {/* Open Collaborative Socio-Dat-Alytics. For geeks, by geeks. */}
              COMMUNITY. DATA. ANALYTICS. AI. SOCIAL.
              <br />
              For geeks, but easy enough for everyone.
            </strong>
          </p>

          <div className="registration__container__main__password">
            <div className="registration__container__main__password__section">
              <div className="registration__container__main__password__section__field">
                <input
                  className={`inputText inputText--lg ${computedClassNamePasswordError}`}
                  name="password"
                  type="password"
                  spellCheck="false"
                  ref={passwordRef}
                  required
                  onKeyDown={handleKeyPress}
                  placeholder="CREATE PASSWORD"
                />
                {state.errors.passwordError.isError && (
                  <p className="registration__container__main__password__section__field__error">
                    {state.errors.passwordError.message}
                  </p>
                )}
              </div>
              <div className="registration__container__main__password__section__field">
                <input
                  className={`inputText inputText--lg ${computedClassNamePasswordConfirmError}`}
                  name="password-confirmation"
                  type="password"
                  spellCheck="false"
                  ref={passwordConfirmRef}
                  required
                  onKeyDown={handleKeyPress}
                  placeholder="RE-ENTER PASSWORD"
                />
                {state.errors.confirmationError.isError && (
                  <p className="registration__container__main__password__section__field__error">
                    {state.errors.confirmationError.message}
                  </p>
                )}
              </div>
            </div>
            <div className="registration__container__main__password__btn">
              <div
                className="button button--lg"
                onClick={handleSubmit}
                disabled={state.loading}
              >
                ONWARD
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;
