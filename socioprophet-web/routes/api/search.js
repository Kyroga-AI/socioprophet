const express = require("express");
const router = express.Router();
const request = require("request");

router.post("/search", (req, res) => {
  const DiscoveryV1 = require("ibm-watson/discovery/v1");
  const { IamAuthenticator } = require("ibm-watson/auth");

  const discovery = new DiscoveryV1({
    version: "2019-04-30",
    authenticator: new IamAuthenticator({
      apikey: "sA_JXjp0KBPWXcwX-Ta_iQe5pVvbCiGZmXzeuxtMnnUu",
    }),
    url:
      "https://api.au-syd.discovery.watson.cloud.ibm.com/instances/5c636c22-b2b8-4953-a3ea-97e74279aefd/v1/environments/c5d8deff-4d9a-4286-aeb8-21c3a6a970ab/collections/42e92972-53bd-431c-9b81-ac260d1b190f/query?version=2018-12-03&deduplicate=false&highlight=true&passages=true&passages.count=5&query=enriched_text.entities.text:IBM",
  });

  const queryParams = {
    environmentId: "c5d8deff-4d9a-4286-aeb8-21c3a6a970ab",
    collectionId: "42e92972-53bd-431c-9b81-ac260d1b190f",
  };

  discovery
    .query(queryParams)
    .then((queryResponse) => {
      console.log("QUERY WOKRKED!!!!!!!");
      console.log(JSON.stringify(queryResponse, null, 2));
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

module.exports = router;
