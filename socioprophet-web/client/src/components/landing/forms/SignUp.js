import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../authentication/contexts/AuthContext";
import googleIcon from "../../../../public/images/google-sign-in-light.jpg";
// styles
import "./styles/form.css";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { googleSignIn } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("td");
    try {
      setLoading(true);
      await googleSignIn();
      history.push("/alpha");
    } catch (err) {
      console.trace(err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      // history.push("/survey");
      history.push("/alpha");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <div className="form">
      <h3 className="form__heading">Register</h3>
      {error && <p className="form__error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="form__input"
            name="email"
            type="email"
            required
            placeholder="Email"
            ref={emailRef}
          />
        </label>
        <label>
          <input
            className="form__input"
            name="password"
            type="password"
            required
            placeholder="Password"
            ref={passwordRef}
          />
        </label>
        <label>
          <input
            className="form__input"
            name="password-confirmation"
            type="password"
            required
            placeholder="Password Confirmation"
            ref={passwordConfirmRef}
          />
        </label>
        <button className="form__btn" disabled={loading} type="submit">
          Register
        </button>
        <div style={{ textAlign: "center" }}>or</div>
        <div className="form__googleBtn">
          <img onClick={handleSignIn} src={googleIcon} />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
