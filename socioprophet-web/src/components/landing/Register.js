import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import "./styles/landing.css";
import "./styles/register.css";

import Header from "./LandingComponents/Header";
import Offering from "./LandingComponents/Offering";
import Footer from "./LandingComponents/Footer";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      // password: "", --> add later for actual registration
      // password2: "", --> add later for actual registration
      errors: {},
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
        {/* Header Block */}
        <nav className="header--register">
          <Header />
          {/* Header Links Element */}
          <nav className="header__list">
            {/* Header Login Element */}
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
                <label className="header__login__form__field">
                  <div>
                    <input
                      className={classnames(
                        "header__login__form__field__input",
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
                </label>
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
                <label className="header__login__form__field header__login__form__field--swidth">
                  <div>
                    <button
                      className="header__login__form__field__btn"
                      type="submit"
                    >
                      Register now
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
          <div className="main__background responsive">
            <div className="main__background__title--register">
              Socio
              <span style={{ fontSize: "36px" }}>
                <strong>Prophet</strong>
              </span>
            </div>
            <div>
              <div className="body__login">
                <form
                  className="body__login__form"
                  noValidate
                  onSubmit={this.onSubmit}
                >
                  <label className="body__login__form__field">
                    <div>
                      <input
                        className={classnames(
                          "body__login__form__field__input",
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
                  <label className="body__login__form__field">
                    <div>
                      <input
                        className={classnames(
                          "body__login__form__field__input",
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
                  </label>
                  <label className="body__login__form__field body__login__form__field--swidth">
                    <div>
                      <button
                        className="body__login__form__field__btn"
                        type="submit"
                      >
                        Register now
                      </button>
                    </div>
                  </label>
                </form>
              </div>
              <Link to="/" className="main__background__register">
                Back
              </Link>
            </div>
          </div>

          <Offering />
          <Footer />
        </div>
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
