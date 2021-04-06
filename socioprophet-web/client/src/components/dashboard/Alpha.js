import React, { Suspense, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../landing/landing_components/Header";
import HeaderLinks from "../landing/landing_components/HeaderLinks";
const TickerFeed = React.lazy(() => import("../ticker-feed/TickerFeed"));
import Profile from "../dashboard/profile/Profile";
import Footer from "../landing/landing_components/Footer";

import { useAuth } from "../../authentication/contexts/AuthContext";

// main SocioProphet logo image
import logo from "../../../public/images/mothership-logo.png";

// styles
import "./styles/alpha.css";

const Alpha = () => {
  // states
  const [isExpanded, setExpanded] = useState(false);
  // other hooks
  const history = useHistory();
  const { currentUser } = useAuth();

  const togglePanelClassName = isExpanded
    ? "alpha__header__panel--expanded"
    : "";

  // toggles the side login panel
  const loginToggle = () => {
    setExpanded(isExpanded === false ? true : false);
  };

  return (
    <div className="alpha">
      <nav className="nav--header">
        <Header />
        <HeaderLinks />
        <div className="alpha__header__login">
          <p className="alpha__header__login__avatar" onClick={loginToggle}>
            <i className="fa fa-user-circle" aria-hidden="true"></i>
          </p>
        </div>
        <div className={`alpha__header__panel ${togglePanelClassName}`}>
          <div className="alpha__login__close">
            <p className="alpha__login__close__btn" onClick={loginToggle}>
              &#10005;
            </p>
          </div>
          <Profile />
        </div>
      </nav>
      <Suspense fallback={<p>Loading ...</p>}>
        <TickerFeed />
      </Suspense>
      <div className="alpha__container">
        <div className="alpha__container__logo">
          <img src={logo} width="450px" height="77px" />
        </div>
        <p className="alpha__container__subtitle">
          <strong>Profile Coming Soon. </strong>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Alpha;
