import React from "react";
import { Link } from "react-router-dom";
import { Search } from "@carbon/ibm-security";

import { fade, makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import "./styles/headerLinks.css";

// const discovery = new DiscoveryV1({
//   version: "{version}",
//   authenticator: new IamAuthenticator({
//     apikey: "{apikey}",
//   }),
//   url: "{url}",
// });

// STYLING FOR MATERIAL UI SEARCH BAR

// const useStyles = makeStyles((theme) => ({
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(3),
//       width: "auto",
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

const HeaderLinks = () => {
  // const classes = useStyles();
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

            {/* MATERIAL UI SEARCH BAR */}

            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div> */}
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
