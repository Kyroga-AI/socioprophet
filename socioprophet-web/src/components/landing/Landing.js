import React from "react";
import { Link } from "react-router-dom";
import { Search } from "@carbon/ibm-security";
import Ticker from "react-ticker";

import Offering from "./LandingComponents/Offering";
import Footer from "./LandingComponents/Footer";

import "./styles/landing.css";

const Landing = () => {
  return (
    <div>
      {/* Header Block */}
      <nav className="header">
        {/* Platform Name Element */}
        <div className="header__title">
          <a className="header__title__link" href="/">
            <strong>[ SocioProphet ] Platform</strong>
          </a>
        </div>
        {/* Header Links Element */}
        <nav className="header__list">
          <ul>
            <li className="header__list__item hidden">
              <Search
                closeButtonLabelText="Clear search input"
                className="dark"
                defaultValue=""
                id="search-1"
                labelText="Search"
                name=""
                onChange={function noRefCheck() {}}
                placeHolderText="Search..."
                size="sm"
                type="text"
                light={false}
              />
            </li>
            <li id="spGitHub" className="header__list__item">
              <a
                className="header__list__item__link"
                href="https://github.com/SocioProphet"
              >
                GitHub
              </a>
            </li>
            <li id="spBlog" className="header__list__item">
              <a
                className="header__list__item__link"
                href="https://socioprophet.blogspot.com"
              >
                Blog
              </a>
            </li>
            <li id="spDocs" className="header__list__item">
              <a className="header__list__item__link" href="#">
                Docs
              </a>
            </li>
            {/* Header Links Buttons Element */}
            <div className="header__list__btn">
              {/* no login yet - will be added in later when login becomes available*/}
              {/* <Link to="/login" className="header__list__btn__login">
                  Log In
                </Link> */}
              <Link to="/register" className="header__list__btn__signup">
                &#945; Registry
              </Link>
            </div>
          </ul>
        </nav>
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
            <Link to="/register" className="main__background__signup">
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
