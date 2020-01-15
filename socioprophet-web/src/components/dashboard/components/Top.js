import React, { Component, useRef } from 'react';
import { render } from "react-dom";
import ReactDOM from "react-dom";

// Carbon UI Components
import Search20 from "@carbon/icons-react/lib/search/20";
import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer";
import { Content, Header, HeaderMenuButton, HeaderName } from "carbon-components-react/lib/components/UIShell";
import { HeaderNavigation, HeaderMenu, HeaderMenuItem } from "carbon-components-react/lib/components/UIShell";
import { HeaderGlobalBar, HeaderGlobalAction } from "carbon-components-react/lib/components/UIShell";
import { SkipToContent, SideNav, SideNavItems, SideNavLink, SideNavMenu, SideNavMenuItem } from "carbon-components-react/lib/components/UIShell";
import { HamburgerMenu } from 'react-hamburger-menu';


import "./styles.css";

class Top extends Component {

  render() {

    const Fade16 = () => (
      <svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true">
        <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
      </svg>
    );



    return (

        <HeaderContainer

          render={({ isSideNavExpanded, onClickSideNavExpand }) => (

              <Header aria-label="SocioProphet Platform">

                <SkipToContent />

                <HeaderMenuButton
                    aria-label="Open menu"
                    isCollapsible
                    onClick={onClickSideNavExpand}
                    isActive={isSideNavExpanded}
                />

                <HeaderName href="#" prefix="">
                  SocioProphet
                </HeaderName>

                <HeaderNavigation aria-label="SocioProphet Platform">

                  <HeaderMenu aria-label="News & Events" menuLinkName="News & Events">
                    <HeaderMenuItem href="#">All News & Events</HeaderMenuItem>
                    <HeaderMenuItem href="#">Recent Events</HeaderMenuItem>
                    <HeaderMenuItem href="#">Event Calendar</HeaderMenuItem>
                  </HeaderMenu>

                  <HeaderMenu aria-label="Law & Regulation" menuLinkName="Law & Regulation">
                    <HeaderMenuItem href="#">International Law</HeaderMenuItem>
                    <HeaderMenuItem href="#">Federal Law</HeaderMenuItem>
                    <HeaderMenuItem href="#">State & Local Law</HeaderMenuItem>
                    <HeaderMenuItem href="#">Statutory Law</HeaderMenuItem>
                    <HeaderMenuItem href="#">Case Law</HeaderMenuItem>
                  </HeaderMenu>

                  <HeaderMenu aria-label="People & Society" menuLinkName="People & Society">
                    <HeaderMenuItem href="#">People Search</HeaderMenuItem>
                    <HeaderMenuItem href="#">Government & Politics</HeaderMenuItem>
                    <HeaderMenuItem href="#">Population & Demographics</HeaderMenuItem>
                    <HeaderMenuItem href="#">Polls & Opinion</HeaderMenuItem>
                    <HeaderMenuItem href="#">Health & Medicine</HeaderMenuItem>
                    <HeaderMenuItem href="#">Art & Culture</HeaderMenuItem>
                    <HeaderMenuItem href="#">Social Networks</HeaderMenuItem>
                  </HeaderMenu>

                  <HeaderMenu aria-label="Economy & Industry" menuLinkName="Economy & Industry">
                    <HeaderMenuItem href="#">Macro Enconomics</HeaderMenuItem>
                    <HeaderMenuItem href="#">Micro Economics</HeaderMenuItem>
                    <HeaderMenuItem href="#">Labor Economics</HeaderMenuItem>
                    <HeaderMenuItem href="#">Industry & Commerce</HeaderMenuItem>
                    <HeaderMenuItem href="#">Farming & Agriculture</HeaderMenuItem>
                    <HeaderMenuItem href="#">Mining & Extraction</HeaderMenuItem>
                    <HeaderMenuItem href="#">Processing & Refinement</HeaderMenuItem>
                    <HeaderMenuItem href="#">Manufacturing & Assembly</HeaderMenuItem>
                    <HeaderMenuItem href="#">Technology & Information</HeaderMenuItem>
                    <HeaderMenuItem href="#">Logistics  Transport</HeaderMenuItem>
                  </HeaderMenu>

                  <HeaderMenu aria-label="Capital & Markets" menuLinkName="Capital & Markets">
                    <HeaderMenuItem href="#">Indicies & Funds</HeaderMenuItem>
                    <HeaderMenuItem href="#">Equities & Preferreds</HeaderMenuItem>
                    <HeaderMenuItem href="#">Debt & Fixed Income</HeaderMenuItem>
                    <HeaderMenuItem href="#">Options & Derivatives</HeaderMenuItem>
                    <HeaderMenuItem href="#">Currency / FX</HeaderMenuItem>
                    <HeaderMenuItem href="#">Crypto / Digital</HeaderMenuItem>
                    <HeaderMenuItem href="#">Real-Assets</HeaderMenuItem>
                    <HeaderMenuItem href="#">Alternative Investments</HeaderMenuItem>
                  </HeaderMenu>

                  <HeaderMenu aria-label="Weather & Natural Resources" menuLinkName="Weather & Natural Resources">
                    <HeaderMenuItem href="#">Weather & Forecast</HeaderMenuItem>
                    <HeaderMenuItem href="#">Climate & Environment</HeaderMenuItem>
                    <HeaderMenuItem href="#">Natural Resources</HeaderMenuItem>
                  </HeaderMenu>

                  <HeaderMenu aria-label="Maps & Analytics" menuLinkName="Maps & Analytics">
                    <HeaderMenuItem href="#">Trending Infographics</HeaderMenuItem>
                    <HeaderMenuItem href="#">Charts & Graphs</HeaderMenuItem>
                    <HeaderMenuItem href="#">Maps & Interactives</HeaderMenuItem>
                    <HeaderMenuItem href="#">Custom Analytics</HeaderMenuItem>
                  </HeaderMenu>

                </HeaderNavigation>

                <HeaderGlobalBar>
                  <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
                    <AppSwitcher20 />
                  </HeaderGlobalAction>
                </HeaderGlobalBar>

                <SideNav
                    aria-label="Side navigation"
                    isRail
                    expanded={isSideNavExpanded}>
                  <SideNavItems>
                    <SideNavMenu renderIcon={Fade16} title="Category Title">
                      <SideNavMenuItem href="#">
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem
                          aria-current="page"
                          href="#">
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem href="#">
                        Link
                      </SideNavMenuItem>
                    </SideNavMenu>
                    <SideNavMenu renderIcon={Fade16} title="Category title">
                    <SideNavMenuItem href="#">
                      Link
                    </SideNavMenuItem>
                    <SideNavMenuItem
                      aria-current="page"
                      href="#">
                      Link
                    </SideNavMenuItem>
                    <SideNavMenuItem href="#">
                      Link
                    </SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavMenu renderIcon={Fade16} title="Category title">
                    <SideNavMenuItem href="#">
                      Link
                    </SideNavMenuItem>
                    <SideNavMenuItem
                      aria-current="page"
                      href="#">
                      Link
                    </SideNavMenuItem>
                    <SideNavMenuItem href="#">
                      Link
                    </SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavLink renderIcon={Fade16} href="#">
                    Link
                  </SideNavLink>
                  <SideNavLink renderIcon={Fade16} href="#">
                    Link
                  </SideNavLink>
                </SideNavItems>
              </SideNav>

            </Header>
          )}
        />
    );
  }
}

export default Top;
