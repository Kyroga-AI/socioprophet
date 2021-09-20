import React from 'react';
import SwitcherGrid from './SwitcherGrid';
import SwitcherCell from './SwitcherCell';
import { cellArray } from './data/socialLinks';

import './scss/switcher.scss';

const SwitcherContents: React.FC = (): JSX.Element => {
  return (
    <div className="switcher">
      <SwitcherGrid>
        {cellArray.map((cell) => {
          return <SwitcherCell key={cell.link} link={cell.link} iconClass={cell.iconClass} />;
        })}
      </SwitcherGrid>
    </div>
  );
};

export default SwitcherContents;
