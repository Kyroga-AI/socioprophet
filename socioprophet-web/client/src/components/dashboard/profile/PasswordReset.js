import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import Header from "../../landing/landing_components/Header";
import HeaderLinks from "../../landing/landing_components/HeaderLinks";
import Footer from "../../landing/landing_components/Footer";
import { useAuth } from "../../../authentication/contexts/AuthContext";

// email validator
import { validateEmail } from "../../landing/validate-email/validateEmail";

// styles
import "./styles/passwordReset.css";

const PasswordReset = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState({
    isError: false,
    message: "",
  });
  const [notification, setNotification] = useState();
  // refs
  const emailRef = useRef();
  // custom hooks
  const { resetPassword } = useAuth();
  // other hooks
  const history = useHistory();

  // computed css classes for invalid email error message
  const computedClassName = emailError.isError
    ? "reset__container__field__input--error"
    : "";

  // handles the email submission and sends user to survey
  const handleEmail = async () => {
    // set loading to disable 'begin' button
    setLoading(true);

    // check for valid email and dispatch error accordingly
    if (!validateEmail(emailRef.current.value)) {
      return setEmailError({
        isError: true,
        message: "Invalid email address!",
      });
    }

    // if email check passes, reset any previously dispatched error
    setEmailError({ isError: false });

    try {
      await resetPassword(emailRef.current.value);
      setNotification("Please check your inbox for further instructions!");
    } catch {
      return setEmailError({
        isError: true,
        message: "An account does not exist with this email address",
      });
    }
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };

  // when user presses 'enter' for email submition
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEmail();
    } else {
      return;
    }
  };

  return (
    <div className="reset">
      <nav className="nav--header">
        <Header />
        <HeaderLinks />
      </nav>
      {notification && <p className="reset-notification">{notification}</p>}
      <div className="reset__container">
        <div className="reset__container__field">
          <input
            className={`inputText inputText--lg ${computedClassName}`}
            name="email"
            type="email"
            spellCheck="false"
            ref={emailRef}
            required
            onKeyDown={handleKeyPress}
            placeholder="ENTER EMAIL"
          />
          {emailError.isError && (
            <p className="reset__container__field__error">
              {emailError.message}
            </p>
          )}
        </div>

        <div
          className="button button--lg"
          onClick={handleEmail}
          disabled={loading}
        >
          Send Reset Password Link
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordReset;
