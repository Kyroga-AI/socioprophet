import React from "react";

// styles
import "./styles/headerLinks.css";

const HeaderLinks = () => {
  return (
    <div className="headerLinks">
      <nav className="headerLinks__list">
        <ul>
          <li id="spGitHub" className="headerLinks__list__item">
            <a
              className="headerLinks__list__item__link"
              href="https://gitlab.com/socioprophet"
              target="_blank"
            >
              GitLab
            </a>
          </li>
          <li id="spBlog" className="headerLinks__list__item">
            <a
              className="headerLinks__list__item__link"
              href="https://socioprophet.blog"
              target="_blank"
            >
              Blog
            </a>
          </li>
          {/* <li id="spDocs" className="headerLinks__list__item">
            <a
              className="headerLinks__list__item__link"
              href="#"
              target="_blank"
            >
              Docs
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderLinks;
