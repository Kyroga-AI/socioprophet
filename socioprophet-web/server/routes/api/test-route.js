const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/data", (req, res) => {
  // const data = fetch("https://hnrss.org/newest");
  // const feedData = fetch("https://hnrss.org/newest")
  //   .then((res) => res.text())
  //   .then((body) => console.log(typeof body));
  // console.log(feedData);
  // res.status(200).send(feedData);
  const data = fetch("https://jsonplaceholder.typicode.com/todos/1");
  // .then((json) => res.json());
  res.json(data);
});

module.exports = router;
