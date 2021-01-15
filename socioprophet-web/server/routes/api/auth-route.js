const { google } = require("googleapis");
const express = require("express");

const authKey = require("../../google_key.json");

const router = express.Router();

// credentials...
const CLIENT_ID = authKey.client.id;
const CLIENT_SECRET = authKey.client.secret;
const REDIRECT_URL = authKey.client.redirect;

const SCOPES = [
  "https://www.googleapis.com/auth/admin.directory.group",
  "https://www.googleapis.com/auth/admin.directory.group.member",
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL[0]
);
var authorized = false;

router.get("/members", (req, res) => {
  if (!authorized) {
    // generate OAuth 2.0 url to redirect user...
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    res.send(authUrl);
  } else {
    const service = google.admin({ version: "directory_v1", oAuth2Client });
    res.send("Logged in");
  }
});

router.get("/members/callback", (req, res) => {
  console.log("in the callback");
  const code = req.query.code;
  console.log(code);
  if (code) {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return console.error(`Error retrieving access token; ${err}`);
      } else {
        // console.log(token);
        oAuth2Client.credentials = token;
        console.log(oAuth2Client.credentials);
        authorized = true;
        console.log("USER IS AUTHORIZED");
        const service = google.admin({
          version: "directory_v1",
          auth: oAuth2Client,
        });
        // service.members.insert({
        //   groupKey: "free-tier-users@socioprophet.ai",
        //   requestBody: {
        //     email: "willjones484@gmail.com",
        //   },
        // });

        console.log(oAuth2Client.credentials.getIdTokens());

        // probably want to set JWT here...
        /**
         *  need to extract user information here as well
         *
         *
         *
         */
        res.redirect("/members/alpha");
      }
    });
  }
});

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};
router.get("/members/alpha", checkToken, (req, res) => {});

router.get("/members/test", (req, res) => {
  console.log("inside of /members/test GET route");
  res.redirect("/api/auth/members/test/redirected");
});
router.get("/members/test/redirected", (req, res) => {
  console.log("inside of /members/test/redirected GET route");
  res.send("/password-reset");
});

module.exports = router;
