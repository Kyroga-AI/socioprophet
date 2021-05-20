import React from 'react';
import './scss/header.scss';
import fish from '../../../public/images/fishCropFinal.gif';

import { useDarkMode } from '../dashboard/profile/ThemeContext';

interface Props {
  children?: React.ReactNode;
}

const Header = ({ children }: Props) => {
  const { theme, componentMounted } = useDarkMode();

  let themeClass = '';

  if (!componentMounted) {
    return <div />;
  }
  if (theme === 'light') {
    themeClass = 'lightTheme';
  } else {
    themeClass = 'darkTheme';
  }

  return (
    <div className="header">
      <nav className={themeClass}>
        <div className="header__logo">
          {themeClass === 'darkTheme' && (
            <div className="header__logo__fish">
              <img src={fish} width="35px" height="30px" alt="fish bowl" />
            </div>
          )}

          <a className="header__logo__title" href="/">
            <strong className={themeClass}>SocioProphet</strong>
          </a>
        </div>
        <div className="header__links">
          <div className="header__links__list">{children}</div>
          <div className="float">
            <div className={`header__links__item ${themeClass}`}>
              <a
                className={`header__links__item__blog ${themeClass}`}
                href="https://socioprophet.blog"
                target="_blank"
                rel="noopener"
              >
                Blog
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
