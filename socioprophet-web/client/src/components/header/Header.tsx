import React, { useState, useRef, useEffect } from 'react';
import Switcher from '../header/switcher/Switcher';
import './scss/header.scss';
import fish from '../../../public/images/fishCropFinal.gif';
// import menu from '../../../public/images/menu-icon.png';
import { useDarkMode } from '../../theme/ThemeContext';

interface Props {
  children?: React.ReactNode;
  dashboard?: boolean;
  onPress?: React.MouseEventHandler;
}

const Header = ({ children, dashboard }: Props) => {
  const [switcherExpanded, setSwitcherExpanded] = useState(false);
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

  const switcherRef = useRef<HTMLDivElement>(null);
  const switcherContentsRef = useRef<HTMLDivElement>(null);

  const expandedClass = switcherExpanded ? 'header__switcher--expanded' : '';
  const invertClass = theme === 'light' ? '' : 'invert';

  const toggleSwitcher = () => {
    setSwitcherExpanded(switcherExpanded === false ? true : false);
  };

  const handleClick = (e: any) => {
    if (switcherRef.current.contains(e.target) || switcherContentsRef.current.contains(e.target)) {
      return;
    }
    setSwitcherExpanded(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className="header">
      <nav className={themeClass}>
        <div className="header__logo">
          {/* {dashboard && (
            <div className={`header__nav ${invertClass}`} onClick={onPress}>
              <img src={menu} width="35px" height="30px" alt="side menu toggle" />
            </div>
          )} */}

          {!dashboard && themeClass === 'darkTheme' && (
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
            <div className={`header__links__item blog ${themeClass}`}>
              <a
                className={`header__links__item__blog ${themeClass}`}
                href="https://socioprophet.blog"
                target="_blank"
                rel="noopener"
              >
                <span className="blog-label">Blog</span>
                <span className="blog-icon">
                  <i className="fa fa-medium" aria-hidden="true"></i>
                </span>
              </a>
            </div>

            <div className={`header__links__item media ${themeClass}`} ref={switcherRef}>
              <svg
                className={`header__links__item__media ${invertClass}`}
                onClick={toggleSwitcher}
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18 18h3v3h-3zm-7.5 0h3v3h-3zM3 18h3v3H3zm15-7.5h3v3h-3zm-7.5 0h3v3h-3zm-7.5 0h3v3H3zM18 3h3v3h-3zm-7.5 0h3v3h-3zM3 3h3v3H3z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className={`header__switcher ${expandedClass}`} ref={switcherContentsRef}>
          <Switcher />
        </div>
      </nav>
    </div>
  );
};

export default Header;
