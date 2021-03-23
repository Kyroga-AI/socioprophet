import React, { useState, useEffect } from "react";
import Ticker from "react-ticker";

import "./styles/tickerFeed.css";

const TickerFeed = () => {
  const url = "https://corsanywhere.herokuapp.com/https://hnrss.org/newest";

  const GetRssFeedData = () => {
    const [feed, setFeed] = useState("");

    useEffect(() => {
      let isCancelled = false;
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
      getFeed();

      return () => {
        isCancelled = true;
      };
    }, []);

    return feed ? (
      <p className="ticker__field__text">
        {feed.map((items) => (
          <a key={items.title} id="rssLink" href={items.link} target="_blank">
            {items.title}
          </a>
        ))}
      </p>
    ) : (
      <p className="ticker__field__text">
        Welcome to SocioProphet! Just Waiting for the HackerNews Feed!
      </p>
    );
  };

  return (
    <div className="ticker">
      <div className="ticker__field">
        <Ticker offset="run-in">{() => <GetRssFeedData />}</Ticker>
      </div>
    </div>
  );
};

export default TickerFeed;
