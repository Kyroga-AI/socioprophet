const fs = require("fs");
const path = require("path");
const passport = require("passport");
const { google } = require("googleapis");
const GoogleStrategy = require("passport-google-oauth20");

passport.serializeUser(function (user, done) {
  /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "392608809931-ledgl900563c73bd20eor7ubn19s6arj.apps.googleusercontent.com",
      clientSecret: "FiEQih0Bxz_DxjrX1nD0ijti",
      callbackURL: "http://localhost:8081/api/passportAuth/google/callback",
    },
    (accessToken, refreshToken, tokenDetails, profile, done) => {
      let tokens = {
        access_token: accessToken,
        refresh_token: refreshToken,
        scope: tokenDetails.scope,
        token_type: tokenDetails.token_type,
        expiry_date: tokenDetails.expires_in,
      };
      let data = JSON.stringify(tokens);
      console.log("Writing to File........");
      fs.writeFileSync("./tokens.json", data);
      console.log("Finished writing to File......");

      // oAuth2Client.credentials = tokens;
      // const service = google.admin({
      //   version: "directory_v1",
      //   auth: oAuth2Client,
      // });
      // console.log("are we here???");
      // service.members.insert({
      //   groupKey: "free-tier-users@socioprophet.ai",
      //   requestBody: {
      //     email: "willjones484@gmail.com",
      //   },
      // });

      return done(null, profile);
    }
  )
);
