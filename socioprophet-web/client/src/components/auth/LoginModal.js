import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Button from "carbon-components-react/lib/components/Button";
import "./LoginStyles/styles.css";

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
                <div className="modal-form">
                  <div className="login">
                    <div className="form-container">
                      <h1 className="form-heading sp-h2">
                        <span>Log in to SocioProphet</span>
                      </h1>
                      <div className="flex">
                        <form className="row-form" noValidate onSubmit={this.onSubmit}>
                          <div className="full-width">
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
                                <a className="fright" href="#">
                                  <span>Forgot Password?</span>
                                </a>
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
                            </p>
                          </div>
                          <div>
                            <Button type="submit">Continue</Button>
                          </div>
                        </form>
            </div>
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
