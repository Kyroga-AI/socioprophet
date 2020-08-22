import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import "./styles/common.css";
import "./styles/register.css";

function RegisterNav(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [props]);

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    props.registerUser(userData);
  };

  return (
    <div>
      <form className="body__login__form" noValidate onSubmit={onSubmit}>
        <label className="body__login__form__field">
          <div>
            <input
              className={classnames("body__login__form__field__input", {
                invalid: errors.name,
              })}
              onChange={(e) => setName(e.target.value)}
              value={name}
              error={name}
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              error={email}
              id="email"
              type="email"
              placeholder="Email"
            />
            <span className="error">{errors.email}</span>
          </div>
        </label>
        <label className="header__login__form__field">
          <div>
            <input
              className={classnames("header__login__form__field__input", {
                invalid: errors.password,
              })}
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
              className={classnames("header__login__form__field__input", {
                invalid: errors.password2,
              })}
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              type="password"
              placeholder="Confirm Password"
            />
            <span className="error">{errors.password2}</span>
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

RegisterNav.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
