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

    return (

        <HeaderContainer

          render={({ isSideNavExpanded, onClickSideNavExpand }) => (

              <Header aria-label="SocioProphet Platform">

              <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
              <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                <div className="spinner diagonal part-1"></div>
                <div className="spinner horizontal"></div>
                <div className="spinner diagonal part-2"></div>
              </label>
              <div id="sidebarMenu">
                <ul className="sidebarMenuInner">
                  <li>User Dashboard</li>
                  <li>Portfolios & Watch Lists</li>
                  <li>Algorithmic Trading</li>
                  <li>Economic Prophet</li>
                  <li>Ontology & Epistemology</li>
                  <li>NLP & Information Extraction</li>
                  <li>Sentiment Analytics</li>
                  <li>Entity Analytics</li>
                  <li>Behavioral Analytics</li>
                  <li>Mobile & App Development</li>
                  <li>Experiments & Simulations</li>
                </ul>
              </div>

                <HeaderName href="#" prefix="">SocioProphet</HeaderName>

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

                  <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
                    <Search20 />
                  </HeaderGlobalAction>

                  <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
                    <Notification20 />
                  </HeaderGlobalAction>

                  <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
                    <AppSwitcher20 />
                  </HeaderGlobalAction>

                </HeaderGlobalBar>



            </Header>

          )}

        />
    );
    var burgerMenu = document.getElementById('navpanel--toggle');

    //create vat with nav panel
    var navPanel = document.getElementById('navpanel');

    //when burgerMenu is clicked, toggle class that shows & hides the nav off & on
    //also when burgerMenu is clicked, add class so that hover state styles persist
    burgerMenu.addEventListener('click', function(e){
        e.preventDefault();
        navPanel.classList.toggle('navpanel--active');
        this.classList.toggle('icon--active');
    });
  }
}

export default Top;
