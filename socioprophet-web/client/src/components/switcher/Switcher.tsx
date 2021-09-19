import React, { useEffect, useState, useRef } from 'react';
import SwitcherWrapper from './SwitcherWrapper';
import SwitcherButton from './SwitcherButton';
import SwitcherContents from './SwitcherContents';
import './scss/switcher.scss';

const Switcher = ({ theme }: any): JSX.Element => {
  const [switcherExpanded, setSwitcherExpanded] = useState<boolean>(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const switcherContentsRef = useRef<HTMLDivElement>(null);
  const expandedClass = switcherExpanded ? 'header__switcher--expanded' : '';

  const toggleSwitcher = (): void => {
    setSwitcherExpanded(switcherExpanded === false ? true : false);
  };

  const handleClick = (e: any): void => {
    if (switcherRef.current.contains(e.target) || switcherContentsRef.current.contains(e.target)) {
      return;
    }
    setSwitcherExpanded(false);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <React.Fragment>
      <SwitcherWrapper className="header__links__item media" reference={switcherRef}>
        <SwitcherButton onClick={toggleSwitcher} theme={theme} />
      </SwitcherWrapper>
      <SwitcherWrapper
        className={`header__switcher ${expandedClass}`}
        reference={switcherContentsRef}
      >
        <SwitcherContents />
      </SwitcherWrapper>
    </React.Fragment>
  );
};

export default Switcher;
