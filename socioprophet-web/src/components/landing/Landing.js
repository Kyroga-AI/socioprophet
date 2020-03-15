import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Search } from '@carbon/ibm-security';

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
              <li className="header__list__item">
                <Search
                  closeButtonLabelText="Clear search input"
                  defaultValue=""
                  id="search-1"
                  labelText="Search"
                  name=""
                  onChange={function noRefCheck(){}}
                  placeHolderText="Search..."
                  size="sm"
                  type="text"
                  light={false}
                />
              </li>
              <li className="header__list__item"><a className="header__list__item__link" href="https://github.com/SocioProphet">GitHub</a></li>
              <li className="header__list__item"><a className="header__list__item__link" href="https://medium.com/@socioprophet">Blog</a></li>
              <li className="header__list__item"><a className="header__list__item__link" href="#">Docs</a></li>
              {/* Header Links Buttons Element */}
              <div className="header__list__btn">
                <Link to="/login" className="header__list__btn__login">Log In</Link>
                <Link to="/register" className="header__list__btn__signup">Sign Up</Link>
              </div>
            </ul>
          </nav>
        </nav>
        {/* Main Block */}
        <div className="main">
          {/* Main Background Element */}
          <div className="main__background">
            <div className="main__background__title">
              Socio
              <span style={{"fontSize" : "36px"}}><strong>Prophet</strong></span>
            </div>
            <div>
              <Link to="/login" className="main__background__login">Log In</Link>
              <Link to="/register" className="main__background__signup">Try it for Free</Link>
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
              <div className="main__offering__card__name">[ SocioProphet ] Platform</div>
              <div className="main__offering__card__description">
                Web 2.0 platform capabilities for voting, sharing, tagging, and commenting.
              </div>
              <div className="main__offering__card__learnmore">
                <a className="main__offering__card__learnmore__link" href="#" target="_blank">Learn More</a>
              </div>
            </div>
            {/* Main Offering Card Element */}
            <div className="main__offering__card">
              <div className="main__offering__card__name">[ SocioProphet ] Community</div>
              <div className="main__offering__card__description">
                SocioProphet is a community for distributed infrastructure, data, analytics, and AI, built as a web 2.0 social networking platform.
              </div>
              <div className="main__offering__card__learnmore">
                <a className="main__offering__card__learnmore__link" href="#" target="_blank">Learn More</a>
              </div>
            </div>
            {/* Main Offering Card Element */}
            <div className="main__offering__card">
              <div className="main__offering__card__name">[ SocioProphet ] Data & AI</div>
              <div className="main__offering__card__description">
                Share your compute, storage, data, analytics, AI models and workflows.
              </div>
              <div className="main__offering__card__learnmore">
                <a className="main__offering__card__learnmore__link" href="#" target="_blank">Learn More</a>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block */}
        <footer className="footer">
          <div className="footer__social">
            <a className="footer__social__btn" href="https://twitter.com/socioprophet" target="_blank"><i className="fa fa-twitter-square" aria-hidden="true"></i></a>
            <a className="footer__social__btn" href="https://medium.com/@socioprophet" target="_blank"><i className="fa fa-medium" aria-hidden="true"></i></a>
            <a className="footer__social__btn" href="https://github.com/SocioProphet" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
          </div>
          <div className="footer__references">
            <a className="footer__references__link" href="mailto:socioprophet@gmail.com" target="_top"><strong>Contact</strong></a>
            <a className="footer__references__link" href="#" target="_blank"><strong>Privacy</strong></a>
            <a className="footer__references__link" href="#" target="_blank"><strong>Terms of Use</strong></a>
            <a className="footer__references__link" href="https://gitter.im/socioprophet/" target="_blank"><strong>Support</strong></a>
          </div>
          <div className="footer__fish">
            <img src="src/components/landing/images/fishbowl-landing.jpg" width="45px" height="42px" />
          </div>
          <a className="footer__copyright" href="#" target="_blank">&copy; 2020 SocioProphet</a>
        </footer>
      </div>
    );
  }
}

export default Landing;
