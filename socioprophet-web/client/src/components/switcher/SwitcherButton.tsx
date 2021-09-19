import React from 'react';

interface Props {
  onClick: React.MouseEventHandler<SVGSVGElement>;
  theme: any;
}
const SwitcherButton: React.FC<Props> = ({ onClick, theme }: Props): JSX.Element => {
  const invertClass = theme === 'light' ? '' : 'invert';
  return (
    <>
      <svg
        className={`header__links__item__media ${invertClass}`}
        onClick={onClick}
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18 18h3v3h-3zm-7.5 0h3v3h-3zM3 18h3v3H3zm15-7.5h3v3h-3zm-7.5 0h3v3h-3zm-7.5 0h3v3H3zM18 3h3v3h-3zm-7.5 0h3v3h-3zM3 3h3v3H3z"></path>
      </svg>
    </>
  );
};

export default SwitcherButton;
