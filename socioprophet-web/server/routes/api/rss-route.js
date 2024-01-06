const express = require("express");
const { JSDOM } = require("jsdom");
const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const router = express.Router();
const { HN_URL } = require("../../constants/index");

const cache = new NodeCache({ stdTTL: 600 });

const fetchHackerNewsFeed = async (res) => {
  const feedResponse = await fetch(HN_URL);
  const feedData = await feedResponse.text();

  const dom = new JSDOM(feedData, { contentType: "text/xml" });

  const items = Array.from(dom.window.document.querySelectorAll("item")).map(
    (item) => ({
      title: item.querySelector("title").textContent,
      link: item.querySelector("link").textContent,
    })
  );

  cache.set(HN_URL, items);
  res.send(items);
};

router.get("/rss", (_req, res) => {
  const cachedData = cache.get(HN_URL);

  if (cachedData) {
    res.send(cachedData);
  } else {
    fetchHackerNewsFeed(res);
  }
});

module.exports = router;
