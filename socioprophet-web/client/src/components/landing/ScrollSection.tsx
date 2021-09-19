import React from 'react';
// UI Components
import ScrollSegment from './ScrollSegment';
import FadeInSection from './FadeInSection';

import './scss/scrollSection.scss';

const ScrollSection = (): JSX.Element => {
  return (
    <div className="landing__more">
      <ScrollSegment className="landing-platform" heading="PLATFORM">
        <FadeInSection props>
          <p className="landing__more__section__info">
            Built as a social networking platform. For geeks, but simple enough for everyone to use.
          </p>
        </FadeInSection>
      </ScrollSegment>
      <ScrollSegment className="landing-community" heading="COMMUNITY">
        <FadeInSection props>
          <p className="landing__more__section__info">
            Unlock the world's best ideas through democratized social intelligence, data, analytics
            & AI.
          </p>
        </FadeInSection>
      </ScrollSegment>
      <ScrollSegment className="landing-dataAi" heading="DATA & AI">
        <FadeInSection props>
          <p className="landing__more__section__info">
            Share your compute through leveraging peer to peer and federated networks or centralized
            collaboration models.
          </p>
        </FadeInSection>
      </ScrollSegment>
    </div>
  );
};

export default ScrollSection;
