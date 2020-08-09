import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "@carbon/ibm-security";
import { TextInput, Icon, ButtonsGroup } from "watson-react-components";
import queryString from "query-string";
import axios from "axios";

import "./styles/headerLinks.css";

// const discovery = new DiscoveryV1({
//   version: "{version}",
//   authenticator: new IamAuthenticator({
//     apikey: "{apikey}",
//   }),
//   url: "{url}",
// });

const HeaderLinks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchValue, setSearchValue] = useState("");
  const [afterEnter, setAfterEnter] = useState("This is before enter");

  const handleKeyPress = (e) => {
    const searchValue = e.target.value;
    if (e.key === "Enter" && searchValue.match(/[^\s]+/)) {
      // setSearchQuery(searchValue);
      setAfterEnter(searchValue);

      const qs = queryString.stringify({ searchQuery });
      // axios({
      //   method: "POST",
      //   url: "/search/api/search",
      //   data: qs,
      // });
      fetch(`/api/search`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw response;
          }
        })

        .catch((response) => {
          console.log("bad");
          console.error(response);
        });
    }
  };

  return (
    <div className="headerLinks">
      <nav className="header__list">
        <ul>
          <li className="header__list__item hidden">
            {/* <Search
              closeButtonLabelText="Clear search input"
              className="dark"
              defaultValue=""
              id="search-1"
              labelText="Search"
              name=""
              onChange={function noRefCheck() {}}
              // onClick={setNumber(1)}
              placeHolderText="Search..."
              size="sm"
              type="text"
              light={false}
            /> */}
            <TextInput
              placeholder={"Search..."}
              onKeyPress={handleKeyPress}
              onInput={(e) => setSearchQuery(e.target.value)}
              defaultValue={searchQuery}
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
