import React from "react";

import "./styles/headerLanding.css";

const HeaderLanding = () => {
  return (
    <div>
      {/* Platform Name Element */}
      <div className="header__title">
        <a className="header__title__link" href="/">
          <strong>[ SocioProphet ] Platform</strong>
        </a>
      </div>
    </div>
  );
};

export default HeaderLanding;
