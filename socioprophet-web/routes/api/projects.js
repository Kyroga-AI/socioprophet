const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../src/validation/config/keys");
const passport = require("passport");
const request = require("request");

const Project = require("../../src/models/Project");

router.post("/new", (req, res) => {
  console.log("adding project");
});

module.exports = router;
