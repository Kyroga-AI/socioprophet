import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Ticker from "react-ticker";
// import Parser from "rss-parser";

import {
  HeaderContainer,
  Header,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
} from "carbon-components-react/lib/components/UIShell";

import HeaderLanding from "./landing_components/HeaderLanding";
import HeaderLinks from "./landing_components/HeaderLinks";
import Offering from "./landing_components/Offering";
import Footer from "./landing_components/Footer";

import LoginNav from "./LoginNav";
import RegisterNav from "./RegisterNav";

import "./styles/common.css";
import "./styles/landing.css";

const Landing = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [login, renderLogin] = useState(false);
  const [register, renderRegister] = useState(false);

  const url = "https://cors-anywhere.herokuapp.com/https://hnrss.org/newest";

  const GetRssFeedData = () => {
    const [feed, setFeed] = useState("");

    useEffect(() => {
      const getFeed = async () => {
        const text = await fetch(url).then((r) => r.text());
        const xmlDoc = new DOMParser().parseFromString(text, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("item")).map(
          (item) => ({
            title: item.querySelector("title").textContent,
            link: item.querySelector("link").textContent,
          })
        );

        setFeed(items);
      };
      getFeed();
    }, []);

    return feed ? (
      <p
        className="main__sub__ticker__text"
        style={{ marginTop: "8px", whiteSpace: "nowrap" }}
      >
        {feed.map((items) => (
          <a id="rssLink" href={items.link} target="_blank">
            {items.title}
          </a>
        ))}
      </p>
    ) : (
      <p styles={{ visibility: "hidden" }}>----------</p>
    );
  };

  const toggle = () => {
    setExpanded(isExpanded === false ? true : false);
  };

  const loginToggle = () => {
    setExpanded(isExpanded === false ? true : false);
    if (register && isExpanded) {
      renderLogin(false);
      renderRegister(false);
    } else {
      renderLogin(login === false ? true : false);
    }
  };

  const registerToggle = () => {
    setExpanded(isExpanded === false ? true : false);
    if (login && isExpanded) {
      renderRegister(false);
      renderLogin(false);
    } else {
      renderRegister(register === false ? true : false);
    }
  };

  return (
    <div className="landing">
      <nav className="header">
        <HeaderLanding />
        <HeaderLinks />
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label="SocioProphet Platform">
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="App Switcher">
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18 18h3v3h-3zm-7.5 0h3v3h-3zM3 18h3v3H3zm15-7.5h3v3h-3zm-7.5 0h3v3h-3zm-7.5 0h3v3H3zM18 3h3v3h-3zm-7.5 0h3v3h-3zM3 3h3v3H3z"></path>
                  </svg>
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="App Switcher" onClick={toggle}>
                  <svg width="20" height="20">
                    <title>user</title>
                    <path d="M6 15.745A6.968 6.968 0 0 0 10 17a6.968 6.968 0 0 0 4-1.255V15.5a2.5 2.5 0 0 0-2.5-2.5h-3A2.5 2.5 0 0 0 6 15.5v.245zm-.956-.802A3.5 3.5 0 0 1 8.5 12h3a3.5 3.5 0 0 1 3.456 2.943 7 7 0 1 0-9.912 0zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
                    <path d="M10 9.841a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                  </svg>
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <HeaderPanel aria-label="Header Panel" expanded={isExpanded}>
                {login && <LoginNav />}
                {register && <RegisterNav />}
              </HeaderPanel>
            </Header>
          )}
        />
      </nav>
      <div className="main">
        <div className="main__sub">
          <div className="main__sub__ticker">
            <Ticker offset="run-in">{() => <GetRssFeedData />}</Ticker>
          </div>
        </div>

        <div className="main__background">
          <div className="main__background__title">
            Socio
            <span style={{ color: "#f4f4f4" }}>
              <strong>Prophet</strong>
            </span>
            <p
              style={{
                marginTop: "25px",
                fontWeight: "800",
                paddingTop: "10px",
              }}
            >
              <span style={{ color: "#fff" }}>
                <strong>
                  Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.
                </strong>
              </span>
            </p>
          </div>
          <div className="main__background__responsive">
            <button className="main__background__login" onClick={loginToggle}>
              Log In
            </button>
            <button
              className="main__background__register"
              onClick={registerToggle}
            >
              &#945; - Registry
            </button>
          </div>
        </div>

        <Offering />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
