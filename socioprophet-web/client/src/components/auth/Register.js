import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Button from "carbon-components-react/lib/components/Button";
import "./RegisterStyles/register_styles.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="page-wrapper_register">
        <div className="contentNode_register">
          <div className="landing-wrapper_register">
            <nav className="landing-header_register">
              <div className="landing-header-title_register">
                <div className="landing-header-menuNavTitle_register">
                  <a className="landing-header-titleText_register" href="/">
                    <span className="landing-header-logoText_register"><strong>[ SocioProphet ] Platform</strong></span>
                  </a>
                </div>
                <div className="landing-header-region_register"></div>
              </div>
              <nav className="landing-header-linksContainer_register">
                <ul className="landing-header-links_register">
                  <li className="landing-header-link_register"><a href="https://github.com/SocioProphet">GitHub</a></li>
                  <li className="landing-header-link_register"><a href="https://medium.com/@socioprophet">Blog</a></li>
                  <li className="landing-header-link_register"><a href="#">Docs</a></li>
                  <div className="landing-header-separatorBlock_register">

                    <Link to="/register" className="landing-header-signUpButton_register">Sign Up</Link>

                  </div>
                </ul>
              </nav>
            </nav>

            <div className="main_register">
              <div className="billboard-background_register">
                <div className="billboard_register">
                  <div className="main-socioprophet-name_register">
                    Socio
                    <span className="prophet_register">Prophet</span>
                  </div>
                  <div>
                    <div className="main-platform-description_register">
                      <strong>Open Collaborative Socio-Econo-Legislative Analytics.</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-platform-section_register">

                  <div className="register">

                      <div>
                      <form className="row-form_register" noValidate onSubmit={this.onSubmit}>
                        <div className="full-width_register_left">
                          <p className="input-container">
                            <label htmlFor="name">Name</label>
                            <input
                              onChange={this.onChange}
                              value={this.state.name}
                              error={errors.name}
                              id="name"
                              type="text"
                              className={classnames("", {
                                invalid: errors.name
                              })}
                            /><br/>
                            <span className="red-text">
                              {errors.name}
                            </span>
                          </p>
                          <p className="input-container">
                            <label htmlFor="email">Email</label>
                            <input
                              onChange={this.onChange}
                              value={this.state.email}
                              error={errors.email}
                              id="email"
                              type="email"
                              className={classnames("", {
                                invalid: errors.email
                              })}
                            /><br/>
                            <span className="red-text">
                              {errors.email}
                            </span>
                          </p>
                          </div>
                          <div className="full-width_register_right">
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
                                invalid: errors.password
                              })}
                            /><br/>
                            <span className="red-text">
                              {errors.password}
                            </span>
                          </p>
                          <p className="input-container">
                            <label htmlFor="password2">
                              Confirm Password
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.password2}
                              error={errors.password2}
                              id="password2"
                              type="password"
                              className={classnames("", {
                                invalid: errors.password2
                              })}
                            /><br/>
                            <span className="red-text">
                              {errors.password2}
                            </span>
                          </p>
                        </div>
                        <div>
                          <button className="signUp-button_register" type="submit">Sign Up</button>
                        </div>
                      </form>

                      </div>
                </div>

              </div>

            </div>

            <footer className="landing-footer_register">
              <a className="landing-footer-link_register" href="#" target="_blank"><strong>Contact</strong></a>
              <a className="landing-footer-link_register" href="#" target="_blank"><strong>Privacy</strong></a>
              <a className="landing-footer-link_register" href="#" target="_blank"><strong>Terms of Use</strong></a>
              <a className="landing-footer-link_register" href="#" target="_blank"><strong>Support</strong></a>
            </footer>

          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
