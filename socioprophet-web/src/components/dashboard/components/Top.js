import React, { Component, useRef } from 'react';
import { render } from "react-dom";
import ReactDOM from "react-dom";

// Carbon UI Components
import Search20 from "@carbon/icons-react/lib/search/20";
import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer";
import { Content, HeaderMenuButton, HeaderName } from "carbon-components-react/lib/components/UIShell";
import { HeaderNavigation, Header, HeaderMenu, HeaderMenuItem } from "carbon-components-react/lib/components/UIShell";
import { HeaderGlobalBar, HeaderGlobalAction } from "carbon-components-react/lib/components/UIShell";
import { SkipToContent, SideNav, SideNavItems, SideNavLink, SideNavMenu, SideNavMenuItem } from "carbon-components-react/lib/components/UIShell";
import { HeaderPanel, Switcher, SwitcherItem, SwitcherDivider } from "carbon-components-react/lib/components/UIShell";
import { HamburgerMenu } from 'react-hamburger-menu';

import "./styles.css";

class Top extends Component {
  render() {

    const Fade16 = () => (
      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" className="invert">
        <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
      </svg>
    );

    const DeviceIcon = () => (
      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" aria-hidden="true" className="invert">
        <path d="M11 11v10h10V11zm8 8h-6v-6h6z"></path>
        <path d="M30 13v-2h-4V8a2 2 0 0 0-2-2h-3V2h-2v4h-6V2h-2v4H8a2 2 0 0 0-2 2v3H2v2h4v6H2v2h4v3a2 2 0 0 0 2 2h3v4h2v-4h6v4h2v-4h3a2 2 0 0 0 2-2v-3h4v-2h-4v-6zm-6 11H8V8h16z"></path>
      </svg>
    );

    const SwitcherIcon = () => (
      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="invert">
        <path d="M18 18h3v3h-3zm-7.5 0h3v3h-3zM3 18h3v3H3zm15-7.5h3v3h-3zm-7.5 0h3v3h-3zm-7.5 0h3v3H3zM18 3h3v3h-3zm-7.5 0h3v3h-3zM3 3h3v3H3z"></path>
      </svg>
    );

    const UsersIcon = () => (
      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" aria-hidden="true" className="invert">
        <path d="M31 30h-2v-3a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v3h-2v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5zm-7-18a3 3 0 1 1-3 3 3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm-9 12h-2v-3a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v3H1v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5zM8 4a3 3 0 1 1-3 3 3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5 5 5 0 0 0-5-5z"></path>
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
                <HeaderMenuItem href="#">Enconomics</HeaderMenuItem>
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

              <HeaderMenu aria-label="Data & Analytics" menuLinkName="Data & Analytics">
                <HeaderMenuItem href="#">Trending Infographics</HeaderMenuItem>
                <HeaderMenuItem href="#">Charts & Graphs</HeaderMenuItem>
                <HeaderMenuItem href="#">Maps & Interactives</HeaderMenuItem>
                <HeaderMenuItem href="#">Custom Analytics</HeaderMenuItem>
              </HeaderMenu>

            </HeaderNavigation>

            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="App Switcher" onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}>
                <svg width="20" height="20"><title>user</title><path d="M6 15.745A6.968 6.968 0 0 0 10 17a6.968 6.968 0 0 0 4-1.255V15.5a2.5 2.5 0 0 0-2.5-2.5h-3A2.5 2.5 0 0 0 6 15.5v.245zm-.956-.802A3.5 3.5 0 0 1 8.5 12h3a3.5 3.5 0 0 1 3.456 2.943 7 7 0 1 0-9.912 0zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path><path d="M10 9.841a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path></svg>
              </HeaderGlobalAction>
            </HeaderGlobalBar>

            <HeaderPanel aria-label="Header Panel" isCollapsible expanded={isSideNavExpanded}>
              <Switcher role="menu" aria-label="Switcher Container">
                <SwitcherItem isSelected aria-label="Link 1" href="#">
                  Link 1
                </SwitcherItem>
                <SwitcherDivider />
                <SwitcherItem href="#" aria-label="Link 2">
                  Link 2
                </SwitcherItem>
                <SwitcherItem href="#" aria-label="Link 3">
                  Link 3
                </SwitcherItem>
                <SwitcherItem href="#" aria-label="Link 4">
                  Link 4
                </SwitcherItem>
                <SwitcherItem href="#" aria-label="Link 5">
                  Link 5
                </SwitcherItem>
                <SwitcherDivider />
                <SwitcherItem href="#" aria-label="Link 6">
                  Link 6
                </SwitcherItem>
              </Switcher>
            </HeaderPanel>`

            <SideNav
              aria-label="Side navigation"
              isRail
              expanded={isSideNavExpanded}>

              <SideNavItems className="black">

                <SideNavMenu renderIcon={UsersIcon} title="User Dashboard">
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>

                <SideNavMenu renderIcon={SwitcherIcon} title="Portfolios & Watch Lists">
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>

                <SideNavMenu renderIcon={DeviceIcon} title="Algorithmic Trading">
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>

                <SideNavMenu renderIcon={Fade16} title="Economic Prophet">
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>

                <SideNavMenu renderIcon={Fade16} title="Ontology & Epistemology">
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>

                <SideNavMenu renderIcon={Fade16} title="NLP & Data Extraction">
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>

                <SideNavMenu renderIcon={Fade16} title="Sentiment Analytics">
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>

                <SideNavMenu renderIcon={Fade16} title="Entity Analytics">
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>

                <SideNavMenu renderIcon={Fade16} title="Behavioral Analytics">
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>

                <SideNavMenu renderIcon={Fade16} title="Simulations">
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>

              </SideNavItems>

            </SideNav>

          </Header>
        )}

      />
    );
  }
}

export default Top;
