import React from 'react';
import FadeInSection from './FadeInSection';

import './scss/scrollSection.scss';

const ScrollSection = () => {
  return (
    <div className="landing__more">
      <div className="landing__more__section landing-platform">
        <h2 className="landing__more__section__heading">PLATFORM</h2>
        <FadeInSection props>
          <p className="landing__more__section__info">
            Built as a social networking platform. For geeks, but simple enough for everyone to use.
          </p>
        </FadeInSection>
      </div>

      <div className="landing__more__section community landing-community">
        <h2 className="landing__more__section__heading ">COMMUNITY</h2>
        <FadeInSection props>
          <p className="landing__more__section__info">
            Unlock the world's best ideas through democratized social intelligence, data, analytics
            & AI.
          </p>
        </FadeInSection>
      </div>

      <div className="landing__more__section landing-dataAi">
        <h2 className="landing__more__section__heading">DATA & AI</h2>
        <FadeInSection props>
          <p className="landing__more__section__info">
            Share your compute through leveraging peer to peer and federated networks or centralized
            collaboration models.
          </p>
        </FadeInSection>
      </div>
    </div>
  );
};

export default ScrollSection;
