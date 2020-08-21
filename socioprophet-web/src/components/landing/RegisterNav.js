import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Ticker from "react-ticker";
import Parser from "rss-parser";

import {
  HeaderContainer,
  Header,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
} from "carbon-components-react/lib/components/UIShell";

import HeaderLanding from "./landing_components/HeaderLanding";
import HeaderLinks from "./landing_components/HeaderLinks";
import Offering from "./landing_components/Offering";
import Footer from "./landing_components/Footer";

import "./styles/common.css";
import "./styles/register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      // password: "", --> add later for actual registration
      // password2: "", --> add later for actual registration
      errors: {},
      feed: [],
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
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      // password: this.state.password, -->  add later for actual registration
      // password2: this.state.password2, --> add later for actual registration
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        {/* <nav className="header">
          <HeaderLanding />
          <HeaderLinks />

          <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }) => (
              <Header aria-label="SocioProphet Platform">
                <HeaderGlobalBar>
                  <HeaderGlobalAction aria-label="App Switcher">
                    <svg
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M18 18h3v3h-3zm-7.5 0h3v3h-3zM3 18h3v3H3zm15-7.5h3v3h-3zm-7.5 0h3v3h-3zm-7.5 0h3v3H3zM18 3h3v3h-3zm-7.5 0h3v3h-3zM3 3h3v3H3z"></path>
                    </svg>
                  </HeaderGlobalAction>

                  <HeaderGlobalAction
                    aria-label="App Switcher"
                    isActive={isSideNavExpanded}
                  >
                    <svg width="20" height="20">
                      <title>user</title>
                      <path d="M6 15.745A6.968 6.968 0 0 0 10 17a6.968 6.968 0 0 0 4-1.255V15.5a2.5 2.5 0 0 0-2.5-2.5h-3A2.5 2.5 0 0 0 6 15.5v.245zm-.956-.802A3.5 3.5 0 0 1 8.5 12h3a3.5 3.5 0 0 1 3.456 2.943 7 7 0 1 0-9.912 0zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
                      <path d="M10 9.841a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                    </svg>
                  </HeaderGlobalAction>
                </HeaderGlobalBar>

                <HeaderPanel aria-label="Header Panel" expanded={true}>
                  <Switcher role="menu" aria-label="Switcher Container">
                    <SwitcherItem href="#" aria-label="your repositories">
                      First Name
                    </SwitcherItem>
                    <SwitcherItem href="#" aria-label="your repositories">
                      Last Name
                    </SwitcherItem>
                    <SwitcherDivider />
                    <SwitcherItem href="#" aria-label="your repositories">
                      SocioProphet ID
                    </SwitcherItem>
                    <SwitcherDivider />
                    <SwitcherItem href="#" aria-label="your repositories">
                      Password
                    </SwitcherItem>
                    <SwitcherItem href="#" aria-label="your repositories">
                      Confirm Password
                    </SwitcherItem>
                    <SwitcherDivider />
                    <SwitcherItem href="#" aria-label="your repositories">
                      Phone Number (optional for 2FA)
                    </SwitcherItem>
                    <SwitcherDivider />
                    <SwitcherItem href="#" aria-label="your repositories">
                      Data Privacy Policy
                    </SwitcherItem>
                    <SwitcherDivider />
                    <button>Register</button>
                  </Switcher>
                </HeaderPanel>
              </Header>
            )}
          /> */}
        {/* Header Links Element */}
        {/* <nav className="header__list"> */}
        {/* Header Login Element */}
        {/* <div className="header__register">
              <form
                className="header__register__form"
                noValidate
                onSubmit={this.onSubmit}
              >
                <label className="header__register__form__field">
                  <div>
                    <input
                      className={classnames(
                        "header__register__form__field__input",
                        {
                          invalid: errors.name,
                        }
                      )}
                      onChange={this.onChange}
                      value={this.state.name}
                      error={errors.name}
                      id="name"
                      type="text"
                      placeholder="Name"
                    />
                    <span className="error">{errors.name}</span>
                  </div>
                </label>
                <label className="header__register__form__field">
                  <div>
                    <input
                      className={classnames(
                        "header__register__form__field__input",
                        {
                          invalid: errors.email,
                        }
                      )}
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      placeholder="Email"
                    />
                    <span className="error">{errors.email}</span>
                  </div>
                </label> */}
        {/* add back later for actual registration */}
        {/* <label className="header__login__form__field">
                  <div>
                    <input
                      className={classnames(
                        "header__login__form__field__input",
                        {
                          invalid: errors.password,
                        }
                      )}
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      id="password"
                      type="password"
                      placeholder="Password"
                    />
                    <span className="error">{errors.password}</span>
                  </div>
                </label>
                <label className="header__login__form__field">
                  <div>
                    <input
                      className={classnames(
                        "header__login__form__field__input",
                        {
                          invalid: errors.password2,
                        }
                      )}
                      onChange={this.onChange}
                      value={this.state.password2}
                      error={errors.password2}
                      id="password2"
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <span className="error">{errors.password2}</span>
                  </div>
                </label> */}
        {/* <label className="header__register__form__field header__register__form__field--swidth">
                  <div>
                    <button
                      className="header__register__form__field__btn"
                      type="submit"
                    >
                      Register now
                    </button>
                  </div>
                </label>
              </form>
            </div>
          </nav> */}
        {/* </nav> */}

        <form className="body__login__form" noValidate onSubmit={this.onSubmit}>
          <label className="body__login__form__field">
            <div>
              <input
                className={classnames("body__login__form__field__input", {
                  invalid: errors.name,
                })}
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                placeholder="Name"
              />
              <span className="error">{errors.name}</span>
            </div>
          </label>
          <label className="body__login__form__field">
            <div>
              <input
                className={classnames("body__login__form__field__input", {
                  invalid: errors.email,
                })}
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                placeholder="Email"
              />
              <span className="error">{errors.email}</span>
            </div>
          </label>
          <label className="body__login__form__field body__login__form__field--swidth">
            <div>
              <button className="body__login__form__field__btn" type="submit">
                Register now
              </button>
            </div>
          </label>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
