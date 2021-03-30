import React, { Suspense, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../landing/landing_components/Header";
import HeaderLinks from "../landing/landing_components/HeaderLinks";
const TickerFeed = React.lazy(() => import("../ticker-feed/TickerFeed"));
import Footer from "../landing/landing_components/Footer";

import { useAuth } from "../../authentication/contexts/AuthContext";

// styles
import "./styles/alpha.css";

const Alpha = () => {
  // other hooks
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(currentUser);
  }, []);
  return (
    <div className="alpha">
      <nav className="nav--header">
        <Header />
        <HeaderLinks />
        <p
          className="alpha__header__link"
          onClick={() => history.push("/update-profile")}
        >
          Profile
        </p>
      </nav>
      <Suspense fallback={<p>Loading ...</p>}>
        <TickerFeed />
      </Suspense>
      <div className="alpha__container">
        <div className="alpha__container__sub">
          <p>
            <strong>
              Open Collaborative Socio-Dat-Alytics. For geeks, by geeks.
            </strong>
          </p>
        </div>
        <div className="alpha__container__tag">
          <p>
            <strong>COMING SOON</strong>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Alpha;
