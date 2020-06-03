const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../src/validation/config/keys");
const passport = require("passport");
const request = require("request");

const Project = require("../../src/models/Project");

router.post("/new", (req, res) => {
  const newProject = new Project({
    name: req.body.name,
    description: req.body.description,
  });
  console.log("adding project");
  newProject
    .save()
    .then((project) => res.json(project))
    .catch((err) => console.error(err));
});

module.exports = router;
 