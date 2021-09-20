import React from 'react';

interface Props {
  className: string;
  reference: React.MutableRefObject<HTMLDivElement>;
  children: React.ReactNode;
}
const SwitcherWrapper: React.FC<Props> = ({
  className,
  reference,
  children,
}: Props): JSX.Element => {
  return (
    <div className={`${className}`} ref={reference}>
      {children}
    </div>
  );
};

export default SwitcherWrapper;
