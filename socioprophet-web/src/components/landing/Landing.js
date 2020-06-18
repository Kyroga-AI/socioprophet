import React from "react";
import { Link } from "react-router-dom";
import Ticker from "react-ticker";

import {
  HeaderContainer,
  Header,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "carbon-components-react/lib/components/UIShell";

import HeaderLanding from "./landing_components/HeaderLanding";
import HeaderLinks from "./landing_components/HeaderLinks";
import Offering from "./landing_components/Offering";
import Footer from "./landing_components/Footer";

import "./styles/common.css";
import "./styles/landing.css";

const Landing = () => {
  return (
    <div className="landing">
      {/* Header Block */}
      <nav className="header">
        <HeaderLanding />
        <HeaderLinks />
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label="SocioProphet Platform">
              <HeaderGlobalBar>
                {/* <Link to="/" className="header__register__back">
                    &#945; Registry
                  </Link> */}
                <HeaderGlobalAction aria-label="App Switcher">
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18 18h3v3h-3zm-7.5 0h3v3h-3zM3 18h3v3H3zm15-7.5h3v3h-3zm-7.5 0h3v3h-3zm-7.5 0h3v3H3zM18 3h3v3h-3zm-7.5 0h3v3h-3zM3 3h3v3H3z"></path>
                  </svg>
                </HeaderGlobalAction>

                <HeaderGlobalAction
                  aria-label="App Switcher"
                  isActive={isSideNavExpanded}
                >
                  <svg width="20" height="20">
                    <title>user</title>
                    <path d="M6 15.745A6.968 6.968 0 0 0 10 17a6.968 6.968 0 0 0 4-1.255V15.5a2.5 2.5 0 0 0-2.5-2.5h-3A2.5 2.5 0 0 0 6 15.5v.245zm-.956-.802A3.5 3.5 0 0 1 8.5 12h3a3.5 3.5 0 0 1 3.456 2.943 7 7 0 1 0-9.912 0zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
                    <path d="M10 9.841a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                  </svg>
                </HeaderGlobalAction>
              </HeaderGlobalBar>
            </Header>
          )}
        />
      </nav>
      {/* Main Block */}
      <div className="main">
        <div className="main__sub">
          <div className="main__sub__ticker">
            <Ticker>
              {({ index }) => (
                <div className="main__sub__ticker__text">
                  <p id="tickerText">
                    <span style={{ fontWeight: "600" }}>News</span> / IM's #
                    {index}!
                  </p>
                </div>
              )}
            </Ticker>
          </div>
        </div>
        {/* Main Background Element */}
        <div className="main__background">
          <div className="main__background__title">
            Socio
            <span>
              <strong>Prophet</strong>
              <p style={{ marginTop: "10px" }}>
                Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.
              </p>
            </span>
          </div>
          <div className="main__background__responsive">
            {/* no login yet - will be added in later when login becomes available*/}
            <Link to="/login" className="main__background__login">
              Log In
            </Link>
            <Link to="/register" className="main__background__register">
              &#945; - Registry
            </Link>
          </div>
        </div>

        <Offering />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
