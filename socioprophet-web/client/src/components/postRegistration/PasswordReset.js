import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";

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
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Password Reset</h2>
      {error && <h3>{error}</h3>}
      {message && <h3>{message}</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            ref={emailRef}
          />
        </label>

        <button type="submit">Reset Password</button>
        <div>
          <Link to="/">Return</Link>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
