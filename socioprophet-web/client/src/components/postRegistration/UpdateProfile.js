import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";

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
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Update Profile</h2>
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            defaultValue={currentUser.email}
            ref={emailRef}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Leave blank to keep the same"
            ref={passwordRef}
          />
        </label>
        <label>
          Password Confirmation
          <input
            name="password-confirmation"
            type="password"
            placeholder="Leave blank to keep the same"
            ref={passwordConfirmRef}
          />
        </label>
        <button disabled={loading} type="submit">
          Update
        </button>
        <div>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
