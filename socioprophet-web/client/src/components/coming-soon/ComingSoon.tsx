import React from 'react';
import Header from '../header/Header';
import './comingSoon.scss';

const ComingSoon = () => {
  return (
    <div className="comingSoon">
      <Header />
      <div className="comingSoon__container">
        <h1 className="comingSoon__heading comingSoon__heading--main">Under Production</h1>
        <p className="comingSoon__heading comingSoon__heading--sub">Great things are coming!</p>
      </div>
    </div>
  );
};

export default ComingSoon;
