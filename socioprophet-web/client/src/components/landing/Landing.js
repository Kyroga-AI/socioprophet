import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
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
import SignUp from "./forms/SignUp";
import Login from "./forms/Login";

import { useAuth } from "../../authentication/contexts/AuthContext";

import googleIcon from "../../../public/images/google-sign-in-light.jpg";

// styles

import "./styles/landing.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#000",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

const Landing = () => {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const [isExpanded, setExpanded] = useState(false);
  const [login, renderLogin] = useState(false);
  const [register, renderRegister] = useState(false);

  const currentUser = useAuth();

  const history = useHistory();
  const { googleSignIn } = useAuth();

  const url = "https://cors-anywhere.herokuapp.com/https://hnrss.org/newest";

  // test function...
  // const test = async () => {
  //   const redirect = await fetch("/api/passportAuth/google").then((r) =>
  //     r.text()
  //   );
  //   console.log(redirect);
  //   window.location.href = redirect;
  // };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (err) {
      console.trace(err);
    }
  };

  const GetRssFeedData = () => {
    const [feed, setFeed] = useState("");

    useEffect(() => {
      let isCancelled = false;
      console.log("render - FEED EFFECT");
      const getFeed = async () => {
        const text = await fetch(url).then((r) => r.text());
        const xmlDoc = new DOMParser().parseFromString(text, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("item")).map(
          (item) => ({
            title: item.querySelector("title").textContent,
            link: item.querySelector("link").textContent,
          })
        );
        if (!isCancelled) {
          setFeed(items);
        }
      };
      // getFeed();

      return () => {
        isCancelled = true;
      };
    }, []);

    return feed ? (
      <p className="main__sub__ticker__text">
        {feed.map((items) => (
          <a key={items.title} id="rssLink" href={items.link} target="_blank">
            {items.title}
          </a>
        ))}
      </p>
    ) : (
      <p className="main__sub__ticker__text">
        Welcome to SocioProphet! Just Waiting for the HackerNews Feed!
      </p>
    );
  };

  useEffect(() => {
    try {
      console.log(currentUser);
    } catch (err) {
      console.log(err);
    }
  });
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
            onClick={registerToggle}
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
            <button className="main__background__login" onClick={openModal}>
              SocioProphet Team
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="SignIn Modal"
            >
              <h3 className="modal__heading">SocioProphet Internal SignIn</h3>
              <div className="form__googleBtn">
                <img onClick={handleSignIn} src={googleIcon} />
              </div>
            </Modal>
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
