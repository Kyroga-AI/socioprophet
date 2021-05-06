import React, { useEffect, useState, useReducer, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../header/Header';
import { useAuth } from '../../authentication/contexts/AuthContext';

// email validator
import { validateEmail } from '../landing/validate-email/validateEmail';
// reducer
import { loginReducer } from '../../reducers/loginReducer';
//styles
import './scss/account.scss';

const loginState = {
  loading: false,
  authRequired: false,
  verified: false,
  verificationError: false,
  emailError: '',
  passwordError: '',
};

const Account = () => {
  // states
  const [state, dispatch] = useReducer(loginReducer, loginState);
  const [renderVerification, setRenderVerification] = useState(false);
  const [renderReset, setRenderReset] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  const [verified, setVerified] = useState(false);
  const [actionCode, setActionCode] = useState<string | null>();
  const [verificationError, setVerificationError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [linkSent, setLinkSent] = useState('');

  // refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
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
  const computedClassName = state.emailError ? 'verify__container__field__input__text--error' : '';
  // computed css classes for invalid password error message
  const computedClassNamePasswordError = state.passwordError
    ? 'verify__container__field__input__text--error'
    : '';

  // computed css classes for invalid password error message
  const computedClassNameNewPasswordError = newPasswordError
    ? 'verify__container__field__input__text--error'
    : '';

  const sendLink = async () => {
    try {
      await emailVerification();
    } catch (err) {
      return setLinkSent(
        'There is still a problem sending the verification link! Please try again in an hour.',
      );
    }
  };

  // handles email and password login submission
  const handleLogin = async () => {
    if (emailRef.current && passwordRef.current) {
      if (!validateEmail(emailRef.current.value)) {
        return dispatch({ type: 'MISSING_EMAIL', payload: true });
      }

      // if email check passes, reset any previously dispatched error
      dispatch({ type: 'MISSING_EMAIL', payload: false });

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
        // change state to render correct div
        setAuthRequired(false);
        // reload to run useEffect again after successful authentication
        window.location.reload();
      } catch (err) {
        // dispatch error for wrong password
        if (err.code === 'auth/wrong-password') {
          return dispatch({ type: 'INCORRECT_PASSWORD' });
        } else {
          // another error occured (should be handling all Firebase errors here)
          return dispatch({ type: 'ERROR_PASSWORD' });
        }
      }
      // enable button again
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // when user presses 'enter' for email submition
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    } else {
      return;
    }
  };

  // verifies reset password code and applies the new user selected password with confirmation
  const resetPassword = async () => {
    if (newPasswordRef.current) {
      // check password created is at least six characters long
      if (newPasswordRef.current.value.length < 6) {
        return setNewPasswordError('Password must be at least 6 characters long!');
      }
      // verify the reset password code
      try {
        await verifyResetCode(actionCode, newPasswordRef.current.value);
        window.location.href = '/alpha';
      } catch (err) {
        console.log(`There was a problem: ${err}`);
      }
    }
  };

  // applies the verification code to the current user email address
  const verifyEmail = async () => {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const actionCode = urlParams.get('oobCode');

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
    const mode = urlParams.get('mode');
    const actionCode = urlParams.get('oobCode');
    setActionCode(actionCode);
    // if invalid url, redirect user back to landing page
    if (actionCode === null) {
      history.push('/');
    }

    // if there is a code then an action is required
    if (mode === 'verifyEmail') {
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
    } else if (mode === 'resetPassword') {
      // want to render reset password logic
      setRenderReset(true);
    } else {
      // otherwise not an action to be handled - unlucky case
      history.push('/');
    }
  };

  useEffect(() => {
    // check if component renders email verification or password reset
    checkForCode();
  }, []);

  return (
    <div className="account">
      <Header />
      {renderReset && (
        <div className="account__reset">
          <div className="password-reset__container__field">
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
            {newPasswordError && (
              <p className="password-reset__container__field__error">{newPasswordError}</p>
            )}
          </div>

          <div className="button button--lg" onClick={resetPassword}>
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
                    {state.emailError && (
                      <p className="verify__container__field__error">{state.emailError}</p>
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
                    {state.passwordError && (
                      <p className="verify__container__field__error">{state.passwordError}</p>
                    )}
                  </div>
                </div>
                <div className="verify__container__btn">
                  <div className="button button--lg" onClick={handleLogin}>
                    VERIFY
                  </div>
                </div>
              </div>
            </div>
          )}
          {verificationError && (
            <div className="account__verify__container">
              <h2 className="verify__heading">hmm, looks like something went wrong</h2>
              <div className="verify__signin">
                <div className="button button--lg" onClick={sendLink}>
                  Resend Link
                </div>
                {linkSent && <h2 className="verify__heading verify--error">{linkSent}</h2>}
              </div>
            </div>
          )}
          {verified && (
            <div className="account__verify__container">
              <h2 className="verify__heading">Thanks for verifing your email address!</h2>
              <h4 className="verify__email">{currentUser.email}</h4>
              <div className="verify__signin">
                <div
                  className="button button--lg"
                  onClick={() => {
                    window.location.href = '/alpha';
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
