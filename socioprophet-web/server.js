const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const projects = require("./routes/api/projects");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./src/validation/config/keys").mongoURI;

// Connect to MongoDB
const mongo_uri = "mongodb://127.0.0.1:27017/socio_prophet_users";
mongoose
  .connect(mongo_uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./src/validation/config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/projects", projects);
// app.use("/api/search", projects);

app.get("/api/search", (req, res) => {
  const { query } = req.query;

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
    .then((res) => {
      console.log("QUERY WOKRKED!!!!!!!");
      console.log(JSON.stringify(res, null, 2));
    })
    .catch((err) => {
      console.log("error:", err);
    });

  // res.json({ message: "This is a response message" });
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
