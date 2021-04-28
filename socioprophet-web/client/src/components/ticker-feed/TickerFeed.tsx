import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Ticker from 'react-ticker';

// styles
import './scss/tickerFeed.scss';

// type interface for rss feed data
interface IFeed {
  title: string | null;
  link: string | null;
}

const TickerFeed = () => {
  // RSS Component
  const GetRssFeedData = () => {
    const [feed, setFeed] = useState<IFeed[]>();
    useEffect(() => {
      // used to only call set state if component is still mounted
      let mounted: boolean = true;

      const getRss = async () => {
        await fetch('/api/test/rss')
          .then((res) => res.text())
          .then((data) => {
            const xmlDoc = new DOMParser().parseFromString(data, 'text/xml');
            const items: IFeed[] = Array.from(xmlDoc.querySelectorAll('item')).map((item) => ({
              // @ts-ignore: Object is possibly 'null'.
              title: item.querySelector('title').textContent,
              // @ts-ignore: Object is possibly 'null'.
              link: item.querySelector('link').textContent,
            }));
            if (mounted) {
              setFeed(items);
            }
          });
      };
      getRss();

      return () => {
        mounted = false;
      };
    }, []);

    return feed ? (
      <p className="ticker__field__text">
        {feed.map((items) => (
          <a key={items.title} id={uuidv4()} href={items.link || ''} target="_blank" rel="noopener">
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
