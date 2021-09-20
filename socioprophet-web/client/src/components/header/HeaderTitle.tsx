import React from 'react';
import fish from '../../../public/images/fishCropFinal.gif';

interface Props {
  dashboard?: boolean;
  themeClass: string;
  children: React.ReactNode;
}

const HeaderTitle: React.FC<Props> = ({ dashboard, themeClass, children }: Props): JSX.Element => {
  return (
    <div className="header__logo">
      {!dashboard && themeClass === 'darkTheme' && <FishLogo />}
      <Title themeClass={themeClass}>{children}</Title>
    </div>
  );
};

const FishLogo = (): JSX.Element => {
  return (
    <div className="header__logo__fish">
      <img src={fish} width="35px" height="30px" alt="fish bowl" />
    </div>
  );
};

interface TitleProps {
  themeClass: string;
  children: React.ReactNode;
}
const Title = ({ themeClass, children }: TitleProps): JSX.Element => {
  return (
    <a className="header__logo__title" href="/">
      <strong className={themeClass}>{children}</strong>
    </a>
  );
};
export default HeaderTitle;
