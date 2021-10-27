import React from 'react';
// UI Components
import HeaderContainer from './HeaderContainer';
import HeaderTitle from './HeaderTitle';
import Switcher from '../switcher';
// custom hook
import { getTheme } from '../../theme/utils/theme';
import { useDarkMode } from '../../theme/ThemeContext';
// styles and images
import './scss/header.scss';

interface Props {
  children?: React.ReactNode;
  dashboard?: boolean;
  onPress?: React.MouseEventHandler;
}

const Header = ({ children, dashboard = false }: Props): JSX.Element => {
  // const [switcherExpanded, setSwitcherExpanded] = useState<boolean>(false);
  const { theme } = useDarkMode();
  let themeClass: string = getTheme();

  return (
    <div className="header">
      <HeaderContainer className={themeClass}>
        <HeaderTitle dashboard={dashboard} themeClass={themeClass}>
          SocioProphet
        </HeaderTitle>

        <div className="header__links">
          <div className="header__links__list">{children}</div>
          <div className="float">
            <div className={`header__links__item blog ${themeClass}`}>
              <a
                className={`header__links__item__blog ${themeClass}`}
                href="https://socioprophet.blog"
                target="_blank"
                rel="noopener"
              >
                <span className="blog-label">Blog</span>
                <span className="blog-icon">
                  <i className="fa fa-medium" aria-hidden="true"></i>
                </span>
              </a>
            </div>

            {/* <Switcher theme={theme} /> */}
          </div>
        </div>
      </HeaderContainer>
    </div>
  );
};

export default Header;
