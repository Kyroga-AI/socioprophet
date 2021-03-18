import React from "react";
import Slider from "react-slick";

// styles
import "./styles/offering.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplaySpeed: 18000,
  autoplay: true,
};

const Offering = () => {
  return (
    <div>
      <div className="main__descriptive">
        <div className="main__descriptive__title"></div>
      </div>
      {/* Main Offering Element */}
      <div className="main__offering">
        <Slider {...settings}>
          <div className="div">
            <div className="main__offering__card">
              <div className="main__offering__card__name">Platform</div>
              <div className="main__offering__card__description">
                SocioProphet is a web 3.0 community for distributed
                infrastructure, data, analytics & AI, built as a social
                networking platform - for geeks, but simple enough for everyone.
              </div>
            </div>
          </div>

          <div className="div">
            <div className="main__offering__card">
              <div className="main__offering__card__name">Community</div>
              <div className="main__offering__card__description">
                A collaborative distributed system and social network. Aimed to
                unlock the world's best ideas through democratized social
                intelligence.
              </div>
            </div>
          </div>

          <div className="div">
            <div className="main__offering__card">
              <div className="main__offering__card__name">Data & AI</div>
              <div className="main__offering__card__description">
                Share your compute, storage, data, analytics, AI models and
                workflows. Achieved through leveraging peer to peer and
                federated networks, or centralized collaboration models.
              </div>
            </div>
          </div>
          <div className="div">
            <div className="main__offering__card">
              <div className="main__offering__card__name">Platform</div>
              <div className="main__offering__card__description">
                SocioProphet is a web 3.0 community for distributed
                infrastructure, data, analytics & AI, built as a social
                networking platform - for geeks, but simple enough for everyone.
              </div>
            </div>
          </div>

          <div className="div">
            <div className="main__offering__card">
              <div className="main__offering__card__name">Community</div>
              <div className="main__offering__card__description">
                A collaborative distributed system and social network. Aimed to
                unlock the world's best ideas through democratized social
                intellegence.
              </div>
            </div>
          </div>

          <div className="div">
            <div className="main__offering__card">
              <div className="main__offering__card__name">Data & AI</div>
              <div className="main__offering__card__description">
                Share your compute, storage, data, analytics, AI models and
                workflows. Achieved through leveraging peer to peer and
                federated networks, or centralized collaboration models.
              </div>
            </div>
          </div>
        </Slider>
      </div>
      <div className="main__offering--mobile">
        <div className="div">
          <div className="main__offering__card">
            <div className="main__offering__card__name">Platform</div>
            <div className="main__offering__card__description">
              SocioProphet is a web 3.0 community for distributed
              infrastructure, data, analytics & AI, built as a social networking
              platform - for geeks, but simple enough for everyone.
            </div>
          </div>
        </div>

        <div className="div">
          <div className="main__offering__card">
            <div className="main__offering__card__name">Community</div>
            <div className="main__offering__card__description">
              A collaborative distributed system and social network. Aimed to
              unlock the world's best ideas through democratized social
              intellegence.
            </div>
          </div>
        </div>

        <div className="div">
          <div className="main__offering__card">
            <div className="main__offering__card__name">Data & AI</div>
            <div className="main__offering__card__description">
              Share your compute, storage, data, analytics, AI models and
              workflows. Achieved through leveraging peer to peer and federated
              networks, or centralized collaboration models.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offering;
