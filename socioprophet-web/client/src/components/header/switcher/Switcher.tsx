import React from 'react';
import SwitcherGrid from './SwitcherGrid';
import SwitcherCell from './SwitcherCell';

import './scss/switcher.scss';

const Switcher = () => {
  return (
    <div className="switcher">
      <SwitcherGrid>
        <SwitcherCell link="https://gitlab.com/socioprophet" iconClass="fa fa-gitlab" />
        <SwitcherCell link="https://github.com/socioprophet" iconClass="fa fa-github" />
        <SwitcherCell link="https://twitter.com/socioprophet" iconClass="fa fa-twitter" />
        <SwitcherCell link="https://www.linkedin.com/company/68897627" iconClass="fa fa-linkedin" />

        <SwitcherCell link="https://www.reddit.com/user/socioprophet/" iconClass="fa fa-reddit" />
        <SwitcherCell link="https://socioprophet.blog/" iconClass="fa fa-medium" />
        <SwitcherCell link="https://www.instagram.com/socioprophet/" iconClass="fa fa-instagram" />
        <SwitcherCell
          link="https://www.facebook.com/SocioProphetPlatform"
          iconClass="fa fa-facebook"
        />
        <SwitcherCell
          link="hhttps://www.youtube.com/channel/UCi-Wx6rmlbrUceYtpswoDiA/videos"
          iconClass="fa fa-youtube"
        />
      </SwitcherGrid>
    </div>
  );
};

export default Switcher;
