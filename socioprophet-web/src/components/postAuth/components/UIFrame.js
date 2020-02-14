import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import {
  HeaderContainer,
  Header,
  SkipToContent,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from "carbon-components-react/lib/components/UIShell";

import "./styles/frame.css";

class UIFrame extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    const Fade16 = () => (
      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
      </svg>
    );

    const DeviceIcon = () => (
      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M11 11v10h10V11zm8 8h-6v-6h6z"></path>
        <path d="M30 13v-2h-4V8a2 2 0 0 0-2-2h-3V2h-2v4h-6V2h-2v4H8a2 2 0 0 0-2 2v3H2v2h4v6H2v2h4v3a2 2 0 0 0 2 2h3v4h2v-4h6v4h2v-4h3a2 2 0 0 0 2-2v-3h4v-2h-4v-6zm-6 11H8V8h16z"></path>
      </svg>
    );

    const SwitcherIcon = () => (
      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 18h3v3h-3zm-7.5 0h3v3h-3zM3 18h3v3H3zm15-7.5h3v3h-3zm-7.5 0h3v3h-3zm-7.5 0h3v3H3zM18 3h3v3h-3zm-7.5 0h3v3h-3zM3 3h3v3H3z"></path>
      </svg>
    );

    const UsersIcon = () => (
      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M31 30h-2v-3a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v3h-2v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5zm-7-18a3 3 0 1 1-3 3 3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm-9 12h-2v-3a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v3H1v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5zM8 4a3 3 0 1 1-3 3 3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5 5 5 0 0 0-5-5z"></path>
      </svg>
    );

    const DashboardIcon = () => (
      <svg viewBox="0 0 24 24" className="bx--parent-item__link--taxonomy-icon" fillRule="evenodd">
        <path d="M0 0v24h24V0H0zm1 23V7h8v16H1zm22 0H10v-8h13v8zm0-9H10V7h13v7zM1 6V1h22v5H1z"></path>
      </svg>
    );

    const ResourceIcon = () => (
      <svg viewBox="0 0 18 18" className="bx--parent-item__link--taxonomy-icon" fillRule="evenodd">
        <path
        d="M15,0 L1.25,0 C0.5625,0 0,0.5625 0,1.25 L0,3.75 L0,5 L0,7.5 L0,8.75 L0,11.25 L0,12.5 L0,15 C0,15.6875 0.5625,16.25 1.25,16.25 L15,16.25 C15.6875,16.25 16.25,15.6875 16.25,15 L16.25,12.5 L16.25,11.25 L16.25,8.75 L16.25,7.5 L16.25,5 L16.25,3.75 L16.25,1.25 C16.25,0.5625 15.6875,0 15,0 Z M15,15 L1.25,15 L1.25,12.5 L15,12.5 L15,15 Z M15,11.25 L1.25,11.25 L1.25,8.75 L15,8.75 L15,11.25 Z M15,7.5 L1.25,7.5 L1.25,5 L15,5 L15,7.5 Z M1.25,3.75 L1.25,1.25 L15,1.25 L15,3.75 L1.25,3.75Z"></path>
      </svg>
    );

    const ChartIcon = () => (
      <svg viewBox="0 0 24 24" fillRule="evenodd" id="icon--logmet" width="100%" height="100%">
        <path d="M8.4,9.7l4.1,9.9l3.4-11.7l4.9-4.2C21.1,3.8,21.6,4,22,4c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2c0,0.3,0.1,0.6,0.2,0.8l-5.1,4.4l-2.7,9.3L8.6,7.3L1,21.5V0H0v24h24v-1H1.3L8.4,9.7z"></path>
      </svg>
    );

    const EconomicProphetIcon = () => (
      <svg viewBox="0 0 24 21" className="bx--parent-item__link--taxonomy-icon" fillRule="evenodd">
        <path d="M18 0H6L0 10.5 6 21h12l6-10.5L18 0zm4.5 10h-9.7l4.8-8.5 4.9 8.5zM6.3 19.4L1.4 11H11l-4.7 8.4zm5.6-7.8l4.8 8.4H7.2l4.7-8.4zm0-2.1L7 1h9.7l-4.8 8.5zM6.2 1.6L11 10H1.5l4.7-8.4zm11.5 18L12.8 11h9.8l-4.9 8.6z"></path>
      </svg>
    );

    const SchematicsIcon = () => (
      <svg viewBox="0 0 24 24" className="bx--parent-item__link--taxonomy-icon" fillRule="evenodd">
        <path d="M17.5,12c0-1.4-1.1-2.5-2.5-2.5H5C4.2,9.5,3.5,8.8,3.5,8V5.9c1.3-0.2,2.2-1.2,2.4-2.4h8.1C14.3,4.9,15.5,6,17,6c1.7,0,3-1.3,3-3s-1.3-3-3-3c-1.5,0-2.7,1.1-2.9,2.5H5.9C5.7,1.1,4.5,0,3,0C1.3,0,0,1.3,0,3c0,1.5,1.1,2.7,2.5,2.9V8c0,1.4,1.1,2.5,2.5,2.5h10c0.8,0,1.5,0.7,1.5,1.5v2H14v2.5H5.9C5.7,15.1,4.5,14,3,14c-1.7,0-3,1.3-3,3s1.3,3,3,3c1.5,0,2.7-1.1,2.9-2.5H14V20h6v-6h-2.5V12z M17,1c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2s-2-0.9-2-2C15,1.9,15.9,1,17,1z M1,3c0-1.1,0.9-2,2-2s2,0.9,2,2c0,1.1-0.9,2-2,2S1,4.1,1,3z M3,19c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C5,18.1,4.1,19,3,19zM19,19h-4v-4h4V19z"></path>
      </svg>
    );

    const FolderIcon = () => (
      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M5.6 3l1.7 1.7.3.3H14v8H2V3h3.6m0-1H2c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1H8L6.3 2.3c-.2-.2-.4-.3-.7-.3z"></path>
      </svg>
    )

    const SimIcon = () => (
      <svg viewBox="0 0 24 24" className="bx--parent-item__link--taxonomy-icon" fillRule="evenodd">
        <path d="M23 0H1C.5 0 0 .5 0 1v21c0 .6.5 1 1 1h22c.6 0 1-.5 1-1V1c0-.5-.5-1-1-1zM1 1h7v3H1V1zm22 21H1V5h22v17zm0-21v3H9V1h14z"></path>
        <circle cx="2.5" cy="2.5" r=".5"></circle>
        <circle cx="4.5" cy="2.5" r=".5"></circle>
        <circle cx="6.5" cy="2.5" r=".5"></circle>
        <path d="M7.5 8h-5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h5c.3 0 .5.2.5.5s-.2.5-.5.5zm3 3h-8c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h8c.3 0 .5.2.5.5s-.2.5-.5.5zm3-3h-4c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h4c.3 0 .5.2.5.5s-.2.5-.5.5zm1 3h-2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2c.3 0 .5.2.5.5s-.2.5-.5.5zm-10 3h-2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2c.3 0 .5.2.5.5s-.2.5-.5.5zm4 0h-1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1c.3 0 .5.2.5.5s-.2.5-.5.5zm11-3h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3c.3 0 .5.2.5.5s-.2.5-.5.5z"></path>
      </svg>
    )

    const { user } = this.props.auth;

    return (

      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (

          <Header aria-label="SocioProphet Platform">

            <SkipToContent />

            <HeaderName href="#" prefix="">
              SocioProphet
            </HeaderName>

            <HeaderNavigation aria-label="SocioProphet Platform">

              <HeaderMenuItem href="#">News & Events</HeaderMenuItem>
              <HeaderMenuItem href="#">Law & Regulation</HeaderMenuItem>
              <HeaderMenuItem href="#">People & Society</HeaderMenuItem>
              <HeaderMenuItem href="#">Economy & Industrys</HeaderMenuItem>
              <HeaderMenuItem href="#">Capital & Markets</HeaderMenuItem>
              <HeaderMenuItem href="#">Weather & Natural Resources</HeaderMenuItem>
              <HeaderMenuItem href="#">Data & Analytics</HeaderMenuItem>

            </HeaderNavigation>

            <HeaderGlobalBar>

              <HeaderGlobalAction aria-label="App Switcher">
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 18h3v3h-3zm-7.5 0h3v3h-3zM3 18h3v3H3zm15-7.5h3v3h-3zm-7.5 0h3v3h-3zm-7.5 0h3v3H3zM18 3h3v3h-3zm-7.5 0h3v3h-3zM3 3h3v3H3z"></path>
                </svg>
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="App Switcher" onClick={onClickSideNavExpand} isActive={isSideNavExpanded}>
                <svg width="20" height="20"><title>user</title><path d="M6 15.745A6.968 6.968 0 0 0 10 17a6.968 6.968 0 0 0 4-1.255V15.5a2.5 2.5 0 0 0-2.5-2.5h-3A2.5 2.5 0 0 0 6 15.5v.245zm-.956-.802A3.5 3.5 0 0 1 8.5 12h3a3.5 3.5 0 0 1 3.456 2.943 7 7 0 1 0-9.912 0zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path><path d="M10 9.841a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path></svg>
              </HeaderGlobalAction>
            </HeaderGlobalBar>

            <HeaderPanel aria-label="Header Panel" expanded={isSideNavExpanded}>
              <Switcher role="menu" aria-label="Switcher Container">
                <SwitcherItem isSelected aria-label="account name" href="#">
                  Account Name
                </SwitcherItem>
                <SwitcherDivider />
                <SwitcherItem href="#" aria-label="profile">
                  Profile
                </SwitcherItem>
                <SwitcherDivider />
                <SwitcherItem href="#" aria-label="preferences">
                  Preferences
                </SwitcherItem>
                <SwitcherDivider />
                <SwitcherItem href="#" aria-label="set status">
                  Set Status
                </SwitcherItem>
                <SwitcherDivider />
                <SwitcherItem href="#" aria-label="your repositories">
                  Your Repositories
                </SwitcherItem>
                <SwitcherItem href="#" aria-label="your projects">
                  Your Projects
                </SwitcherItem>
                <SwitcherItem href="#" aria-label="your projects">
                  Help
                </SwitcherItem>
                <SwitcherItem href="#" aria-label="your projects">
                  Settings
                </SwitcherItem>
                <SwitcherItem href="#" aria-label="your projects">
                  Posts & Activities
                </SwitcherItem>
                <SwitcherItem href="#" aria-label="your projects">
                  My Network
                </SwitcherItem>
                <SwitcherItem href="#" aria-label="your projects">
                  Language
                </SwitcherItem>
                <SwitcherItem href="#" aria-label="your projects">
                  Privacy & Security
                </SwitcherItem>
                <SwitcherDivider />

                  <button onClick={this.onLogoutClick}>
                    Logout
                  </button>

              </Switcher>
            </HeaderPanel>

            <SideNav aria-label="Side navigation" isRail>

              <SideNavItems className="black">

                <SideNavMenu className="invert" renderIcon={DashboardIcon} title="User Dashboard">
                </SideNavMenu>

                <SideNavMenu className="invert" renderIcon={EconomicProphetIcon} title="Economic Prophet">
                  <SideNavMenuItem href="#">
                    Portfolios & Watch Lists
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Algorithmic Trading
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Social Profit
                  </SideNavMenuItem>
                </SideNavMenu>

                <SideNavMenu className="invert" renderIcon={ChartIcon} title="Analytics Studio">
                  <SideNavMenuItem href="#">
                    Behavioral Analytics
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Entity Analytics
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Sentiment Analytics
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    GeoSpatial Analytics
                  </SideNavMenuItem>
                </SideNavMenu>

                <SideNavMenu className="invert" renderIcon={FolderIcon} title="Data Studio">
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

                <SideNavMenu className="invert" renderIcon={SimIcon} title="Developer Studio">
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

                <SideNavMenu className="invert" renderIcon={SchematicsIcon} title="AI | Model Studio">
                  <SideNavMenuItem href="#">
                    Ontology & Epistemology
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    NLP & Info Extraction
                  </SideNavMenuItem>
                  <SideNavMenuItem href="#">
                    Simulations
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

UIFrame.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(UIFrame);
