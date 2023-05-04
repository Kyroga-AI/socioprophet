const express = require("express");
require("dotenv").config({ path: "../.env" });
// middleware imports
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const cookieSession = require("cookie-session");

const rssRouter = require("./routes/api/rss-route");

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

// add middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/feed", rssRouter);

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
