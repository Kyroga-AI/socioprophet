const express = require("express");

// middleware imports
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./config/passport");

// test prod route
const testRouter = require("./routes/api/test-route");
// route imports
const authRouter = require("./routes/api/auth-route");
// const passportRouter = require("./routes/api/authWithPassport");

// set up port
const port = process.env.PORT || 5001;

// create express app
const app = express();

// Basic cookie setup
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    name: "basic-session",
    keys: ["key1", "key2"],
  })
);

// Initialise...
app.use(passport.initialize());
app.use(passport.session());

// add middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Test Prod Route
app.use("/api/test", testRouter);
// app.use("/api/rss", rssRouter);
app.use("/api/auth", authRouter);
// app.use("/api/passportAuth", passportRouter);

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
