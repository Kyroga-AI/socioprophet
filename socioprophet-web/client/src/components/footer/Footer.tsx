import React from 'react';

import { useDarkMode } from '../dashboard/profile/ThemeContext';

// styles
import './scss/footer.scss';

const Footer = () => {
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
    <>
      <div className="footer__responsive">
        <a className="footer__responsive__link" href="mailto:socioprophet@gmail.com" target="_top">
          <strong>Contact</strong>
        </a>
        <a className="footer__responsive__link" href="https://socioprophet.com/privacy-policy">
          <strong>Privacy</strong>
        </a>
        <a className="footer__responsive__link" href="https://socioprophet.com/terms-of-use">
          <strong>Terms of Use</strong>
        </a>
        <a
          className="footer__responsive__link"
          href="https://gitter.im/socioprophet/"
          target="_blank"
          rel="noopener"
        >
          <strong>Support</strong>
        </a>
      </div>
      {/* Footer Block */}
      <footer className={`footer ${themeClass}`}>
        <div className="footer__social">
          <a
            className={`footer__social__btn ${themeClass}`}
            href="https://twitter.com/socioprophet"
            target="_blank"
            rel="noopener"
          >
            <i className="fa fa-twitter-square" aria-hidden="true"></i>
          </a>
          <a
            className={`footer__social__btn ${themeClass}`}
            href="https://medium.com/@socioprophet"
            target="_blank"
            rel="noopener"
          >
            <i className="fa fa-medium" aria-hidden="true"></i>
          </a>
          <a
            className={`footer__social__btn ${themeClass}`}
            href="https://gitlab.com/socioprophet"
            target="_blank"
            rel="noopener"
          >
            <i className="fa fa-gitlab" aria-hidden="true"></i>
          </a>
        </div>
        <div className="footer__references">
          <a
            className={`footer__references__link ${themeClass}`}
            href="mailto:michael@socioprophet.ai"
            target="_top"
          >
            <strong>Contact</strong>
          </a>
          <a
            className={`footer__references__link ${themeClass}`}
            href="https://socioprophet.com/privacy-policy"
          >
            <strong>Privacy</strong>
          </a>
          <a
            className={`footer__references__link ${themeClass}`}
            href="https://socioprophet.com/terms-of-use"
          >
            <strong>Terms of Use</strong>
          </a>
          <a
            className={`footer__references__link ${themeClass}`}
            href="https://gitter.im/socioprophet/"
            target="_blank"
            rel="noopener"
          >
            <strong>Support</strong>
          </a>
        </div>
        <a className={`footer__copyright ${themeClass}`} href="#" target="_blank">
          &copy; {new Date().getFullYear()} SocioProphet
        </a>
      </footer>
    </>
  );
};

export default Footer;
