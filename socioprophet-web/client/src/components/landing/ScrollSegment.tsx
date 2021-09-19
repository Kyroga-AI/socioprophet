import React from 'react';

interface Props {
  className: string;
  heading: string;
  children: React.ReactNode;
}
const ScrollSegment: React.FC<Props> = ({ className, heading, children }: Props): JSX.Element => {
  return (
    <div className={`landing__more__section ${className}`}>
      <h2 className="landing__more__section__heading">{heading}</h2>
      {children}
    </div>
  );
};

export default ScrollSegment;
