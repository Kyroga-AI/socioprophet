import React from "react";
import { Link } from "react-router-dom";
import { Search } from "@carbon/ibm-security";

import "./styles/headerLinks.css";

const HeaderLinks = () => {
  return (
    <div className="headerLinks">
      {/* Header Links Element */}
      <nav className="header__list">
        <ul>
          <li className="header__list__item hidden">
            <Search
              closeButtonLabelText="Clear search input"
              className="dark"
              defaultValue=""
              id="search-1"
              labelText="Search"
              name=""
              onChange={function noRefCheck() {}}
              placeHolderText="Search..."
              size="sm"
              type="text"
              light={false}
            />
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
          {/* Header Links Buttons Element */}
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
