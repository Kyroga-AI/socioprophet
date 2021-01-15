const express = require("express");
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const { google } = require("googleapis");

const router = express.Router();
// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

// Example protected and unprotected routes
router.get("/landing", (req, res) => res.send("Example Home page!"));
router.get("/failed", (req, res) => res.send("You Failed to log in!"));

// In this route you can see that if the user is logged in u can acess his info in: req.user

router.get("/good", isLoggedIn, (req, res) => {});

// Auth Routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/admin.directory.group https://www.googleapis.com/auth/admin.directory.group.member",
    ],
    accessType: "offline",
    prompt: "consent",
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  try {
    console.log("RUNNING");

    const tokens = JSON.parse(fs.readFileSync("./tokens.json"));
    const oAuth2Client = new google.auth.OAuth2(
      "392608809931-ledgl900563c73bd20eor7ubn19s6arj.apps.googleusercontent.com",
      "FiEQih0Bxz_DxjrX1nD0ijti",
      "http://localhost:8081/api/passportAuth/google/callback"
    );

    oAuth2Client.setCredentials(tokens);

    const service = google.admin({
      version: "directory_v1",
      auth: oAuth2Client,
    });

    service.members.insert(
      {
        groupKey: "free-tier-users@socioprophet.ai",
        requestBody: {
          email: "willjones484@gmail.com",
        },
      },
      (err, res) => {
        if (err) {
          console.error(`API returned an error: ${err}`);
        } else {
          console.log(res);
        }
      }
    );
    console.log("This is a res " + res);
    res.status(200).json({ status: true });
  } catch (err) {
    res.status(500).json({ error: "ah shit" });
  }
  // res.redirect("/api/passportAuth/good");
});

// router.get("/google/callback", (req, res) => {});
router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

module.exports = router;
