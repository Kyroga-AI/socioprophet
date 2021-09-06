import React from 'react';
import './scss/button.scss';

export interface Props {
  label: string;
  size: 'sm' | 'lg';
  borderColor: 'light' | 'dark';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export const Button: React.FC<Props> = ({
  label,
  size,
  borderColor,
  onClick,
}: Props): JSX.Element => {
  return (
    <div className={`button ${size} ${borderColor}`} onClick={onClick}>
      {label}
    </div>
  );
};
