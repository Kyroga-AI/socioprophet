import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Search } from "@carbon/ibm-security";
import Ticker from "react-ticker";

import "./styles/landing.css";

class Landing extends Component {
  render() {
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
          {/* Main Description Element */}
          <div className="main__descriptive">
            <div className="main__descriptive__title">
              Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.
            </div>
          </div>
          {/* Main Offering Element */}
          <div className="main__offering">
            {/* Main Offering Card Element */}
            <div className="main__offering__card">
              <div className="main__offering__card__name">
                [ SocioProphet ] Platform
              </div>
              <div className="main__offering__card__description">
                SocioProphet is a web 3.0 community for distributed
                infrastructure, data, analytics & AI, built as a social
                networking platform - for geeks, but simple enough for everyone.
              </div>
              <div className="main__offering__card__learnmore">
                <a
                  className="main__offering__card__learnmore__link"
                  href="https://socioprophet.blogspot.com/"
                >
                  Learn More
                </a>
              </div>
            </div>
            {/* Main Offering Card Element */}
            <div className="main__offering__card">
              <div className="main__offering__card__name">
                [ SocioProphet ] Community
              </div>
              <div className="main__offering__card__description">
                A collaborative distributed system and social network. Aimed to
                unlock the world's best ideas through democratized social
                intellegence.
              </div>
              <div className="main__offering__card__learnmore">
                <a
                  className="main__offering__card__learnmore__link"
                  href="https://socioprophet.blogspot.com/"
                >
                  Learn More
                </a>
              </div>
            </div>
            {/* Main Offering Card Element */}
            <div className="main__offering__card">
              <div className="main__offering__card__name">
                [ SocioProphet ] Data & AI
              </div>
              <div className="main__offering__card__description">
                Share your compute, storage, data, analytics, AI models and
                workflows. Achieved through leveraging peer to peer and
                federated networks, or centralized collaboration models.
              </div>
              <div className="main__offering__card__learnmore">
                <a
                  className="main__offering__card__learnmore__link"
                  href="https://socioprophet.blogspot.com/"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="footer__responsive">
            <a
              className="footer__responsive__link"
              href="mailto:socioprophet@gmail.com"
              target="_top"
            >
              <strong>Contact</strong>
            </a>
            <a className="footer__responsive__link" href="#" target="_blank">
              <strong>Privacy</strong>
            </a>
            <a className="footer__responsive__link" href="#" target="_blank">
              <strong>Terms of Use</strong>
            </a>
            <a
              className="footer__responsive__link"
              href="https://gitter.im/socioprophet/"
              target="_blank"
            >
              <strong>Support</strong>
            </a>
          </div>
        </div>

        {/* Footer Block */}
        <footer className="footer">
          <div className="footer__social">
            <a
              className="footer__social__btn"
              href="https://twitter.com/socioprophet"
              target="_blank"
            >
              <i className="fa fa-twitter-square" aria-hidden="true"></i>
            </a>
            <a
              className="footer__social__btn"
              href="https://medium.com/@socioprophet"
              target="_blank"
            >
              <i className="fa fa-medium" aria-hidden="true"></i>
            </a>
            <a
              className="footer__social__btn"
              href="https://github.com/SocioProphet"
              target="_blank"
            >
              <i className="fa fa-github" aria-hidden="true"></i>
            </a>
          </div>
          <div className="footer__references">
            <a
              className="footer__references__link"
              href="mailto:michael@socioprophet.ai"
              target="_top"
            >
              <strong>Contact</strong>
            </a>
            <a className="footer__references__link" href="#" target="_blank">
              <strong>Privacy</strong>
            </a>
            <a className="footer__references__link" href="#" target="_blank">
              <strong>Terms of Use</strong>
            </a>
            <a
              className="footer__references__link"
              href="https://gitter.im/socioprophet/"
              target="_blank"
            >
              <strong>Support</strong>
            </a>
          </div>
          <div className="footer__fish">
            <img
              src="src/components/landing/images/fishbowl-landing.jpg"
              width="45px"
              height="42px"
            />
          </div>
          <a className="footer__copyright" href="#" target="_blank">
            &copy; 2020 SocioProphet
          </a>
        </footer>
      </div>
    );
  }
}

export default Landing;
