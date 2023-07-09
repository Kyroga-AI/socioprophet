import React from 'react';
import { Header } from '../header';
import Footer from '../footer/Footer';
import TickerFeed from '../ticker-feed';
import ScrollSection from './ScrollSection';
import logo from '../../../public/images/mothership-logo.png';
import './scss/landing.scss';

const Landing = () => {
  return (
    <div className="landing">
      <Header>
        <div className="landing__header__login">
          <a
            style={{ textDecoration: 'none' }}
            className="landing__header__login"
            href="https://wiki.socioprophet.com"
            target="_blank"
            rel="noopener"
          >
            Wiki
          </a>
        </div>
        <div className="landing__header__login">
          <a
            style={{ textDecoration: 'none' }}
            className="landing__header__login"
            href="https://socioprophet.blog"
            target="_blank"
            rel="noopener"
          >
            Blog
          </a>
        </div>
      </Header>
      <TickerFeed />
      <div className="landing__container">
        <div className="landing__container__main">
          <div className="landing__container__main__logo">
            <img src={logo} width="450px" height="77px" alt="socioprophet logo" />
          </div>

          <p className="landing__container__main__subtitle">
            <strong>Open Collaborative Socio-Dat-Analytics &bull; Global Shared Knowledge</strong>
          </p>
        </div>
      </div>
      <ScrollSection />
      <Footer />
    </div>
  );
};

export default Landing;
