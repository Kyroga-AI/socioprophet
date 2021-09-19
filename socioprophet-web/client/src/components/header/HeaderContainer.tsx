import React from 'react';

interface Props {
  className: string;
  children?: React.ReactNode;
}
const HeaderContainer: React.FC<Props> = ({ className, children }: Props): JSX.Element => {
  return <nav className={className}>{children}</nav>;
};

export default HeaderContainer;
