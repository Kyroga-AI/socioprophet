import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import fish from "../../../../public/images/fishCropFinal.gif";

import "./styles/headerLanding.css";

const HeaderLanding = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const handleQuery = (e) => {
    const searchQuery = e.target.value;
    if (e.key === "Enter") {
      history.push({
        pathname: "/",
        state: { data: searchQuery },
      });
      setSearchQuery(searchQuery);
    }
  };

  return (
    <div>
      <div className="header__title">
        <div className="footer__fish">
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
      <label className="header__search">
        <input
          className="header__search__input"
          onKeyDown={handleQuery}
          name="query"
          type="text"
          placeholder="Search..."
        />
      </label>
    </div>
  );
};

export default HeaderLanding;
