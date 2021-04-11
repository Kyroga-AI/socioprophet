const { google } = require("googleapis");
const express = require("express");
const router = express.Router();

// credentials...
const CLIENT_ID =
  "392608809931-uktf79hjt5o91r2fmvvm8fnfe4grfipv.apps.googleusercontent.com";
const CLIENT_SECRET = "T-iHQ2ZwqfW7OIUesi6XlQuX";
const REDIRECT_URL = "http://localhost:8081/api/auth/members/callback";

const SCOPES = [
  "https://www.googleapis.com/auth/admin.directory.group",
  "https://www.googleapis.com/auth/admin.directory.group.member",
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

router.get("/members", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.send(authUrl);
});

router.get("/members/callback", (req, res) => {
  const code = req.query.code;
  if (code) {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return console.error(`Error retrieving access token; ${err}`);
      } else {
        // console.log(token);
        oAuth2Client.credentials = token;
        console.log(oAuth2Client);

        console.log("USER IS AUTHORIZED");
        // const service = google.admin({
        //   version: "directory_v1",
        //   auth: oAuth2Client,
        // });
        // service.members.insert({
        //   groupKey: "free-tier-users@socioprophet.ai",
        //   requestBody: {
        //     email: "willjones484@gmail.com",
        //   },
        // });

        res.send("success!");
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
