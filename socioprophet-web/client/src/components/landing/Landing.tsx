import React, { useEffect, useState, useReducer, useRef } from 'react';
import { useHistory } from 'react-router-dom';
// UI COMPONENTS
import Header from '../header/Header';
import Footer from '../footer/Footer';
import TickerFeed from '../ticker-feed';
import ScrollSection from './ScrollSection';
// UI AUTH COMPONENTS
import Login from './forms/login';
import Signin from './forms/signin/Signin';
// CUSTOM HOOKS
import { useAuth } from '../../authentication/contexts/AuthContext';
import { useDarkMode } from '../../theme/ThemeContext';
// HELPER FUNCTIONS
import { validateEmail } from './validate-email/validateEmail';
// STATE REDUCER
import { authReducer } from '../../reducers/authReducer';
// IMAGES AND STYLES
import logo from '../../../public/images/mothership-logo.png';
import './scss/landing.scss';

// storybook button...
// import { Button } from '../storybook/src/button';

// type for reducer state
type State = {
  loading: boolean;
  error: string;
};

// state for reducer
const authState: State = {
  loading: false,
  error: '',
};

// const PRODUCTION_URL: string = 'https://www.socioprophet.com';
// const LOCAL_HOST: string = 'http://localhost';
// const PORT: string = '8081';

const Landing: React.FC = (): JSX.Element => {
  // states
  const [state, dispatch] = useReducer(authReducer, authState);
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [logoutError, setLogoutError] = useState<string>('');
  const [signin, setSignin] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<boolean>(false);

  // refs
  const emailRefOne = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  // other hooks
  const history = useHistory();
  // custom hooks
  const { supabaseSession, logout } = useAuth();

  const { theme, componentMounted } = useDarkMode();

  let themeClass: string = '';

  if (!componentMounted) {
    return <div />;
  }
  if (theme === 'light') {
    themeClass = 'lightTheme';
  } else {
    themeClass = 'darkTheme';
  }

  // computed css classes for invalid email error message
  const computedClassName = state.error
    ? 'landing__container__main__email__field__input--error'
    : '';

  const togglePanelClassName = isExpanded ? 'landing__header__panel--expanded' : '';

  const toggleTooltip = tooltip ? 'tooltip tooltip--toggled' : '';
  // toggles the side login panel
  const loginToggle = (): void => {
    setExpanded(isExpanded === false ? true : false);
    if (signin || isExpanded) {
      setSignin(false);
      setLogin(false);
    } else {
      setLogin(login === false ? true : false);
    }
  };

  // toggles the side login panel
  const signinToggle = (): void => {
    setExpanded(isExpanded === false ? true : false);
    if (login && isExpanded) {
      setSignin(false);
      setLogin(false);
    } else {
      setSignin(signin === false ? true : false);

      if (signin === true) {
        setTooltip(true);
        setTimeout(() => {
          setTooltip(false);
        }, 2000);
      }
    }
  };

  // SUPABASE ROUTE...
  const supabaseEmailSignIn = async (): Promise<void> => {
    if (emailRefOne.current.value != '') {
      return;
    }
    if (emailRef.current) {
      // set loading to disable 'begin' button
      dispatch({ type: 'SET_LOADING' });

      // check for valid email and dispatch error accordingly
      if (!validateEmail(emailRef.current.value)) {
        return dispatch({ type: 'EMAIL_ERROR', payload: 'PLEASE ENTER A VALID EMAIL' });
      }

      // if email check passes, reset any previously dispatched error
      dispatch({ type: 'EMAIL_ERROR', payload: '' });

      // set loading back to false and enable button again
      dispatch({ type: 'SET_LOADING' });

      const emailQuery = encodeURIComponent(emailRef.current.value);

      history.push(`/submit?email_address=${emailQuery}`);
    }
  };

  // when user presses 'enter' for email submition
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      supabaseEmailSignIn();
    } else {
      return;
    }
  };

  // handles the user logout action
  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch {
      return setLogoutError('Failed to logout!');
    }
  };

  // const checkForAuthToken = (): void => {
  //   if (localStorage.getItem('supabase.auth.token')) {
  //     if (process.env.NODE_ENV === 'production') {
  //       window.location.href = `${PRODUCTION_URL}/alpha`;
  //     } else {
  //       window.location.href = `${LOCAL_HOST}:${PORT}/alpha`;
  //     }
  //   }
  // };

  useEffect(() => {
    if (supabaseSession) {
      // console.log(supabaseSession.user);
      history.push('/alpha');
    }
  });
  return (
    <div className="landing">
      <Header>
        {supabaseSession !== null ? (
          <>
            <div className={`landing__header__login ${themeClass}`}>
              <p className="landing__header__login__avatar" onClick={() => history.push('/alpha')}>
                <i className="fa fa-user-circle" aria-hidden="true"></i>
              </p>
            </div>
            <div className="landing__header__login" onClick={handleLogout}>
              Logout
            </div>
            {logoutError && <p className="logout-error">{logoutError}</p>}
          </>
        ) : (
          <>
            <p className="landing__header__begin" onClick={signinToggle}>
              Register
            </p>
            <p className="landing__header__login" onClick={loginToggle}>
              Login
            </p>
          </>
        )}
        <div className={`landing__header__panel ${togglePanelClassName} ${themeClass}`}>
          <div className="landing__login__close">
            <p className="landing__login__close__btn" onClick={loginToggle}>
              &#10005;
            </p>
          </div>
          {login && <Login />}
          {signin && <Signin onPress={signinToggle} />}
        </div>
      </Header>
      <TickerFeed />
      <div className="landing__container">
        <div className="landing__container__main">
          <div className="landing__container__main__logo">
            <img src={logo} width="450px" height="77px" alt="socioprophet logo" />
          </div>

          <p className="landing__container__main__subtitle">
            <strong>Human and machine symbiosis via a secure and trusted community.</strong>
          </p>
          {supabaseSession === null && (
            <>
              <div className="landing__container__main__email">
                <div className="landing__container__main__email__field">
                  {state.error && (
                    <p className="landing__container__main__email__field__error">{state.error}</p>
                  )}

                  <input
                    style={{ position: 'absolute', opacity: '0' }}
                    name="email"
                    value=""
                    onChange={(e) => e.target.value}
                    ref={emailRefOne}
                  />
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
                </div>
                <div className="btn__container">
                  <div className="tooltip">
                    <div className="button button--lg" onClick={supabaseEmailSignIn}>
                      REGISTER
                    </div>

                    <div className="tooltip--mobile">
                      <span className={`tooltiptext ${toggleTooltip}`}>
                        Sign up for the Alpha Release of SocioProphet!
                      </span>
                    </div>
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
