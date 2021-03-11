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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { googleSignIn } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await googleSignIn();
    } catch (err) {
      console.trace(err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/alpha");
    } catch (err) {
      setError("Failed to sign in");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="form">
      {/* <h3 className="form__heading">
        SocioProphet <br />
        Internal SignIn
      </h3> */}
      {error && <p className="form__error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="form__input"
            name="email"
            type="email"
            required
            placeholder="Enter Email"
            ref={emailRef}
          />
        </label>
        <label>
          <input
            className="form__input"
            name="password"
            type="password"
            required
            placeholder="Enter Password"
            ref={passwordRef}
          />
        </label>
        <button className="form__btn" disabled={loading} type="submit">
          Log In
        </button>
        <br />
      </form>
      <div className="form__reset">
        <Link className="form__reset__link" to="/password-reset">
          Forgot Password?
        </Link>
      </div>
      {/* <div style={{ textAlign: "center" }}>or</div> */}
      {/* <div className="form__googleBtn">
        <img onClick={handleSignIn} src={googleIcon} />
      </div> */}
    </div>
  );
};

export default Login;
