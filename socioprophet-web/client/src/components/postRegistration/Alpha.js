import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";
import HeaderLanding from "../landing/landing_components/HeaderLanding";
import HeaderLinks from "../landing/landing_components/HeaderLinks";
import Footer from "../landing/landing_components/Footer";

// styles
import "./styles/alpha.css";

const Alpha = () => {
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
    <div className="alpha">
      {error && <p className="alpha__error">{error}</p>}
      <nav className="alpha__header">
        <HeaderLanding />
        <HeaderLinks />
      </nav>
      <div className="alpha__container">
        <div className="alpha__container__background">
          <div className="alpha__container__title">
            Socio {currentUser.email}
            <strong>Prophet</strong>
            <p className="main__background__title__sub">
              <strong>
                Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.
              </strong>
            </p>
            <p className="main__background__title__sub">
              <strong>COMING SOON</strong>
            </p>
          </div>
          <div className="alpha__container__profile">
            {/* <div className="alpha__container__profile__email">
              {currentUser.email}
            </div> */}
            <div className="alpha__container__profile__update">
              <Link
                className="alpha__container__profile__update__link"
                to="/update-profile"
              >
                Update Profile
              </Link>
            </div>
          </div>
          <div className="alpha__container__btn">
            <button
              className="alpha__container__btn__link"
              onClick={handleLogout}
            >
              Log out and return
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Alpha;
