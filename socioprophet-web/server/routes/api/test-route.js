const express = require("express");
const NodeCache = require("node-cache");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const router = express.Router();

const cache = new NodeCache({ stdTTL: 600 });

const url = "https://hnrss.org/newest";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://socioprophet-web.firebaseio.com",
});

router.get("/data", (req, res) => {
  res.status(200).json({ serverProd: "server data" });
});

router.get("/rss", (req, res) => {
  const cachedData = cache.get(url);
  if (cachedData) {
    res.send(cachedData);
  } else {
    fetch(url)
      .then((r) => r.text(r))
      .then((data) => {
        cache.set(url, data);
        res.send(data);
      });
  }
});

module.exports = router;
