import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";
import Header from "../landing/landing_components/Header";
import HeaderLinks from "../landing/landing_components/HeaderLinks";
import Footer from "../landing/landing_components/Footer";

// styles
import "./styles/alpha.css";

const Alpha = () => {
  // states
  const [logoutError, setLogoutError] = useState({
    isError: false,
    message: "",
  });
  // other hooks
  const history = useHistory();
  // custom hooks
  const { logout } = useAuth();

  // handles the user logout action
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      return setLogoutError({
        isError: true,
        message: "Failed to logout!",
      });
    }
    history.push("/");
  };

  return (
    <div className="alpha">
      <nav className="alpha__header">
        <Header />
        <HeaderLinks />
      </nav>
      <div className="alpha__container">
        Socio
        <strong>Prophet</strong>
        <p className="alpha__container__sub">
          <strong>
            Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.
          </strong>
        </p>
        <p className="alpha__container__sub">
          <strong>COMING SOON</strong>
        </p>
      </div>
      <div className="alpha__container__profile">
        <div className="alpha__container__profile__update">
          <Link
            className="alpha__container__profile__update__link"
            to="/update-profile"
          >
            My Profile
          </Link>
        </div>
      </div>
      <div className="alpha__container__btn">
        <div className="alpha__container__btn__link" onClick={handleLogout}>
          Log out
        </div>
      </div>
      {logoutError.isError && (
        <p className="alpha__container__error">{logoutError.message}</p>
      )}
      <Footer />
    </div>
  );
};

export default Alpha;
