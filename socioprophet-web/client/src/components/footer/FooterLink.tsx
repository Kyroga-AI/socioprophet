import React from 'react';

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
  return (
    <React.Fragment>
      {iconClass ? (
        <a className={`footer__social__btn ${className}`} href={link} target={target}>
          <i className={iconClass} aria-hidden="true"></i>
        </a>
      ) : (
        <a className={`footer__references__link ${className}`} href={link} target={target}>
          <strong>{label}</strong>
        </a>
      )}
    </React.Fragment>
  );
};

export default FooterLink;
