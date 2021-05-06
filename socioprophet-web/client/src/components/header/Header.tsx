import React from 'react';
import './scss/header.scss';
import fish from '../../../public/images/fishCropFinal.gif';

interface Props {
  children?: React.ReactNode;
}

const Header = ({ children }: Props) => {
  return (
    <div className="header">
      <nav>
        <div className="header__logo">
          <div className="header__logo__fish">
            <img src={fish} width="35px" height="30px" alt="fish bowl" />
          </div>
          <a className="header__logo__title" href="/">
            <strong>SocioProphet</strong>
          </a>
        </div>
        <div className="header__links">
          <div className="header__links__list">{children}</div>
          <div className="float">
            <a
              className="header__links__item"
              href="https://socioprophet.blog"
              target="_blank"
              rel="noopener"
            >
              Blog
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
