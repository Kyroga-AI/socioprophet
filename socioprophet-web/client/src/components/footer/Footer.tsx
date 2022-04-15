import React from 'react';
// custom hook

// UI Components
import FooterContainer from './FooterContainer';
import FooterLink from './FooterLink';

// styles
import './scss/footer.scss';

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <FooterContainer className="footer__social">
        <FooterLink
          iconClass="fa fa-twitter-square"
          link="https://twitter.com/socioprophet"
          target="_blank"
        />
        <FooterLink
          iconClass="fa fa-medium"
          link="https://medium.com/@socioprophet"
          target="_blank"
        />
        <FooterLink
          iconClass="fa fa-gitlab"
          link="https://gitlab.com/socioprophet"
          target="_blank"
        />
        <FooterLink
          className="mobile-view"
          iconClass="fa fa-user-secret"
          link="https://socioprophet.com/privacy-policy"
        />
        <FooterLink
          className="mobile-view"
          iconClass="fa fa-file-text-o"
          link="https://socioprophet.com/terms-of-use"
        />
        <FooterLink
          className="mobile-view"
          iconClass="fa fa-question"
          link="mailto:michael@socioprophet.ai"
          target="_top"
        />
      </FooterContainer>
      <FooterContainer className="footer__references">
        <FooterLink link="mailto:michael@socioprophet.ai" target="_top" label="Contact" />
        <FooterLink link="https://socioprophet.com/privacy-policy" label="Privacy" />
        <FooterLink link="https://socioprophet.com/terms-of-use" label="Terms of Use" />
        <FooterLink link="https://gitter.im/socioprophet/" target="_blank" label="Support" />
      </FooterContainer>

      <a className="footer__copyright" href="#" target="_blank">
        &copy; {new Date().getFullYear()} SocioProphet
      </a>
    </footer>
  );
};

export default Footer;
