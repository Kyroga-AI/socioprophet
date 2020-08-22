import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Search } from "@carbon/ibm-security";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import HeaderLanding from "./landing_components/HeaderLanding";
import HeaderLinks from "./landing_components/HeaderLinks";
import Offering from "./landing_components/Offering";
import Footer from "./landing_components/Footer";

import "./styles/common.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
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
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        {/* Header Block */}
        <nav className="header">
          <HeaderLanding />
          <HeaderLinks />

          {/* Login Element - NOT BEING USED YET */}
          <nav className="header__list">
            <div className="header__login">
              <form
                className="header__login__form"
                noValidate
                onSubmit={this.onSubmit}
              >
                <label className="header__login__form__field">
                  <div>
                    <input
                      className={classnames(
                        "header__login__form__field__input",
                        {
                          invalid: errors.email || errors.emailnotfound,
                        }
                      )}
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      placeholder="Email"
                    />
                    <span className="error">
                      {errors.email}
                      {errors.emailnotfound}
                    </span>
                  </div>
                </label>
                <label className="header__login__form__field">
                  <div>
                    <input
                      className={classnames(
                        "header__login__form__field__input",
                        {
                          invalid: errors.password || errors.passwordincorrect,
                        }
                      )}
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      id="password"
                      type="password"
                      placeholder="Password"
                    />
                    <span className="error">
                      {errors.password}
                      {errors.passwordincorrect}
                    </span>
                  </div>
                </label>
                <label className="header__login__form__field header__login__form__field--swidth">
                  <div>
                    <button
                      className="header__login__form__field__btn"
                      type="submit"
                    >
                      Log In
                    </button>
                  </div>
                </label>
              </form>
            </div>
          </nav>
        </nav>
        {/* Main Block */}
        <div className="main">
          {/* Main Background Element */}

          <div className="main__background">
            <h1>{/* <strong>SocioProphet</strong> */}</h1>
            <br />
            <h2>Please register for the &#945; release</h2>
            <Link to="/register" className="main__background__register">
              &#945; Registry
            </Link>
          </div>

          <Offering />
          <Footer />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
