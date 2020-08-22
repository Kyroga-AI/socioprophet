import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import "./styles/common.css";
import "./styles/login.css";

function LoginNav(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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
      email: email,
      password: password,
    };
    props.loginUser(userData);
  };

  // const { errors } = errors;

  return (
    <div>
      <form className="header__login__form" noValidate onSubmit={onSubmit}>
        <label className="header__login__form__field">
          <div>
            <input
              className={classnames("header__login__form__field__input", {
                invalid: errors.email || errors.emailnotfound,
              })}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              error={email}
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
              className={classnames("header__login__form__field__input", {
                invalid: errors.password || errors.passwordincorrect,
              })}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
            <button className="header__login__form__field__btn" type="submit">
              Log In
            </button>
          </div>
        </label>
      </form>
    </div>
  );
}
LoginNav.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(LoginNav);
