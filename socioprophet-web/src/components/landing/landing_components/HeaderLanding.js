import React from "react";

import "./styles/headerLanding.css";

const HeaderLanding = () => {
  return (
    <div>
      {/* Platform Name Element */}

      <div className="header__title">
        <div className="footer__fish">
          <img
            src="src/components/landing/images/fishbowl-landing.jpg"
            width="36px"
            height="30px"
          />
        </div>
        <a className="header__title__link" href="/">
          <strong>[ SocioProphet ] Platform</strong>
        </a>
      </div>
    </div>
  );
};

export default HeaderLanding;
