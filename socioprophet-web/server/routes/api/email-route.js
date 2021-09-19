const express = require("express");
// const admin = require("firebase-admin");
// const nodemailer = require("nodemailer");
const router = express.Router();

// supabase...
const { createClient } = require("@supabase/supabase-js");

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_PUBLIC_ANON_KEY
// );

// initialise firebase admin sdk
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
// });

// post request with 'email' data as req body
// router.post("/email", (req, res) => {
//   // extract user email fromr request body
//   const email = req.body.email;

//   // set settings for generating link
//   const actionCodeSettings = {
//     url: "https://www.socioprophet.com/signup",
//     handleCodeInApp: true,
//   };

//   // use the firebase admin sdk to generate an authentication link
//   admin
//     .auth()
//     .generateSignInWithEmailLink(email, actionCodeSettings)
//     .then((link) => {
//       // create a transporter object for nodemailer smtp with gmail as the service provider
//       let transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.GMAIL_USERNAME,
//           pass: process.env.GMAIL_PASSWORD,
//           clientId: process.env.GMAIL_CLIENT_ID,
//           clientSecret: process.env.GMAIL_CLIENT_SECRET,
//           refreshToken: process.env.GMAIL_REFRESH_TOKEN,
//         },
//       });

//       // constuct email object
//       let mailOptions = {
//         from: "noreply@socioprophet.ai",
//         to: email,
//         subject: "SignIn Requested",
//         html: `
//           <h1>SocioProphet&#174;</h1>
//           <p>Hello,</p>
//           <p>We received a request from this email to sign in to SocioProphet.</p>
//           <p>If you would like to sign in via ${email}, you can follow this link:</p>
//           <a href=${link}>Sign in to SocioProphet!</a>
//           <br />
//           <p>If you did not request this link to sign in to SocioProphet, you can safely ignore this email.</p>
//           <br />
//           <p>Thanks!</p>
//           <p>The SocioProphet Team</p>
//         `,
//       };

//       // send email object using transporter object
//       transporter.sendMail(mailOptions, function (err, data) {
//         if (err) {
//           console.log("Error " + err);
//         } else {
//           console.log("Email sent successfully");
//         }
//       });
//     })
//     .catch((err) => {
//       // log errors
//       console.error("An error happened: " + err);
//     });

//   res.json({ requestBody: "signin" });
// });

router.post("/user", (req, res) => {
  // const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // const userId = req.body.user_id;

  // const { error } = supabase.auth.api.deleteUser(userId, serviceRoleKey);
  // if (error) {
  //   console.log(error);
  // } else {
  //   res.status(200).send({ msg: "success" });
  // }
  res.status(200).send({ msg: "success" });
});

module.exports = router;
