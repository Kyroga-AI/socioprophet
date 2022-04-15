/**
 *
 *  File: Header.tsx
 *  Author: William Jones
 *  Desciption: Common Header Component
 *
 */
import React from 'react';

import './scss/header.scss';

interface HeaderProps {
  children?: React.ReactNode;
  onPress?: React.MouseEventHandler;
}

const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <nav className="header">
      <h1 className="header__title">
        <a className="header__title__link" href="/">
          SocioProphet
        </a>
      </h1>

      <div className="header__links">
        <div className="header__links__list">{children}</div>
        <div className="float">
          <div className="header__links__item blog">
            <a
              className="header__links__item__blog"
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
        </div>
      </div>
    </nav>
  );
};

export default Header;
