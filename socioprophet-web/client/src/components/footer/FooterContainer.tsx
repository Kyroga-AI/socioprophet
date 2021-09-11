import React from 'react';

interface Props {
  className: string;
  children: React.ReactNode;
}
const FooterContainer: React.FC<Props> = ({ className, children }: Props): JSX.Element => {
  return <div className={className}>{children}</div>;
};

export default FooterContainer;
