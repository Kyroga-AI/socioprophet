import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";

// styles
import "./styles/updateProfile.css";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setError("Failed to update account");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="update">
      <h4 className="update__heading">
        You Can Update Your Email and Password Here!
      </h4>
      {error && <p className="update__error">{error}</p>}
      <form className="update__form" onSubmit={handleSubmit}>
        <div className="update__form__label">
          <label>
            <span className="update__form__label__text">Update Email</span>
            <input
              className="update__form__input"
              name="email"
              type="email"
              required
              defaultValue={currentUser.email}
              ref={emailRef}
            />
          </label>
        </div>
        <div className="update__form__label">
          <label>
            <span className="update__form__label__text">New Password</span>
            <input
              className="update__form__input"
              name="password"
              type="password"
              placeholder="Leave blank to keep the same"
              ref={passwordRef}
            />
          </label>
        </div>
        <div className="update__form__label">
          <label>
            <span className="update__form__label__text">
              Password Confirmation
            </span>
            <input
              className="update__form__input"
              name="password-confirmation"
              type="password"
              placeholder="Leave blank to keep the same"
              ref={passwordConfirmRef}
            />
          </label>
        </div>
        <button className="update__form__btn" disabled={loading} type="submit">
          Update
        </button>
        <div className="update__form__cancel">
          <Link className="update__form__cancel__link" to="/">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
