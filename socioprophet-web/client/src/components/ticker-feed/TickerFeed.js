import React, { useState, useEffect } from "react";
import Ticker from "react-ticker";

import "./styles/tickerFeed.css";

const TickerFeed = () => {
  const GetRssFeedData = () => {
    const [feed, setFeed] = useState("");
    const path = "/api/test/rss";

    useEffect(() => {
      let isCancelled = false;
      const getRss = async () => {
        const text = await fetch(path)
          .then((res) => res.text())
          .then((data) => {
            const xmlDoc = new DOMParser().parseFromString(data, "text/xml");
            const items = Array.from(xmlDoc.querySelectorAll("item")).map(
              (item) => ({
                title: item.querySelector("title").textContent,
                link: item.querySelector("link").textContent,
              })
            );
            setFeed(items);
          });
      };
      getRss();

      return () => {
        isCancelled = true;
      };
    }, []);

    return feed ? (
      <p className="ticker__field__text">
        {feed.map((items) => (
          <a
            key={items.title}
            id={items.title}
            href={items.link}
            target="_blank"
            rel="noopener"
            className="rss-link"
          >
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
