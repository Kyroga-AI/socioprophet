import React from 'react';
import { StyledLink } from './styles';

interface FooterLinkProps {
  href: string;
  label: string;
  target?: string;
}

const FooterLink = ({ href, label, target }: FooterLinkProps) => {
  return (
    <StyledLink href={href} target={target}>
      <strong>{label}</strong>
    </StyledLink>
  );
};

export default FooterLink;
