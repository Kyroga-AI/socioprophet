import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";

import Footer from "../landing/landing_components/Footer";

// styles
import "./styles/welcome.css";

const Welcome = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <>
      <div className="alpha"></div>
      <div className="alpha__container">
        <h1 className="alpha__container__heading">
          Welcome to the Alpha Registry!
        </h1>
        <div className="alpha__container__card">
          <p className="alpha__container__card__text">
            SocioProphet will send you email updates of our progress, in
            preparation of the Beta launch!
          </p>
        </div>

        {error && <p className="alpha__container__error">{error}</p>}
        <div className="alpha__container__profile">
          <strong>Account - </strong> {currentUser.email}
          <div className="alpha__container__profile__update">
            <Link
              className="alpha__container__profile__update__link"
              to="/update-profile"
            >
              Update Profile
            </Link>
          </div>
        </div>
        <button className="alpha__container__btn" onClick={handleLogout}>
          Log out and return
        </button>
        <Footer />
      </div>
    </>
  );
};

export default Welcome;
