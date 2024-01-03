import React from 'react';
import HeaderLink from '../headerLink/HeaderLink';
import { StyledNav, StyledHeaderTitle, StyledTitleLink, StyledNavLinks } from './styles';

const Header = () => {
  return (
    <StyledNav>
      <StyledHeaderTitle>
        <StyledTitleLink href="/">SocioProphet</StyledTitleLink>
      </StyledHeaderTitle>
      <StyledNavLinks>
        <HeaderLink isExternal link="https://github.com/socioprophet" label="GitHub" />
        <HeaderLink isExternal link="https://wiki.socioprophet.com" label="Wiki" />
        <HeaderLink isExternal link="https://socioprophet.blog" label="Blog" />
      </StyledNavLinks>
    </StyledNav>
  );
};

export default Header;
