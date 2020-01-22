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
                <Link to="/" className="header__list__btn__signup">Back</Link>
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
              <Link to="/" className="main__background__signup">Back</Link>
            </div>
          </div>
          {/* Main Description Element */}
          <div className="main__descriptive">
            <div className="main__descriptive__title">
              Try it Soon (by Invite Only)
            </div>
            <div className="main__descriptive__description">
              Open Collaborative Socio-Econo-Legislative Analytics.
            </div>
          </div>
          {/* Main Offering Element */}
          <div className="main__offering">
            {/* Main Offering Card Element */}
            <div className="main__offering__card">
              <div className="main__offering__card__name">[ SocioProphet ] News & Events</div>
              <div className="main__offering__card__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Duis ut justo convallis.
              </div>
              <div className="main__offering__card__learnmore">
                <a className="main__offering__card__learnmore__link" href="#" target="_blank">Learn More</a>
              </div>
            </div>
            {/* Main Offering Card Element */}
            <div className="main__offering__card">
              <div className="main__offering__card__name">[ SocioProphet ] Data & AI</div>
              <div className="main__offering__card__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Duis ut justo convallis.
              </div>
              <div className="main__offering__card__learnmore">
                <a className="main__offering__card__learnmore__link" href="#" target="_blank">Learn More</a>
              </div>
            </div>
            {/* Main Offering Card Element */}
            <div className="main__offering__card">
              <div className="main__offering__card__name">[ SocioProphet ] Society & Law</div>
              <div className="main__offering__card__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Duis ut justo convallis.
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
          <a className="footer__copyright" href="#" target="_blank">&copy; 2020 SocioProphet</a>
        </footer>
      </div>
    );
  }
}

export default Landing;
