import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ComingSoonStyles/comingSoon-styles.css";


class ComingSoon extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <div className="contentNode">
          <div className="landing-wrapper">
            <nav className="landing-header">
              <div className="landing-header-title">
                <div className="landing-header-menuNavTitle">
                  <a className="landing-header-titleText" href="/">
                    <span className="landing-header-logoText"><strong>[ SocioProphet ] Platform</strong></span>
                  </a>
                </div>
                <div className="landing-header-region"></div>
              </div>
              <nav className="landing-header-linksContainer">
                <ul className="landing-header-links">
                  <li className="landing-header-link"><a href="https://github.com/SocioProphet">GitHub</a></li>
                  <li className="landing-header-link"><a href="https://medium.com/@socioprophet">Blog</a></li>
                  <li className="landing-header-link"><a href="#">Docs</a></li>
                  <div className="landing-header-separatorBlock">

                    <Link to="/" className="landing-header-signUpButton">Back</Link>

                  </div>
                </ul>
              </nav>
            </nav>

            <div className="main">
              <div className="billboard-background">
                <div className="billboard">
                  <div className="main-socioprophet-name">
                    Socio
                    <span className="prophet">Prophet</span>
                  </div>
                  <div>
                    <Link to="/" className="main-button-login">Back</Link>
                  </div>
                </div>
              </div>
              <div className="main-platform-section">
                <div className="main-platform-slogan">Try it Soon (by Invite Only)</div>
                <div className="main-platform-description">
                  Open Collaborative Socio-Econo-Legislative Analytics.
                </div>
              </div>
              <div className="main-app-section">
                <div className="offering-card-container">
                  <div className="offering-card-name">[ SocioProphet ] News & Events</div>
                  <div className="offering-card-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis ut justo convallis.
                  </div>
                  <div className="offering-card-learnMore">
                    <a href="#" target="_blank">Learn More</a>
                     </div>


                </div>
                <div className="offering-card-container">
                  <div className="offering-card-name">[ SocioProphet ] Data & AI</div>
                  <div className="offering-card-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis ut justo convallis.
                  </div>
                  <div className="offering-card-learnMore">
                    <a href="#" target="_blank">Learn More</a>
                  </div>
                </div>
                <div className="offering-card-container">
                  <div className="offering-card-name">[ SocioProphet ] Society & Law</div>
                  <div className="offering-card-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis ut justo convallis.
                  </div>
                  <div className="offering-card-learnMore">
                    <a href="#" target="_blank">Learn More</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a className="social-twitter" href="https://twitter.com/socioprophet" target="_blank"><i className="fa fa-twitter-square" aria-hidden="true"></i></a>
              <a className="social-medium" href="https://medium.com/@socioprophet" target="_blank"><i className="fa fa-medium" aria-hidden="true"></i></a>
              <a className="social-github" href="https://github.com/SocioProphet" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
            </div>
            <a className="copyright" href="#" target="_blank"><p>&copy; 2019 SocioProphet</p></a>

            <footer className="landing-footer">

              <a className="landing-footer-link" href="mailto:socioprophet@gmail.com" target="_top"><strong>Contact</strong></a>
              <a className="landing-footer-link" href="#" target="_blank"><strong>Privacy</strong></a>
              <a className="landing-footer-link" href="#" target="_blank"><strong>Terms of Use</strong></a>
              <a className="landing-footer-link" href="https://gitter.im/socioprophet/" target="_blank"><strong>Support</strong></a>
            </footer>

          </div>
        </div>
      </div>
    );
  }
}

export default ComingSoon;
