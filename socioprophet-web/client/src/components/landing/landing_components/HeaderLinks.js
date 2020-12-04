import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles/headerLinks.css";

const HeaderLinks = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const handleQuery = (e) => {
    const searchQuery = e.target.value;
    if (e.key === "Enter") {
      history.push({
        pathname: "/search",
        state: { data: searchQuery },
      });
      setSearchQuery(searchQuery);
    }
  };

  return (
    <div className="headerLinks">
      <nav className="header__list">
        <ul>
          <li className="header__list__item hidden">
            <label>
              <input
                onKeyDown={handleQuery}
                name="query"
                type="text"
                placeholder="Search..."
              />
            </label>
          </li>
          <li id="spGitHub" className="header__list__item">
            <a
              className="header__list__item__link"
              href="https://github.com/SocioProphet"
            >
              GitHub
            </a>
          </li>
          <li id="spBlog" className="header__list__item">
            <a
              className="header__list__item__link"
              href="https://socioprophet.blogspot.com"
            >
              Blog
            </a>
          </li>
          <li id="spDocs" className="header__list__item">
            <a className="header__list__item__link" href="#">
              Docs
            </a>
          </li>
          <div className="header__list__btn">
            {/* no login yet - will be added in later when login becomes available*/}
            {/* <Link to="/login" className="header__list__btn__login">
            Log In
          </Link> */}
            {/* <Link to="/register" className="header__list__btn__signup">
              &#945; Registry
            </Link> */}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderLinks;
