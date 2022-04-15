/**
 *
 *  File: Header.tsx (Storybook Component)
 *  Author: William Jones
 *  Desciption: Common Header Component
 *
 */
import React from 'react';
import './scss/header.scss';

export interface HeaderProps {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <nav className="header">
      <div className="header__main">
        <h1 className="header__main__title">
          <a className="header__main__title__link" href="/">
            SocioProphet
          </a>
        </h1>
      </div>
      <div className="header__links">
        <div className="header__links__list">{children}</div>
      </div>
    </nav>
  );
};
