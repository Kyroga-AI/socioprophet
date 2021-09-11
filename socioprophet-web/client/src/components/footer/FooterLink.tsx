import React from 'react';
import { getTheme } from '../../theme/utils/theme';

interface Props {
  className?: string;
  link: string;
  target?: string;
  iconClass?: string;
  label?: string;
}
const FooterLink: React.FC<Props> = ({
  className,
  link,
  target,
  iconClass,
  label,
}: Props): JSX.Element => {
  let themeClass: string = getTheme();
  return (
    <React.Fragment>
      {iconClass ? (
        <a className={`footer__social__btn ${className} ${themeClass}`} href={link} target={target}>
          <i className={iconClass} aria-hidden="true"></i>
        </a>
      ) : (
        <a
          className={`footer__references__link ${className} ${themeClass}`}
          href={link}
          target={target}
        >
          <strong>{label}</strong>
        </a>
      )}
    </React.Fragment>
  );
};

export default FooterLink;
