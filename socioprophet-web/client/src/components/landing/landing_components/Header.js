import React from "react";

//styles and images
import "./styles/header.css";
import fish from "../../../../public/images/fishCropFinal.gif";

const Header = () => {
  return (
    <div className="header">
      <div className="header__fish">
        <img src={fish} width="35px" height="30px" alt="fish bowl" />
      </div>
      <a className="header__title" href="/">
        <strong>SocioProphet</strong>
      </a>
    </div>
  );
};

export default Header;
