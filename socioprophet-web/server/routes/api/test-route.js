const express = require("express");
const fetch = require("node-fetch");
const { google } = require("googleapis");
const router = express.Router();

router.get("/data", (req, res) => {
  res.status(200).json({ serverProd: "server data" });
});

// router.post("/data", (req, res) => {
//   const accessToken = req.body.accessToken;
//   const refreshToken = req.body.refreshToken;

//   console.log(accessToken);
//   console.log(
//     "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
//   );
//   console.log(refreshToken);

//   const oauth2Client = new google.auth.OAuth2(
//     client_id,
//     client_secret,
//     redirect_uris
//   );

//   const token = {
//     access_token: accessToken,
//     scope:
//       "https://www.googleapis.com/auth/admin.directory.group https://www.googleapis.com/auth/admin.directory.group.member",
//     token_type: "Bearer",
//     expiry_date: 1617865480817,
//     refresh_token: refreshToken,
//   };

//   oauth2Client.credentials = token;

//   console.log(oauth2Client);
//   const service = google.admin({ version: "directory_v1", auth: oauth2Client });
//   service.members.insert({
//     groupKey: "free-tier-users@socioprophet.ai",
//     requestBody: {
//       email: "willjones484@gmail.com",
//     },
//   });

//   res.status(200).json({ serverProd: "server data" });
// });

router.get("/rss", (req, res) => {
  // console.log("hit");
  // const url = "https://hnrss.org/newest";
  // const data = fetch(url)
  //   .then((r) => r.text(r))
  //   .then((data) => res.send(data));
  res.status(200).json({ serverProd: "server data" });
});

module.exports = router;
