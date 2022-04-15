import React from 'react';
import './scss/header.scss';

export interface HeaderProps {
  children?: React.ReactNode;
  onPress?: React.MouseEventHandler;
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
      {children}
    </nav>
  );
};
