import React, { useState, useEffect } from "react";
import Ticker from "react-ticker";
import {
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
} from "carbon-components-react/lib/components/UIShell";

import HeaderLanding from "./landing_components/HeaderLanding";
import HeaderLinks from "./landing_components/HeaderLinks";
import Offering from "./landing_components/Offering";
import Footer from "./landing_components/Footer";
import SignUp from "./Forms/SignUp";
import Login from "./Forms/Login";
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
      <p className="main__sub__ticker__text">
        {feed.map((items) => (
          <a id="rssLink" href={items.link} target="_blank">
            <strong>{items.title}</strong>
          </a>
        ))}
      </p>
    ) : (
      <p styles={{ visibility: "hidden" }}>----------</p>
    );
  };

  const loginToggle = () => {
    setExpanded(isExpanded === false ? true : false);
    if (register || isExpanded) {
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
      <nav className="landing__header">
        <HeaderLanding />
        <HeaderLinks />
        <HeaderGlobalBar>
          <HeaderGlobalAction
            id="userIcon"
            aria-label="App Switcher"
            onClick={loginToggle}
          >
            <svg width="20" height="20">
              <title>user</title>
              <path d="M6 15.745A6.968 6.968 0 0 0 10 17a6.968 6.968 0 0 0 4-1.255V15.5a2.5 2.5 0 0 0-2.5-2.5h-3A2.5 2.5 0 0 0 6 15.5v.245zm-.956-.802A3.5 3.5 0 0 1 8.5 12h3a3.5 3.5 0 0 1 3.456 2.943 7 7 0 1 0-9.912 0zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
              <path d="M10 9.841a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
            </svg>
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <HeaderPanel aria-label="Header Panel" expanded={isExpanded}>
          {login && <Login />}
          {register && <SignUp />}
        </HeaderPanel>
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
            <strong>Prophet</strong>
            <p className="main__background__title__sub">
              <strong>
                Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.
              </strong>
            </p>
          </div>
          <div className="btn--mobile">
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
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
