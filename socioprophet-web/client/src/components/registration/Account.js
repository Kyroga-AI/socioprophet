import React, { useEffect, useState, useReducer, useRef } from "react";
import { useHistory } from "react-router-dom";

import Header from "../landing/landing_components/Header";
import HeaderLinks from "../landing/landing_components/HeaderLinks";
import Footer from "../landing/landing_components/Footer";
import { useAuth } from "../../authentication/contexts/AuthContext";

// email validator
import { validateEmail } from "../landing/validate-email/validateEmail";
// reducer
import { loginReducer } from "../../reducers/loginReducer";
//styles
import "./styles/account.css";

const loginState = {
  loading: false,
  authRequired: false,
  verified: false,
  verificationError: false,
  emailError: { isError: false, message: "" },
  passwordError: { isError: false, message: "" },
};

const Account = () => {
  // states
  const [state, dispatch] = useReducer(loginReducer, loginState);
  const [renderVerification, setRenderVerification] = useState(false);
  const [renderReset, setRenderReset] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  const [verified, setVerified] = useState(false);
  const [actionCode, setActionCode] = useState();
  const [verificationError, setVerificationError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState({
    isError: false,
    message: "",
  });
  const [linkSent, setLinkSent] = useState({
    isError: false,
    message: "",
  });

  // refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  // other hooks
  const history = useHistory();
  // custom hooks
  const {
    currentUser,
    login,
    verifyResetCode,
    emailVerification,
    applyVerificationCode,
  } = useAuth();

  // computed css classes for invalid email error message
  const computedClassName = state.emailError.isError
    ? "verify__container__field__input__text--error"
    : "";
  // computed css classes for invalid password error message
  const computedClassNamePasswordError = state.passwordError.isError
    ? "verify__container__field__input__text--error"
    : "";

  // computed css classes for invalid password error message
  const computedClassNameNewPasswordError = newPasswordError.isError
    ? "verify__container__field__input__text--error"
    : "";

  const sendLink = async () => {
    try {
      await emailVerification();
    } catch (err) {
      return setLinkSent({
        isError: true,
        message:
          "There is still a problem sending the verification link! Please try again in an hour.",
      });
    }
  };

  // handles email and password login submission
  const handleLogin = async () => {
    if (!validateEmail(emailRef.current.value)) {
      return dispatch({ type: "MISSING_EMAIL", payload: true });
    }

    // if email check passes, reset any previously dispatched error
    dispatch({ type: "MISSING_EMAIL", payload: false });

    if (passwordRef.current.value === "") {
      return dispatch({ type: "MISSING_PASSWORD", payload: true });
    }

    // set loading back to false and enable button again
    dispatch({ type: "MISSING_PASSWORD", payload: false });

    try {
      // disable button while processing asynchronous calls
      dispatch({ type: "SET_LOADING", payload: true });
      // login in user with email and password
      await login(emailRef.current.value, passwordRef.current.value);
      // change state to render correct div
      setAuthRequired(false);
      // reload to run useEffect again after successful authentication
      window.location.reload();
    } catch (err) {
      // dispatch error for wrong password
      if (err.code === "auth/wrong-password") {
        return dispatch({ type: "INCORRECT_PASSWORD" });
      } else {
        // another error occured (should be handling all Firebase errors here)
        return dispatch({ type: "ERROR_PASSWORD" });
      }
    }
    // enable button again
    dispatch({ type: "SET_LOADING", payload: false });
  };

  // when user presses 'enter' for email submition
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    } else {
      return;
    }
  };

  // verifies reset password code and applies the new user selected password with confirmation
  const resetPassword = async () => {
    // check password created is at least six characters long
    if (newPasswordRef.current.value.length < 6) {
      return setNewPasswordError({
        isError: true,
        message: "Password must be at least 6 characters long!",
      });
    }
    // verify the reset password code
    try {
      await verifyResetCode(actionCode, newPasswordRef.current.value);
    } catch (err) {
      console.log(`There was a problem: ${err}`);
    }
  };

  // applies the verification code to the current user email address
  const verifyEmail = async () => {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const actionCode = urlParams.get("oobCode");

      await applyVerificationCode(actionCode);
      setVerified(true);
    } catch (err) {
      console.error(err);
      setVerificationError(true);
    }
  };

  // checks if url is valid, must contain correct mode and oobcode
  const checkForCode = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");
    const actionCode = urlParams.get("oobCode");
    setActionCode(actionCode);
    // if invalid url, redirect user back to landing page
    if (actionCode === null) {
      history.push("/");
    }

    // if there is a code then an action is required
    if (mode === "verifyEmail") {
      // want to render email verification logic
      setRenderVerification(true);
      if (currentUser === null) {
        setAuthRequired(true);
      } else {
        if (currentUser.emailVerified) {
          setVerified(true);
        } else {
          verifyEmail();
        }
      }
    } else if (mode === "resetPassword") {
      // want to render reset password logic
      setRenderReset(true);
    } else {
      // otherwise not an action to be handled - unlucky case
      history.push("/");
    }
  };

  useEffect(() => {
    // check if component renders email verification or password reset
    checkForCode();
  }, []);

  return (
    <div className="account">
      <nav className="nav--header">
        <Header />
        <HeaderLinks />
      </nav>
      {renderReset && (
        <div className="account__reset">
          <div className="reset__container__field">
            <input
              className={`inputText inputText--lg ${computedClassNameNewPasswordError}`}
              name="new-password"
              type="password"
              spellCheck="false"
              ref={newPasswordRef}
              required
              onKeyDown={handleKeyPress}
              placeholder="ENTER NEW PASSWORD"
            />
            {newPasswordError.isError && (
              <p className="reset__container__field__error">
                {newPasswordError.message}
              </p>
            )}
          </div>

          <div
            className="button button--lg"
            onClick={resetPassword}
            disabled={state.loading}
          >
            Reset Password
          </div>
        </div>
      )}
      {renderVerification && (
        <div className="">
          {authRequired && (
            <div className="account__verify__container">
              <h2 className="verify__heading">Please login to continue</h2>

              <div className="verify__container">
                <div className="verify__container__field">
                  <div className="verify__container__field__input">
                    <input
                      className={`inputText inputText--lg ${computedClassName}`}
                      name="email"
                      type="email"
                      spellCheck="false"
                      ref={emailRef}
                      required
                      onKeyDown={handleKeyPress}
                      placeholder="ENTER EMAIL"
                    />
                    {state.emailError.isError && (
                      <p className="verify__container__field__error">
                        {state.emailError.message}
                      </p>
                    )}
                  </div>
                  <div className="verify__container__field__input">
                    <input
                      className={`inputText inputText--lg ${computedClassNamePasswordError}`}
                      name="password"
                      type="password"
                      spellCheck="false"
                      ref={passwordRef}
                      required
                      onKeyDown={handleKeyPress}
                      placeholder="ENTER PASSWORD"
                    />
                    {state.passwordError.isError && (
                      <p className="verify__container__field__error">
                        {state.passwordError.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="verify__container__btn">
                  <div
                    className="button button--lg"
                    onClick={handleLogin}
                    disabled={state.loading}
                  >
                    VERIFY
                  </div>
                </div>
              </div>
            </div>
          )}
          {verificationError && (
            <div className="account__verify__container">
              <h2 className="verify__heading">
                hmm, looks like something went wrong
              </h2>
              <div className="verify__signin">
                <div className="button button--lg" onClick={sendLink}>
                  Resend Link
                </div>
                {linkSent.isError && (
                  <h2 className="verify__heading verify--error">
                    {linkSent.message}
                  </h2>
                )}
              </div>
            </div>
          )}
          {verified && (
            <div className="account__verify__container">
              <h2 className="verify__heading">
                Thanks for verifing your email address!
              </h2>
              <h4 className="verify__email">{currentUser.email}</h4>
              <div className="verify__signin">
                <div
                  className="button button--lg"
                  onClick={() => {
                    history.push("/alpha");
                  }}
                >
                  Continue
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
