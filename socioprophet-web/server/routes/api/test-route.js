const express = require("express");
const NodeCache = require("node-cache");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const router = express.Router();

const cache = new NodeCache({ stdTTL: 600 });

const url = "https://hnrss.org/newest";

// change this to dotenv
// const serviceAccount = require("./adminSDKToken.json");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

router.post("/data", (req, res) => {
  const email = req.body.email;
  const actionCodeSettings = {
    url: "https://socioprophet.com/signup",
    handleCodeInApp: true,
  };
  admin
    .auth()
    .generateSignInWithEmailLink(email, actionCodeSettings)
    .then((link) => {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        },
      });
      let mailOptions = {
        from: "noreply@socioprophet.ai",
        to: email,
        subject: "SignIn Requested",
        html: `
          <h1>SocioProphet&#174;</h1>
          <p>Hello,</p>
          <p>We received a request from this email to sign in to SocioProphet.</p>
          <p>If you would like to sign in via ${email}, you can follow this link:</p>
          <a href=${link}>Sign in to SocioProphet!</a>
          <br />
          <p>If you did not request this link to sign in to SocioProphet, you can safely ignore this email.</p>
          <br />
          <p>Thanks!</p>
          <p>The SocioProphet Team</p>
        `,
      };
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });
    })
    .catch((err) => {
      console.error("An error happened: " + err);
    });
  // res.json({
  //   "gmail-username": process.env.GMAIL_USERNAME,
  //   "gmail-password": process.env.GMAIL_PASSWORD,
  //   "gmail-client-id": process.env.GMAIL_CLIENT_ID,
  //   "gmail-client-secret": process.env.GMAIL_CLIENT_SECRET,
  //   "gmail-refresh-token": process.env.GMAIL_REFRESH_TOKEN,
  // });
  // res.send("gg");
  res.json({ requestBody: "data" });
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
