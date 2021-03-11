import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";
import HeaderLanding from "../landing/landing_components/HeaderLanding";
import HeaderLinks from "../landing/landing_components/HeaderLinks";
import Footer from "../landing/landing_components/Footer";

// styles
import "./styles/registration.css";
import logo from "../../../public/images/mothership-logo.png";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: "",
  });
  const [passwordConfirmError, setPasswordConfirmError] = useState({
    isError: false,
    message: "",
  });
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, addUser } = useAuth();
  const history = useHistory();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else {
      return;
    }
  };

  const handleSubmit = async (e) => {
    if (passwordRef.current.value.length == 0) {
      return setPasswordError({
        isError: true,
        message: "Please create a password to continue!",
      });
    }
    if (passwordRef.current.value.length < 6) {
      return setPasswordError({
        isError: true,
        message: "Must be at least six characters long!",
      });
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setPasswordConfirmError({
        isError: true,
        message: "Passwords do not match!",
      });
    }

    try {
      setLoading(true);

      await signup(emailAddress, passwordRef.current.value);
      await addUser(emailAddress);

      history.push("/alpha");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return setPasswordConfirmError({
          isError: true,
          message: "A user with this email already exists!",
        });
      }
    }
    setLoading(false);
  };

  const getEmailAddress = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailAddress = urlParams.get("id");
    // console.log(emailAddress);
    if (emailAddress === null) {
      history.push("/");
    }

    setEmailAddress(emailAddress);
  };

  useEffect(() => {
    getEmailAddress();
  }, []);

  const computedClassNamePasswordError = passwordError.isError
    ? "registration__main__background__password__input__text__error"
    : "registration__main__background__password__input__text";

  const computedClassNamePasswordConfirmError = passwordConfirmError.isError
    ? "registration__main__background__password__input__text__error"
    : "registration__main__background__password__input__text";
  return (
    <div className="registration">
      <nav className="registration__header">
        <HeaderLanding />
        <HeaderLinks />
      </nav>
      <div className="registration___main">
        <div className="registration__main__background">
          <div className="registration__main__background__title">
            <img src={logo} width="450px" height="auto" />
            <p className="registration__main__background__title__sub">
              <strong>
                {/* Open Collaborative Socio-Dat-Alytics. For geeks, by geeks. */}
                COMMUNITY. DATA. ANALYTICS. AI. SOCIAL.
                <br />
                For geeks, but easy enough for everyone.
              </strong>
            </p>
          </div>
          <div className="registration__main__background__password">
            <div className="password__container">
              <div className="registration__main__background__password__input">
                <input
                  className={computedClassNamePasswordError}
                  name="password"
                  type="password"
                  spellCheck="false"
                  ref={passwordRef}
                  required
                  onKeyDown={handleKeyPress}
                  placeholder="CREATE PASSWORD"
                />
                {passwordError.isError && (
                  <p className="main__background__email__input__error">
                    {passwordError.message}
                  </p>
                )}
              </div>
              <div className="registration__main__background__password__input">
                <input
                  className={computedClassNamePasswordConfirmError}
                  name="password-confirmation"
                  type="password"
                  spellCheck="false"
                  ref={passwordConfirmRef}
                  required
                  onKeyDown={handleKeyPress}
                  placeholder="RE-ENTER PASSWORD"
                />
                {passwordConfirmError.isError && (
                  <p className="main__background__email__input__error">
                    {passwordConfirmError.message}
                  </p>
                )}
              </div>
            </div>
            <div
              className="registration__main__background__password__input__btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              ONWARD
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;
