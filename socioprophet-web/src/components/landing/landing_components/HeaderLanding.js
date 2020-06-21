import React from "react";

import fish from "../images/fishCropFinal.gif";

import "./styles/headerLanding.css";

const HeaderLanding = () => {
  return (
    <div>
      {/* Platform Name Element */}

      <div className="header__title">
        <div className="footer__fish">
          {/* <img
            src="src/components/landing/images/fishbowl-landing.jpg"
            width="35px"
            height="30px"
          /> */}
          <img
            className="fishGif"
            src={fish}
            width="35px"
            height="30px"
            alt="fish bowl"
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
