import React from "react";

import "../styles/landing.css";

const OfferingCard = () => {
  return (
    <div>
      {/* Main Offering Element */}
      <div className="main__offering">
        {/* Main Offering Card Element */}
        <div className="main__offering__card">
          <div className="main__offering__card__name">
            [ SocioProphet ] Platform
          </div>
          <div className="main__offering__card__description">
            SocioProphet is a web 3.0 community for distributed infrastructure,
            data, analytics & AI, built as a social networking platform - for
            geeks, but simple enough for everyone.
          </div>
          <div className="main__offering__card__learnmore">
            <a
              className="main__offering__card__learnmore__link"
              href="https://socioprophet.blogspot.com/"
            >
              Learn More
            </a>
          </div>
        </div>
        {/* Main Offering Card Element */}
        <div className="main__offering__card">
          <div className="main__offering__card__name">
            [ SocioProphet ] Community
          </div>
          <div className="main__offering__card__description">
            A collaborative distributed system and social network. Aimed to
            unlock the world's best ideas through democratized social
            intellegence.
          </div>
          <div className="main__offering__card__learnmore">
            <a
              className="main__offering__card__learnmore__link"
              href="https://socioprophet.blogspot.com/"
            >
              Learn More
            </a>
          </div>
        </div>
        {/* Main Offering Card Element */}
        <div className="main__offering__card">
          <div className="main__offering__card__name">
            [ SocioProphet ] Data & AI
          </div>
          <div className="main__offering__card__description">
            Share your compute, storage, data, analytics, AI models and
            workflows. Achieved through leveraging peer to peer and federated
            networks, or centralized collaboration models.
          </div>
          <div className="main__offering__card__learnmore">
            <a
              className="main__offering__card__learnmore__link"
              href="https://socioprophet.blogspot.com/"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferingCard;
