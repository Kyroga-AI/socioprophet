import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Button from "carbon-components-react/lib/components/Button";
import "./LoginStyles/login_styles.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="page-wrapper_login">
        <div className="contentNode_login">
          <div className="landing-wrapper_login">
            <nav className="landing-header_login">
              <div className="landing-header-title_login">
                <div className="landing-header-menuNavTitle_login">
                  <a className="landing-header-titleText_login" href="/">
                    <span className="landing-header-logoText_login"><strong>[ SocioProphet ] Platform</strong></span>
                  </a>
                </div>
                <div className="landing-header-region_login"></div>
              </div>
              <nav className="landing-header-linksContainer_login">
                <ul className="landing-header-links_login">
                  <li className="landing-header-link_login"><a href="https://github.com/SocioProphet">GitHub</a></li>
                  <li className="landing-header-link_login"><a href="https://medium.com/@socioprophet">Blog</a></li>
                  <li className="landing-header-link_login"><a href="#">Docs</a></li>
                  <div className="landing-header-separatorBlock_login">

                    <Link to="/register" className="landing-header-signUpButton_login">Sign Up</Link>

                  </div>
                </ul>
              </nav>
            </nav>

            <div className="main_login">
              <div className="billboard-background_login">
                <div className="billboard_login">
                  <div className="main-socioprophet-name_login">
                    Socio
                    <span className="prophet_login">Prophet</span>
                  </div>
                  <div>
                    <div className="main-platform-description_login">
                      <strong>Open Collaborative Socio-Econo-Legislative Analytics.</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-platform-section_login">

                  <div className="login">

                      <div>
                        <form className="row-form_login" noValidate onSubmit={this.onSubmit}>
                          <div className="full-width_login">
                            <p className="input-container">
                              <label htmlFor="email">Email</label>
                              <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                  invalid: errors.email || errors.emailnotfound
                                })}
                              />
                              <span className="red-text">
                                {errors.email}
                                {errors.emailnotfound}
                              </span>
                            </p>
                            <p className="input-container">
                              <label htmlFor="password">
                                Password

                              </label>
                              <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                  invalid: errors.password || errors.passwordincorrect
                                })}
                              />
                              <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                              </span>
                              <a className="fright" href="#">
                                <span>Forgot Password?</span>
                              </a>
                            </p>
                          </div>
                          <div>
                            <button className="continue-button_login" type="submit">Continue</button>
                          </div>
                        </form>

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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
