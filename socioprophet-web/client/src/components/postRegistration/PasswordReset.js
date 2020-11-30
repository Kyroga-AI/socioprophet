import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";

// styles
import "./styles/PasswordReset.css";

const PasswordReset = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Please check your inbox for further instructions");
    } catch {
      setError("Account does not exist, unable to reset password");
    }
    setLoading(false);
  };

  return (
    <div className="reset">
      {error && <p className="reset__error">{error}</p>}
      {message && <p className="reset__message">{message}</p>}
      <form className="reset__form" onSubmit={handleSubmit}>
        <div className="reset__form__label">
          <label className="reset__form_label__text"></label>
          <input
            className="reset__form__input"
            name="email"
            type="email"
            required
            placeholder="Email"
            ref={emailRef}
          />
        </div>
        <button className="reset__form__btn" type="submit">
          Send Reset Password Link
        </button>
        <div className="reset__form__return">
          <Link className="reset__form__return__link" to="/">
            Return
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
