import React from "react";
import HeaderLanding from "../landing/landing_components/HeaderLanding";
import HeaderLinks from "../landing/landing_components/HeaderLinks";

import "./styles/notFound.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <nav className="alpha__header">
        <HeaderLanding />
        {/* <HeaderLinks /> */}
      </nav>
      <div className="notFound__container">
        <h3 className="notFound__heading">This is unknown internet space</h3>
        <h4 className="notFound__description">
          Sorry, but the path " {window.location.pathname} " does not exist!
        </h4>
      </div>
    </div>
  );
};

export default NotFound;
