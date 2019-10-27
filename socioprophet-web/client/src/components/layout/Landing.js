import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style-landing.css";

class Landing extends Component {
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

                    <Link to="/login" style={{ color : "#fff", fontSize : "16px" }}>Log In</Link>
                    <Link to="/register" className="landing-header-signUpButton">Sign Up</Link>

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
                    <Link to="/login" className="main-button-login">Log In</Link>
                    <Link to="/register" className="main-button-register">Try it for Free</Link>
                  </div>
                </div>
              </div>
              <div className="main-platform-section">
                <div className="main-platform-slogan">Explore the SocioProphet Platform</div>
                <div className="main-platform-description">
                  Open Collaborative Social-Econo-Legislative Analytics.
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

            <footer className="landing-footer">
              <a className="landing-footer-link" href="#" target="_blank"><strong>Contact</strong></a>
              <a className="landing-footer-link" href="#" target="_blank"><strong>Privacy</strong></a>
              <a className="landing-footer-link" href="#" target="_blank"><strong>Terms of Use</strong></a>
              <a className="landing-footer-link" href="#" target="_blank"><strong>Support</strong></a>
            </footer>

          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
