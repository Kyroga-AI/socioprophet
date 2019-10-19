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
                    <span className="landing-header-logoText"><strong>SocioProphet</strong></span>
                  </a>
                </div>
                <div className="landing-header-region"></div>
              </div>
              <nav className="landing-header-linksContainer">
                <ul className="landing-header-links">
                  <li className="landing-header-link"><a href="#">GitHub</a></li>
                  <li className="landing-header-link"><a href="#">Blog</a></li>
                  <li className="landing-header-link"><a href="#">Docs</a></li>
                  <div className="landing-header-separatorBlock">
                    <Link
                      to="/login"
                      style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        color: "white"
                      }}
                      className="btn btn-large btn-flat waves-effect white black-text"
                      >
                      Log In
                    </Link>
                    <li className="landing-header-link"><a href="#">Log In</a></li>
                    <a className="landing-header-signUpButton" href="#">Sign Up</a>
                  </div>
                </ul>
              </nav>
            </nav>

            <div className="main"></div>

            <footer className="landing-footer">
              <a class="landing-footer-link" href="#" target="_blank"><strong>Contact</strong></a>
              <a class="landing-footer-link" href="#" target="_blank"><strong>Privacy</strong></a>
              <a class="landing-footer-link" href="#" target="_blank"><strong>Terms of Use</strong></a>
              <a class="landing-footer-link" href="#" target="_blank"><strong>Support</strong></a>
            </footer>

          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
