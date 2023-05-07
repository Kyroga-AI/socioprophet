import React from 'react';
import './scss/button.scss';

export interface ButtonProps {
  label: string;
  size: 'sm' | 'lg';
  borderColor: 'light' | 'dark';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export const Button = ({ label, size, borderColor, onClick }: ButtonProps): JSX.Element => {
  return (
    <div className={`button ${size} ${borderColor}`} onClick={onClick}>
      {label}
    </div>
  );
};
