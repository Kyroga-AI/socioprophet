import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";

import "./styles/verifyEmail.css";

const VerifyEmail = () => {
  const { currentUser, login, applyVerificationCode } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [mode, setMode] = useState("");
  const [actionCode, setActionCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authRequired, setAuthRequired] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [emailError, setEmailError] = useState({
    isError: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: "",
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else {
      return;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const userEmail = re.test(String(emailRef.current.value).toLowerCase());

    if (!userEmail) {
      return setEmailError({
        isError: true,
        message: "Please enter your email!",
      });
    }

    setEmailError({ isError: false });

    if (passwordRef.current.value === "") {
      return setPasswordError({
        isError: true,
        message: "Please enter your password!",
      });
    }

    setPasswordError({ isError: false });

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setAuthRequired(false);
      window.location.reload();
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        return setPasswordError({
          isError: true,
          message: "The password or email is incorrect!",
        });
      } else {
        setPasswordError({
          isError: true,
          message: "Something went wrong!",
        });
      }
    }

    setLoading(false);
  };

  const verifyEmail = async () => {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      const mode = urlParams.get("mode");
      setMode(mode);

      const actionCode = urlParams.get("oobCode");
      setActionCode(actionCode);

      await applyVerificationCode(actionCode);
      setVerified(true);
    } catch (err) {
      console.error(err);
      setVerificationError(true);
    }
  };

  const checkForCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");
    const actionCode = urlParams.get("oobCode");

    if (mode !== "verifyEmail" || actionCode === null) {
      history.push("/");
    }
  };

  useEffect(() => {
    checkForCode();
    if (currentUser === null) {
      setAuthRequired(true);
    } else {
      if (currentUser.emailVerified) {
        setVerified(true);
      } else {
        verifyEmail();
      }
    }
  }, []);

  const computedClassName = emailError.isError
    ? "verify__main__background__password__input__text__error"
    : "verify__main__background__password__input__text";

  const computedClassNamePasswordError = passwordError.isError
    ? "verify__main__background__password__input__text__error"
    : "verify__main__background__password__input__text";

  return (
    <div className="verify">
      {authRequired && (
        <>
          <h2 className="verify__heading">Please login to continue</h2>

          <div className="verify__main__background__password">
            <div className="password__container">
              <div className="verify__main__background__password__input">
                <input
                  className={computedClassName}
                  name="email"
                  type="email"
                  spellCheck="false"
                  ref={emailRef}
                  required
                  onKeyDown={handleKeyPress}
                  placeholder="ENTER EMAIL"
                />
                {emailError.isError && (
                  <p className="main__background__email__input__error">
                    {emailError.message}
                  </p>
                )}
              </div>
              <div className="verify__main__background__password__input">
                <input
                  className={computedClassNamePasswordError}
                  name="password"
                  type="password"
                  spellCheck="false"
                  ref={passwordRef}
                  required
                  onKeyDown={handleKeyPress}
                  placeholder="ENTER PASSWORD"
                />
                {passwordError.isError && (
                  <p className="main__background__email__input__error">
                    {passwordError.message}
                  </p>
                )}
              </div>
            </div>
            <div
              className="verify__main__background__password__input__btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              VERIFY
            </div>
          </div>
          {/* <div className="verify__form">
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  className="verify__form__input"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  ref={emailRef}
                />
              </label>
              {emailError && (
                <p className="main__background__email__input__error">
                  {emailErrorMessage}
                </p>
              )}
              <label>
                <input
                  className="verify__form__input"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  ref={passwordRef}
                />
              </label>
              <button
                className="verify__form__btn"
                disabled={loading}
                type="submit"
              >
                Log In
              </button>
              <br />
            </form>
          </div> */}
        </>
      )}
      {verificationError && (
        <>
          <h2 className="verify__heading">
            hmm, looks like something went wrong
          </h2>
          <div className="verify__signin">
            <button className="verify__signin__btn" onClick={() => {}}>
              Resend Link
            </button>
          </div>
        </>
      )}
      {verified && (
        <>
          <h2 className="verify__heading">Email Verified!</h2>
          <h4 className="verify__email">{currentUser.email}</h4>
          <div className="verify__signin">
            <button
              className="verify__signin__btn"
              onClick={() => {
                history.push("/");
              }}
            >
              Back to Sign In
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
