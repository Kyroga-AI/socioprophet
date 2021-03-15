import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../authentication/contexts/AuthContext";
import googleIcon from "../../../../public/images/google-sign-in-light.jpg";
// styles
import "./styles/form.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const currentUser = useAuth();
  const [emailError, setEmailError] = useState({
    isError: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { googleSignIn } = useAuth();

  // const handleSignIn = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     await googleSignIn();
  //   } catch (err) {
  //     console.trace(err);
  //   }
  //   setLoading(false);
  // };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else {
      return;
    }
  };

  const handleSubmit = async () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const userEmail = re.test(String(emailRef.current.value).toLowerCase());

    if (!userEmail) {
      return setEmailError({
        isError: true,
        message: "You must enter your email!",
      });
    }

    setEmailError({ isError: false, message: "" });

    if (passwordRef.current.value === "") {
      return setPasswordError({
        isError: true,
        message: "Please enter your password!",
      });
    }

    setPasswordError({ isError: false, message: "" });

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        return setPasswordError({
          isError: true,
          message: "Password in incorrect!",
        });
      } else {
        return setPasswordError({
          isError: true,
          message: "Something went wrong!",
        });
        console.log(err);
      }
    }

    setLoading(false);
    history.push("/alpha");
  };

  const computedClassName = emailError.isError
    ? "form__login__container__input__text__error"
    : "form__login__container__input__text";

  const computedClassNamePasswordError = passwordError.isError
    ? "form__login__container__input__text__error"
    : "form__login__container__input__text";

  return (
    <div className="form">
      {/* <h3 className="form__heading">
        SocioProphet <br />
        Internal SignIn
      </h3> */}

      <div className="form__login">
        <div className="form__login__container">
          <input
            className={computedClassName}
            name="email"
            type="email"
            spellCheck="false"
            ref={emailRef}
            required
            onKeyDown={handleKeyPress}
            placeholder="Your Email Address"
          />
          {emailError.isError && (
            <p className="form__login__container__input__error">
              {emailError.message}
            </p>
          )}

          <input
            style={{ marginTop: "2rem" }}
            className={computedClassNamePasswordError}
            name="password"
            type="password"
            spellCheck="false"
            ref={passwordRef}
            required
            onKeyDown={handleKeyPress}
            placeholder="Your Password"
          />
          {passwordError.isError && (
            <p className="update__password__container__input__error">
              {passwordError.message}
            </p>
          )}

          <div className="form__reset">
            <Link className="form__reset__link" to="/password-reset">
              Forgot Password?
            </Link>
          </div>
          <div
            className="form__login__container__input__btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            BEGIN
          </div>

          <br />
        </div>
      </div>

      {/* <div style={{ textAlign: "center" }}>or</div> */}
      {/* <div className="form__googleBtn">
        <img onClick={handleSignIn} src={googleIcon} />
      </div> */}
    </div>
  );
};

export default Login;
