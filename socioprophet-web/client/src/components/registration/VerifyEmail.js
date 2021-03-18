import React, { useEffect, useState, useReducer, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";

// email validator
import { validateEmail } from "../landing/validate-email/validateEmail";
// reducer
import { loginReducer } from "../../reducers/loginReducer";
//styles
import "./styles/verifyEmail.css";

const loginState = {
  loading: false,
  authRequired: false,
  verified: false,
  verificationError: false,
  emailError: { isError: false, message: "" },
  passwordError: { isError: false, message: "" },
};

const VerifyEmail = () => {
  // states
  const [state, dispatch] = useReducer(loginReducer, loginState);
  const [authRequired, setAuthRequired] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  // refs
  const emailRef = useRef();
  const passwordRef = useRef();
  // other hooks
  const history = useHistory();
  // custom hooks
  const { currentUser, login, applyVerificationCode } = useAuth();

  // computed css classes for invalid email error message
  const computedClassName = state.emailError.isError
    ? "verify__container__field__input__text--error"
    : "";
  // computed css classes for invalid password error message
  const computedClassNamePasswordError = state.passwordError.isError
    ? "verify__container__field__input__text--error"
    : "";

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
  const checkForCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");
    const actionCode = urlParams.get("oobCode");

    // if invalid url, redirect user back to landing page
    if (mode !== "verifyEmail" || actionCode === null) {
      history.push("/");
    }
  };

  // on initial render, get verification code and check if user must be authenticated
  useEffect(() => {
    checkForCode();
    if (currentUser === null) {
      setAuthRequired(true);
    } else {
      if (currentUser.emailVerified) {
        setVerified(true);
      } else {
        verifyEmail();
      }
    }
  }, []);

  return (
    <div className="verify">
      {authRequired && (
        <>
          <h2 className="verify__heading">Please login to continue</h2>

          <div className="verify__container">
            <div className="verify__container__field">
              <div className="verify__container__field__input">
                <input
                  className={`verify__container__field__input__text ${computedClassName}`}
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
                  className={`verify__container__field__input__text ${computedClassNamePasswordError}`}
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
            <div
              className="verify__container__btn"
              onClick={handleLogin}
              disabled={state.loading}
            >
              VERIFY
            </div>
          </div>
        </>
      )}
      {verificationError && (
        <>
          <h2 className="verify__heading">
            hmm, looks like something went wrong
          </h2>
          <div className="verify__signin">
            <button className="verify__signin__btn" onClick={() => {}}>
              Resend Link
            </button>
          </div>
        </>
      )}
      {verified && (
        <>
          <h2 className="verify__heading">Email Verified!</h2>
          <h4 className="verify__email">{currentUser.email}</h4>
          <div className="verify__signin">
            <button
              className="verify__signin__btn"
              onClick={() => {
                history.push("/alpha");
              }}
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
