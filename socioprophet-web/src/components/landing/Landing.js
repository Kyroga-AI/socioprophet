import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Ticker from "react-ticker";
import {
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
} from "carbon-components-react/lib/components/UIShell";

import HeaderLanding from "./landing_components/HeaderLanding";
import HeaderLinks from "./landing_components/HeaderLinks";
import Offering from "./landing_components/Offering";
import Footer from "./landing_components/Footer";

import "./styles/landing.css";

const Landing = (props) => {
  const [isExpanded, setExpanded] = useState(false);
  const [login, renderLogin] = useState(false);
  const [register, renderRegister] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPassword2, setRegisterPassword2] = useState("");
  const [errors, setErrors] = useState({});

  const url = "https://cors-anywhere.herokuapp.com/https://hnrss.org/newest";

  const GetRssFeedData = () => {
    const [feed, setFeed] = useState("");

    useEffect(() => {
      const getFeed = async () => {
        const text = await fetch(url).then((r) => r.text());
        const xmlDoc = new DOMParser().parseFromString(text, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("item")).map(
          (item) => ({
            title: item.querySelector("title").textContent,
            link: item.querySelector("link").textContent,
          })
        );

        setFeed(items);
      };
      getFeed();
    }, []);

    return feed ? (
      <p className="main__sub__ticker__text">
        {feed.map((items) => (
          <a id="rssLink" href={items.link} target="_blank">
            <strong>{items.title}</strong>
          </a>
        ))}
      </p>
    ) : (
      <p styles={{ visibility: "hidden" }}>----------</p>
    );
  };

  const toggle = () => {
    // setExpanded(isExpanded === false ? true : false);
    // if (!isExpanded) {
    //   console.log("here");
    //   renderLogin(false);
    //   renderRegister(false);
    // }
    if (isExpanded === true) {
      setExpanded(false);
      renderLogin(false);
      renderRegister(false);
    } else {
      setExpanded(true);
    }
  };

  const loginToggle = () => {
    setExpanded(isExpanded === false ? true : false);
    if (register || isExpanded) {
      renderLogin(false);
      renderRegister(false);
    } else {
      renderLogin(login === false ? true : false);
    }
  };

  const registerToggle = () => {
    setExpanded(isExpanded === false ? true : false);
    if (login && isExpanded) {
      renderRegister(false);
      renderLogin(false);
    } else {
      renderRegister(register === false ? true : false);
    }
  };

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

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = {
      email: loginEmail,
      password: loginPassword,
    };
    props.loginUser(userData);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const userData = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
      password2: registerPassword2,
    };
    props.registerUser(userData);
  };

  const registerForm = () => {
    return (
      <div>
        <p className="form__back" onClick={toggle}>
          &#10005;
        </p>
        <form className="form" noValidate onSubmit={handleRegister}>
          <h3 className="form__heading">Registration</h3>
          <label className="form__field">
            <div>
              <input
                className={classnames("form__field__input", {
                  invalid: errors.name,
                })}
                onChange={(e) => setRegisterName(e.target.value)}
                value={registerName}
                error={errors.name}
                id="registerName"
                type="text"
                placeholder="Name"
              />
              <span className="error">{errors.name}</span>
            </div>
          </label>
          <label className="form__field">
            <div>
              <input
                className={classnames("form__field__input", {
                  invalid: errors.email,
                })}
                onChange={(e) => setRegisterEmail(e.target.value)}
                value={registerEmail}
                error={errors.email}
                id="registerEmail"
                type="email"
                placeholder="Email"
              />
              <span className="error">{errors.email}</span>
            </div>
          </label>
          {/* <label className="form__field">
            <div>
              <input
                className={classnames("form__field__input", {
                  invalid: errors.password,
                })}
                onChange={(e) => setRegisterPassword(e.target.value)}
                value={registerPassword}
                error={errors.password}
                id="registerPassword"
                type="password"
                placeholder="Password"
              />
              <span className="error">{errors.password}</span>
            </div>
          </label>
          <label className="form__field">
            <div>
              <input
                className={classnames("form__field__input", {
                  invalid: errors.registerPassword2,
                })}
                onChange={(e) => setRegisterPassword2(e.target.value)}
                value={registerPassword2}
                error={registerPassword2}
                id="registerpassword2"
                type="password"
                placeholder="Confirm Password"
              />
              <span className="error">{errors.registerPassword2}</span>
            </div>
          </label> */}
          <label className="form__field">
            <div>
              <button className="form__field__submitBtn" type="submit">
                Continue
              </button>
            </div>
          </label>
        </form>
      </div>
    );
  };

  const loginForm = () => {
    return (
      <div>
        <p className="form__back" onClick={toggle}>
          &#10005;
        </p>
        <form className="form" noValidate onSubmit={handleLogin}>
          <h3 className="form__heading">Log In</h3>
          <label className="form__field">
            <div>
              <input
                className={classnames("form__field__input", {
                  invalid: errors.email || errors.emailnotfound,
                })}
                onChange={(e) => setLoginEmail(e.target.value)}
                value={loginEmail}
                error={errors.email}
                id="loginEmail"
                type="email"
                placeholder="Email"
              />
              <span className="error">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
          </label>
          <label className="form__field">
            <div>
              <input
                className={classnames("form__field__input", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
                onChange={(e) => setLoginPassword(e.target.value)}
                value={loginPassword}
                error={errors.password}
                id="loginPassword"
                type="password"
                placeholder="Password"
              />
              <span className="error">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
          </label>
          <label className="form__field">
            <div>
              <button className="form__field__submitBtn" type="submit">
                Log In
              </button>
            </div>
          </label>
        </form>
      </div>
    );
  };
  return (
    <div className="landing">
      <nav className="landing__header">
        <HeaderLanding />
        <HeaderLinks />
        <HeaderGlobalBar>
          <HeaderGlobalAction id="appSwitcher" aria-label="App Switcher">
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
            id="userIcon"
            aria-label="App Switcher"
            onClick={loginToggle}
          >
            <svg width="20" height="20">
              <title>user</title>
              <path d="M6 15.745A6.968 6.968 0 0 0 10 17a6.968 6.968 0 0 0 4-1.255V15.5a2.5 2.5 0 0 0-2.5-2.5h-3A2.5 2.5 0 0 0 6 15.5v.245zm-.956-.802A3.5 3.5 0 0 1 8.5 12h3a3.5 3.5 0 0 1 3.456 2.943 7 7 0 1 0-9.912 0zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
              <path d="M10 9.841a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
            </svg>
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <HeaderPanel aria-label="Header Panel" expanded={isExpanded}>
          {login && loginForm()}
          {register && registerForm()}
        </HeaderPanel>
      </nav>
      <div className="main">
        <div className="main__sub">
          <div className="main__sub__ticker">
            <Ticker offset="run-in">{() => <GetRssFeedData />}</Ticker>
          </div>
        </div>

        <div className="main__background">
          <div className="main__background__title">
            Socio
            <strong>Prophet</strong>
            <p className="main__background__title__sub">
              <strong>
                Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.
              </strong>
            </p>
          </div>
          <div className="btn--mobile">
            <button className="main__background__login" onClick={loginToggle}>
              Log In
            </button>
            <button
              className="main__background__register"
              onClick={registerToggle}
            >
              &#945; - Registry
            </button>
          </div>
        </div>
        {/* <div className="main__foreground"></div> */}
        <Offering />
      </div>
      <Footer />
    </div>
  );
};

Landing.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser, registerUser })(Landing);
