import React from 'react';
import FooterLink from './FooterLink';
import { StyledFooter, StyledLinksWrapper, StyledCopyrightLink } from './styles';

const Footer = () => {
  return (
    <StyledFooter>
      <StyledLinksWrapper>
        <FooterLink href="mailto:michael@socioprophet.ai" target="_top" label="Contact" />
        <FooterLink href="https://socioprophet.com/privacy-policy" target="_top" label="Privacy" />
        <FooterLink
          href="https://socioprophet.com/terms-of-use"
          target="_top"
          label="Terms of Use"
        />
      </StyledLinksWrapper>
      <StyledCopyrightLink>&copy; {new Date().getFullYear()} SocioProphet</StyledCopyrightLink>
    </StyledFooter>
  );
};

export default Footer;
