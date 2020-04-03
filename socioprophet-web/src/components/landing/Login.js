import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import "./styles/landing.css";
import "./styles/authForm.css";

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
      <div>
        {/* Header Block */}
        <nav className="header">
          {/* Platform Name Element */}
          <div className="header__title">
            <a className="header__title__link" href="/">
              <strong>[ SocioProphet ] Platform</strong>
            </a>
          </div>
          {/* Header Links Element */}
          <nav className="header__list">

            {/* Header Login Element */}
            <div className="header__login">
              <form className="header__login__form" noValidate onSubmit={this.onSubmit}>
                <label className="header__login__form__field">
                  <div>
                    <input
                      className={classnames("header__login__form__field__input", {
                        invalid: errors.email || errors.emailnotfound
                      })}
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      placeholder="Email" />
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
                        invalid: errors.password || errors.passwordincorrect
                      })}
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      id="password"
                      type="password"
                      placeholder="Password" />
                    <span className="error">
                      {errors.password}
                      {errors.passwordincorrect}
                    </span>
                  </div>
                </label>
                <label className="header__login__form__field header__login__form__field--swidth">
                  <div>
                    <button className="header__login__form__field__btn" type="submit">Log In</button>
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
            <div className="main__background__title">
              Socio
              <span style={{"fontSize" : "36px"}}><strong>Prophet</strong></span>
            </div>
            <div>
              <Link to="/" className="main__background__signup">Back</Link>
            </div>
          </div>
          {/* Main Description Element */}
          <div className="main__descriptive">
            <div className="main__descriptive__title">
              Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.
            </div>
          </div>
          {/* Main Offering Element */}
          <div className="main__offering">
            {/* Main Offering Card Element */}
            <div className="main__offering__card">
              <div className="main__offering__card__name">[ SocioProphet ] Platform</div>
              <div className="main__offering__card__description">
                SocioProphet is a web 3.0 community for distributed infrastructure, data, analytics
                & AI, built as a social networking platform - for geeks, but simple enough for everyone.              </div>
              <div className="main__offering__card__learnmore">
                <a className="main__offering__card__learnmore__link" href="#" target="_blank">Learn More</a>
              </div>
            </div>
            {/* Main Offering Card Element */}
            <div className="main__offering__card">
              <div className="main__offering__card__name">[ SocioProphet ] Community</div>
              <div className="main__offering__card__description">
                A collaborative distributed system and social network. Aimed to unlock the world's
                best ideas through democratized social intellegence.
              </div>
              <div className="main__offering__card__learnmore">
                <a className="main__offering__card__learnmore__link" href="#" target="_blank">Learn More</a>
              </div>
            </div>
            {/* Main Offering Card Element */}
            <div className="main__offering__card">
              <div className="main__offering__card__name">[ SocioProphet ] Data & AI</div>
              <div className="main__offering__card__description">
                Share your compute, storage, data, analytics, AI models and workflows. Achieved through
                leveraging peer to peer and federated networks, or centralized collaboration models.              </div>
              <div className="main__offering__card__learnmore">
                <a className="main__offering__card__learnmore__link" href="#" target="_blank">Learn More</a>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block */}
        <footer className="footer">
          <div className="footer__social">
            <a className="footer__social__btn" href="https://twitter.com/socioprophet" target="_blank"><i className="fa fa-twitter-square" aria-hidden="true"></i></a>
            <a className="footer__social__btn" href="https://medium.com/@socioprophet" target="_blank"><i className="fa fa-medium" aria-hidden="true"></i></a>
            <a className="footer__social__btn" href="https://github.com/SocioProphet" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
          </div>
          <div className="footer__references">
            <a className="footer__references__link" href="mailto:socioprophet@gmail.com" target="_top"><strong>Contact</strong></a>
            <a className="footer__references__link" href="#" target="_blank"><strong>Privacy</strong></a>
            <a className="footer__references__link" href="#" target="_blank"><strong>Terms of Use</strong></a>
            <a className="footer__references__link" href="https://gitter.im/socioprophet/" target="_blank"><strong>Support</strong></a>
          </div>
          <div className="footer__fish">
            <img src="src/components/landing/images/fishbowl-landing.jpg" width="45px" height="42px" />
          </div>
          <a className="footer__copyright" href="#" target="_blank">&copy; 2020 SocioProphet</a>
        </footer>
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
