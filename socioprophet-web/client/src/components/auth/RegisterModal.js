import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Button from "carbon-components-react/lib/components/Button";
import "./RegisterStyles/styles.css";

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
                <div className="modal-form">
                  <div className="register">
                    <div className="form-container">
                      <h1 className="form-heading sp-h2">
                        <span>Sign Up to SocioProphet</span>
                      </h1>
                      <div className="flex">
                        <form className="row-form" noValidate onSubmit={this.onSubmit}>
                          <div className="full-width">
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
                              />
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
                              />
                              <span className="red-text">
                                {errors.email}
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
                                  invalid: errors.password
                                })}
                              />
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
                              />
                              <span className="red-text">
                                {errors.password2}
                              </span>
                            </p>
                          </div>
                          <div>
                            <Button type="submit">Sign Up</Button>
                          </div>
                        </form>
                      </div>
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
