import React from "react";
import { Link } from "react-router-dom";
import Ticker from "react-ticker";

import Header from "./LandingComponents/Header";
import HeaderLinks from "./LandingComponents/HeaderLinks";
import Offering from "./LandingComponents/Offering";
import Footer from "./LandingComponents/Footer";

import "./styles/common.css";
import "./styles/landing.css";

const Landing = () => {
  return (
    <div className="landing">
      {/* Header Block */}
      <nav className="header">
        <Header />
        <HeaderLinks />
      </nav>
      {/* Main Block */}
      <div className="main">
        <div className="main__sub">
          <div className="main__sub__ticker">
            <Ticker>
              {({ index }) => (
                <div className="main__sub__ticker__text">
                  <p>
                    <span style={{ fontWeight: "800" }}>News</span> / IM's #
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
            </span>
          </div>
          <div className="main__background__responsive">
            {/* no login yet - will be added in later when login becomes available*/}
            <Link to="/login" className="main__background__login">
              Log In
            </Link>
            <Link to="/register" className="main__background__register">
              &#945; Registry
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
