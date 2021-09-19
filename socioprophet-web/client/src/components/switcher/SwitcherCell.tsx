import React from 'react';

interface Props {
  link: string;
  iconClass: string;
}
const SwitcherCell: React.FC<Props> = ({ link, iconClass }: Props): JSX.Element => {
  return (
    <div className="cell">
      <a className="social" href={link} target="_blank">
        <i className={iconClass} aria-hidden="true"></i>
      </a>
    </div>
  );
};

export default SwitcherCell;
