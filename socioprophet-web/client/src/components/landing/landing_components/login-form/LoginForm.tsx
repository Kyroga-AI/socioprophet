import React, { useReducer, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../../authentication/contexts/AuthContext';

// email validator
import { validateEmail } from '../../validate-email/validateEmail';
// reducer
import { loginReducer } from '../../../../reducers/loginReducer';
// styles
import './scss/loginForm.scss';
import '../signin/scss/signin.scss';

// state for reducer
const loginState = {
  loading: false,
  emailError: '',
  passwordError: '',
};

const LoginForm = () => {
  // states
  const [state, dispatch] = useReducer(loginReducer, loginState);

  // refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  // other hooks
  const history = useHistory();
  // custom hooks
  const { login } = useAuth();
  const { googleSignIn } = useAuth();

  // computed css classes for invalid email error message
  const computedClassName = state.emailError ? 'loginForm__container__field__input--error' : '';

  // computed css classes for invalid password error message
  const computedClassNamePasswordError = state.passwordError
    ? 'loginForm__container__field__input--error'
    : '';

  // signin with Google
  const handleSignIn = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await googleSignIn();
    } catch (err) {
      console.trace(err);
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  // handles email and password login submission
  const handleLogin = async () => {
    if (emailRef.current && passwordRef.current) {
      if (!validateEmail(emailRef.current.value)) {
        return dispatch({ type: 'MISSING_EMAIL', payload: true });
      }

      // if email check passes, reset any previously dispatched error
      dispatch({ type: 'MISSING_EMAIL', payload: false });

      // check if a password was entered
      if (passwordRef.current.value === '') {
        return dispatch({ type: 'MISSING_PASSWORD', payload: true });
      }

      // set loading back to false and enable button again
      dispatch({ type: 'MISSING_PASSWORD', payload: false });

      try {
        // disable button while processing asynchronous calls
        dispatch({ type: 'SET_LOADING', payload: true });
        // login in user with email and password
        await login(emailRef.current.value, passwordRef.current.value);
      } catch (err) {
        if (err.code === 'auth/wrong-password') {
          // dispatch error for wrong password
          return dispatch({ type: 'INCORRECT_PASSWORD' });
        } else {
          // another error occured (should be handling all Firebase errors here)
          return dispatch({ type: 'ERROR_PASSWORD' });
        }
      }
      // enable button again
      dispatch({ type: 'SET_LOADING', payload: false });
      // send user to alpha dashboard
      history.push('/alpha');
    }
  };

  // when user presses 'enter' for email submission
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
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
            className={`inputText inputText--sm ${computedClassName}`}
            name="email"
            type="email"
            spellCheck="false"
            ref={emailRef}
            required
            onKeyDown={handleKeyPress}
            placeholder="Email Address"
          />
          {state.emailError && (
            <p className="loginForm__container__field__error">{state.emailError}</p>
          )}

          <input
            // style={{ marginTop: '2rem' }}
            className={`inputText inputText--sm ${computedClassNamePasswordError}`}
            name="password"
            type="password"
            spellCheck="false"
            ref={passwordRef}
            required
            onKeyDown={handleKeyPress}
            placeholder="Password"
          />
          {state.passwordError && (
            <p className="loginForm__container__field__error">{state.passwordError}</p>
          )}

          <div className="loginForm__container__field__reset">
            <Link className="loginForm__container__field__reset__link" to="/password-reset">
              Forgot Password?
            </Link>
          </div>

          <div className="loginForm__container__field__btn">
            <div className="button button--sm" onClick={handleLogin}>
              LOGIN
            </div>
          </div>
          <div className="loginForm__container__field__signin">
            <div className="loginForm__container__field__btn__googleSignin" onClick={handleSignIn}>
              <svg
                style={{
                  marginTop: '5px',
                  marginLeft: '10px',
                }}
                width="25"
                height="25"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M20.66 12.7c0-.61-.05-1.19-.15-1.74H12.5v3.28h4.58a3.91 3.91 0 0 1-1.7 2.57v2.13h2.74a8.27 8.27 0 0 0 2.54-6.24z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12.5 21a8.1 8.1 0 0 0 5.63-2.06l-2.75-2.13a5.1 5.1 0 0 1-2.88.8 5.06 5.06 0 0 1-4.76-3.5H4.9v2.2A8.5 8.5 0 0 0 12.5 21z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M7.74 14.12a5.11 5.11 0 0 1 0-3.23v-2.2H4.9A8.49 8.49 0 0 0 4 12.5c0 1.37.33 2.67.9 3.82l2.84-2.2z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12.5 7.38a4.6 4.6 0 0 1 3.25 1.27l2.44-2.44A8.17 8.17 0 0 0 12.5 4a8.5 8.5 0 0 0-7.6 4.68l2.84 2.2a5.06 5.06 0 0 1 4.76-3.5z"
                    fill="#EA4335"
                  ></path>
                </g>
              </svg>
              <span className="loginForm__container__field__btn__googleSign__text">
                Sign in with Google
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
