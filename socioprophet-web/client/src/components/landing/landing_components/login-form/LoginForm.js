import React, { useReducer, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../../authentication/contexts/AuthContext";

// email validator
import { validateEmail } from "../../validate-email/validateEmail";
// reducer
import { loginReducer } from "../../../../reducers/loginReducer";
// styles
import "./styles/loginForm.css";
import googleIcon from "../../../../../public/images/google-sign-in-light.jpg";

// state for reducer
const loginState = {
  loading: false,
  emailError: { isError: false, message: "" },
  passwordError: { isError: false, message: "" },
};

const LoginForm = () => {
  // states
  const [state, dispatch] = useReducer(loginReducer, loginState);
  // refs
  const emailRef = useRef();
  const passwordRef = useRef();
  // other hooks
  const history = useHistory();
  // custom hooks
  const { login } = useAuth();
  const { googleSignIn } = useAuth();

  // computed css classes for invalid email error message
  const computedClassName = state.emailError.isError
    ? "loginForm__container__field__input--error"
    : "";

  // computed css classes for invalid password error message
  const computedClassNamePasswordError = state.passwordError.isError
    ? "loginForm__container__field__input--error"
    : "";

  // signin with Google
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await googleSignIn();
    } catch (err) {
      console.trace(err);
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  // handles email and password login submission
  const handleLogin = async () => {
    if (!validateEmail(emailRef.current.value)) {
      return dispatch({ type: "MISSING_EMAIL", payload: true });
    }

    // if email check passes, reset any previously dispatched error
    dispatch({ type: "MISSING_EMAIL", payload: false });

    // check if a password was entered
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
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        // dispatch error for wrong password
        return dispatch({ type: "INCORRECT_PASSWORD" });
      } else {
        // another error occured (should be handling all Firebase errors here)
        return dispatch({ type: "ERROR_PASSWORD" });
      }
    }
    // enable button again
    dispatch({ type: "SET_LOADING", payload: false });
    // send user to alpha dashboard
    history.push("/alpha");
  };

  // when user presses 'enter' for email submission
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    } else {
      return;
    }
  };

  return (
    <div className="loginForm">
      <div className="loginForm__container">
        <div className="loginForm__container__field">
          <input
            className={`loginForm__container__field__input ${computedClassName}`}
            name="email"
            type="email"
            spellCheck="false"
            ref={emailRef}
            required
            onKeyDown={handleKeyPress}
            placeholder="Email Address"
          />
          {state.emailError.isError && (
            <p className="loginForm__container__field__error">
              {state.emailError.message}
            </p>
          )}

          <input
            style={{ marginTop: "2rem" }}
            className={`loginForm__container__field__input ${computedClassNamePasswordError}`}
            name="password"
            type="password"
            spellCheck="false"
            ref={passwordRef}
            required
            onKeyDown={handleKeyPress}
            placeholder="Password"
          />
          {state.passwordError.isError && (
            <p className="loginForm__container__field__error">
              {state.passwordError.message}
            </p>
          )}

          <div className="loginForm__container__field__reset">
            <Link
              className="loginForm__container__field__reset__link"
              to="/password-reset"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="loginForm__container__field__reset">
            <p
              style={{ color: "#999", cursor: "pointer" }}
              className="loginForm__container__field__reset__link"
              onClick={handleSignIn}
            >
              SocioProphet Team
            </p>
          </div>
          <div
            className="loginForm__container__field__btn"
            onClick={handleLogin}
            disabled={state.loading}
          >
            LOGIN
          </div>

          <br />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
