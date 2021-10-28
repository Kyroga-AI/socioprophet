import React, { useState, useEffect } from 'react';
import { useAuth } from '../../authentication/contexts/AuthContext';
import Header from '../header/Header';
import TickerFeed from '../ticker-feed';
import Profile from './profile/Profile';
import Footer from '../footer/Footer';
// import { Dnd } from '../storybook/src/dnd';

import { useDarkMode } from '../../theme/ThemeContext';

// main SocioProphet logo image
import logo from '../../../public/images/mothership-logo.png';

// styles
import './scss/alpha.scss';

const Alpha = () => {
  // states
  const [isExpanded, setExpanded] = useState(false);
  // other hooks
  const { theme, componentMounted } = useDarkMode();

  const { supabaseSession, doesUserExist, addNewUser } = useAuth();
  let themeClass = '';

  if (!componentMounted) {
    return <div />;
  }
  if (theme === 'light') {
    themeClass = 'lightTheme';
  } else {
    themeClass = 'darkTheme';
  }

  const togglePanelClassName = isExpanded ? 'alpha__header__panel--expanded' : '';

  // toggles the side login panel
  const loginToggle = () => {
    setExpanded(isExpanded === false ? true : false);
  };

  const checkIfNewUser = async (email: string): Promise<void> => {
    try {
      let existingUser = await doesUserExist();

      // prevent user from signup action if email already exists...
      if (!existingUser) {
        addNewUser(email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // check if user exists... in datatbase
    const userEmail = supabaseSession.user.email;

    checkIfNewUser(userEmail);
  }, []);

  return (
    <div className="alpha">
      <Header>
        <div className={`alpha__header__login ${themeClass}`}>
          <p className="alpha__header__login__avatar" onClick={loginToggle}>
            <i className="fa fa-user-circle" aria-hidden="true"></i>
          </p>
        </div>
        <div className={`alpha__header__panel ${togglePanelClassName} ${themeClass}`}>
          <div className="alpha__login__close">
            <p className="alpha__login__close__btn" onClick={loginToggle}>
              &#10005;
            </p>
          </div>
          <Profile />
        </div>
      </Header>
      <TickerFeed />
      <div className="alpha__container">
        <div className="alpha__container__logo">
          <img src={logo} width="450px" height="77px" />
        </div>
        <p className="alpha__container__subtitle">
          <strong>Profile Coming Soon. </strong>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Alpha;
