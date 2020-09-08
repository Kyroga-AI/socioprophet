import React from "react";
import Crawl from "react-star-wars-crawl";
import "react-star-wars-crawl/lib/index.css";

import Slider from "react-slick";

import "./styles/offering.css";
var settings = {
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
      {/* ---------- */}

      <div className="main__descriptive">
        {/* Star Wars crawl section */}
        {/* <div style={{ height: "200px", zIndex: "1000" }}>
          <Crawl
            fadeStyles={{ minHeight: "5vh" }}
            crawlStyles={{ animationIterationCount: "infinite" }}
            textContainerStyles={{ color: "#fff" }}
          >
            <div>
              It is a period of civil wars in the galaxy. A brave alliance of
              underground freedom fighters has challenged the tyranny and
              oppression of the awesome GALACTIC EMPIRE. Striking from a
              fortress hidden among the billion stars of the galaxy, rebel
              spaceships have won their first victory in a battle with the
              powerful Imperial Starfleet. The EMPIRE fears that another defeat
              could bring a thousand more solar systems into the rebellion, and
              Imperial control over the galaxy would be lost forever. To crush
              the rebellion once and for all, the EMPIRE is constructing a
              sinister new battle station. Powerful enough to destroy an entire
              planet, its completion spells certain doom for the champions of
              freedom.
            </div>
          </Crawl>
        </div> */}
        <div className="main__descriptive__title"></div>
      </div>
      {/* Main Offering Element */}
      <div className="main__offering">
        <Slider {...settings}>
          <div>
            <div className="div">
              {" "}
              <div className="main__offering__card">
                <div className="main__offering__card__name">Platform</div>
                <div className="main__offering__card__description">
                  SocioProphet is a web 3.0 community for distributed
                  infrastructure, data, analytics & AI, built as a social
                  networking platform - for geeks, but simple enough for
                  everyone.
                </div>
                {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
              </div>{" "}
            </div>
          </div>
          <div>
            <div className="div">
              {" "}
              <div className="main__offering__card">
                <div className="main__offering__card__name">Community</div>
                <div className="main__offering__card__description">
                  A collaborative distributed system and social network. Aimed
                  to unlock the world's best ideas through democratized social
                  intellegence.
                </div>
                {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          <div>
            <div className="div">
              {" "}
              <div className="main__offering__card">
                <div className="main__offering__card__name">Data & AI</div>
                <div className="main__offering__card__description">
                  Share your compute, storage, data, analytics, AI models and
                  workflows. Achieved through leveraging peer to peer and
                  federated networks, or centralized collaboration models.
                </div>
                {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          <div>
            <div className="div">
              {" "}
              <div className="main__offering__card">
                <div className="main__offering__card__name">
                  [ SocioProphet ] Platform
                </div>
                <div className="main__offering__card__description">
                  SocioProphet is a web 3.0 community for distributed
                  infrastructure, data, analytics & AI, built as a social
                  networking platform - for geeks, but simple enough for
                  everyone.
                </div>
                {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
              </div>{" "}
            </div>
          </div>
          <div>
            <div className="div">
              {" "}
              <div className="main__offering__card">
                <div className="main__offering__card__name">
                  [ SocioProphet ] Platform
                </div>
                <div className="main__offering__card__description">
                  SocioProphet is a web 3.0 community for distributed
                  infrastructure, data, analytics & AI, built as a social
                  networking platform - for geeks, but simple enough for
                  everyone.
                </div>
                {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
              </div>{" "}
            </div>
          </div>
          <div>
            <div className="div">
              {" "}
              <div className="main__offering__card">
                <div className="main__offering__card__name">
                  [ SocioProphet ] Platform
                </div>
                <div className="main__offering__card__description">
                  SocioProphet is a web 3.0 community for distributed
                  infrastructure, data, analytics & AI, built as a social
                  networking platform - for geeks, but simple enough for
                  everyone.
                </div>
                {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
              </div>{" "}
            </div>
          </div>
        </Slider>
      </div>
      <div className="main__offering--mobile">
        <div>
          <div className="div">
            {" "}
            <div className="main__offering__card">
              <div className="main__offering__card__name">Platform</div>
              <div className="main__offering__card__description">
                SocioProphet is a web 3.0 community for distributed
                infrastructure, data, analytics & AI, built as a social
                networking platform - for geeks, but simple enough for everyone.
              </div>
              {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
            </div>{" "}
          </div>
        </div>
        <div>
          <div className="div">
            {" "}
            <div className="main__offering__card">
              <div className="main__offering__card__name">Community</div>
              <div className="main__offering__card__description">
                A collaborative distributed system and social network. Aimed to
                unlock the world's best ideas through democratized social
                intellegence.
              </div>
              {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
            </div>
          </div>
        </div>
        <div>
          <div className="div">
            {" "}
            <div className="main__offering__card">
              <div className="main__offering__card__name">Data & AI</div>
              <div className="main__offering__card__description">
                Share your compute, storage, data, analytics, AI models and
                workflows. Achieved through leveraging peer to peer and
                federated networks, or centralized collaboration models.
              </div>
              {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
            </div>
          </div>
        </div>
        <div>
          <div className="div">
            {" "}
            <div className="main__offering__card">
              <div className="main__offering__card__name">
                [ SocioProphet ] Platform
              </div>
              <div className="main__offering__card__description">
                SocioProphet is a web 3.0 community for distributed
                infrastructure, data, analytics & AI, built as a social
                networking platform - for geeks, but simple enough for everyone.
              </div>
              {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
            </div>{" "}
          </div>
        </div>
        <div>
          <div className="div">
            {" "}
            <div className="main__offering__card">
              <div className="main__offering__card__name">
                [ SocioProphet ] Platform
              </div>
              <div className="main__offering__card__description">
                SocioProphet is a web 3.0 community for distributed
                infrastructure, data, analytics & AI, built as a social
                networking platform - for geeks, but simple enough for everyone.
              </div>
              {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
            </div>{" "}
          </div>
        </div>
        <div>
          <div className="div">
            {" "}
            <div className="main__offering__card">
              <div className="main__offering__card__name">
                [ SocioProphet ] Platform
              </div>
              <div className="main__offering__card__description">
                SocioProphet is a web 3.0 community for distributed
                infrastructure, data, analytics & AI, built as a social
                networking platform - for geeks, but simple enough for everyone.
              </div>
              {/* <div className="main__offering__card__learnmore">
                  <a
                    className="main__offering__card__learnmore__link"
                    href="https://socioprophet.blogspot.com/"
                  >
                    Learn More
                  </a>
                </div> */}
            </div>{" "}
          </div>
        </div>
      </div>
      {/* Main Offering Card Element */}
      {/* <div className="main__offering__card">
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
        </div> */}
      {/* Main Offering Card Element */}
      {/* <div className="main__offering__card">
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
        </div> */}
      {/* Main Offering Card Element */}
      {/* <div className="main__offering__card">
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
        </div> */}
    </div>
  );
};

export default Offering;
