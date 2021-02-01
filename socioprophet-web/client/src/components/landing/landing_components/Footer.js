import React from "react";

import "./styles/footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer__responsive">
        <a
          className="footer__responsive__link"
          href="mailto:socioprophet@gmail.com"
          target="_top"
        >
          <strong>Contact</strong>
        </a>
        <a className="footer__responsive__link" href="#" target="_blank">
          <strong>Privacy</strong>
        </a>
        <a className="footer__responsive__link" href="#" target="_blank">
          <strong>Terms of Use</strong>
        </a>
        <a
          className="footer__responsive__link"
          href="https://gitter.im/socioprophet/"
          target="_blank"
        >
          <strong>Support</strong>
        </a>
      </div>
      {/* Footer Block */}
      <footer className="footer">
        <div className="footer__social">
          <a
            className="footer__social__btn"
            href="https://twitter.com/socioprophet"
            target="_blank"
          >
            <i className="fa fa-twitter-square" aria-hidden="true"></i>
          </a>
          <a
            className="footer__social__btn"
            href="https://medium.com/@socioprophet"
            target="_blank"
          >
            <i className="fa fa-medium" aria-hidden="true"></i>
          </a>
          <a
            className="footer__social__btn"
            href="https://github.com/SocioProphet"
            target="_blank"
          >
            <i className="fa fa-github" aria-hidden="true"></i>
          </a>
        </div>
        <div className="footer__references">
          <a
            className="footer__references__link"
            href="mailto:michael@socioprophet.ai"
            target="_top"
          >
            <strong>Contact</strong>
          </a>
          <a className="footer__references__link" href="#" target="_blank">
            <strong>Privacy</strong>
          </a>
          <a className="footer__references__link" href="#" target="_blank">
            <strong>Terms of Use</strong>
          </a>
          <a
            className="footer__references__link"
            href="https://gitter.im/socioprophet/"
            target="_blank"
          >
            <strong>Support</strong>
          </a>
        </div>
        <a className="footer__copyright" href="#" target="_blank">
          &copy; {new Date().getFullYear()} SocioProphet
        </a>
      </footer>
    </div>
  );
};

export default Footer;
