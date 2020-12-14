import React from "react";

import "./styles/headerLinks.css";

const HeaderLinks = () => {
  return (
    <div className="headerLinks">
      <nav className="header__list">
        <ul>
          <li id="spGitHub" className="header__list__item">
            <a
              className="header__list__item__link"
              href="https://github.com/SocioProphet"
            >
              GitHub
            </a>
          </li>
          <li id="spBlog" className="header__list__item">
            <a className="header__list__item__link" href="#">
              Blog
            </a>
          </li>
          <li id="spDocs" className="header__list__item">
            <a className="header__list__item__link" href="#">
              Docs
            </a>
          </li>
          <div className="header__list__btn"></div>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderLinks;
