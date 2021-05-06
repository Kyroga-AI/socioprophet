import React, { useEffect, useState, useReducer, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../header/Header';
import TickerFeed from '../ticker-feed/TickerFeed';
import ScrollSection from './ScrollSection';

import Footer from '../footer/Footer';

import Login from './forms/login/Login';
import Signin from './forms/signin/Signin';
import { useAuth } from '../../authentication/contexts/AuthContext';

// main SocioProphet logo image
import logo from '../../../public/images/mothership-logo.png';

// email validator
import { validateEmail } from './validate-email/validateEmail';
// reducer
import { emailReducer } from '../../reducers/emailReducer';
// styles
import './scss/landing.scss';

// state for reducer

const emailState = {
  loading: false,
  error: '',
};

const Landing = () => {
  // states
  const [state, dispatch] = useReducer(emailReducer, emailState);
  const [isExpanded, setExpanded] = useState(false);
  const [login, setLogin] = useState(false);
  const [signin, setSignin] = useState(false);

  // refs
  const emailRef = useRef<HTMLInputElement>(null);
  // other hooks
  const history = useHistory();
  // custom hooks
  const { currentUser, setEmail, emailAddress, getSigninResult } = useAuth();

  // computed css classes for invalid email error message
  const computedClassName = state.error
    ? 'landing__container__main__email__field__input--error'
    : '';

  const togglePanelClassName = isExpanded ? 'landing__header__panel--expanded' : '';

  // toggles the side login panel
  const loginToggle = () => {
    setExpanded(isExpanded === false ? true : false);
    if (signin || isExpanded) {
      setSignin(false);
      setLogin(false);
    } else {
      setLogin(login === false ? true : false);
    }
  };

  // toggles the side login panel
  const signinToggle = () => {
    setExpanded(isExpanded === false ? true : false);
    if (login && isExpanded) {
      setSignin(false);
      setLogin(false);
    } else {
      setSignin(signin === false ? true : false);
    }
  };

  // handles the email submission and sends user to survey
  const handleEmail = async () => {
    if (emailRef.current) {
      // set loading to disable 'begin' button
      dispatch({ type: 'SET_LOADING', payload: true });

      // check for valid email and dispatch error accordingly
      if (!validateEmail(emailRef.current.value)) {
        console.log(state.isError);
        return dispatch({ type: 'EMAIL_ERROR', payload: true });
      }

      // if email check passes, reset any previously dispatched error
      dispatch({ type: 'EMAIL_ERROR', payload: false });

      // create email query string to pass to survey url
      const emailQuery = encodeURIComponent(emailRef.current.value);

      // set loading back to false and enable button again
      dispatch({ type: 'SET_LOADING', payload: false });

      // using custom useAuth hook to set the user email in global context
      setEmail(emailRef.current.value);

      // send to survey route
      history.push(`/get-started?email_address=${emailQuery}&via=site_signup`);
    }
  };

  // when user presses 'enter' for email submition
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleEmail();
    } else {
      return;
    }
  };

  useEffect(() => {
    const getGoogleSigninResult = async () => {
      try {
        await getSigninResult();
      } catch (err) {
        console.log(`Problem getting signin result: ${err}`);
      }
    };
    if (currentUser) {
      getGoogleSigninResult();
    }
  }, []);
  return (
    <div className="landing">
      <Header>
        {currentUser !== null ? (
          <div className="landing__header__login">
            <p className="landing__header__login__avatar" onClick={() => history.push('/alpha')}>
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </p>
          </div>
        ) : (
          <>
            <p className="landing__header__begin" onClick={signinToggle}>
              Registry
            </p>
            <p className="landing__header__login" onClick={loginToggle}>
              Login
            </p>
          </>
        )}
        <div className={`landing__header__panel ${togglePanelClassName}`}>
          <div className="landing__login__close">
            <p className="landing__login__close__btn" onClick={loginToggle}>
              &#10005;
            </p>
          </div>
          {login && <Login />}
          {signin && <Signin />}
        </div>
      </Header>
      <TickerFeed />
      <div className="landing__container">
        <div className="landing__container__main">
          <div className="landing__container__main__logo">
            <img src={logo} width="450px" height="77px" alt="socioprophet logo" />
          </div>
          <p className="landing__container__main__subtitle">
            <strong>Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.</strong>
          </p>
          {currentUser === null && (
            <>
              <div className="landing__container__main__email">
                <div className="landing__container__main__email__field">
                  {state.error && (
                    <p className="landing__container__main__email__field__error">{state.error}</p>
                  )}
                  <input
                    className={`inputText inputText--lg ${computedClassName}`}
                    name="email"
                    type="email"
                    spellCheck="false"
                    ref={emailRef}
                    value={emailAddress || ''}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    onKeyDown={handleKeyPress}
                    placeholder="ENTER EMAIL"
                  />
                </div>
                <div className="btn__container">
                  <div className="button button--lg" onClick={handleEmail}>
                    ALPHA REGISTRY
                  </div>
                </div>
              </div>
              <div className="landing__container__main__login">
                <p onClick={loginToggle} className="landing__container__main__login__text">
                  Already have an account?
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <ScrollSection />
      <Footer />
    </div>
  );
};

export default Landing;
