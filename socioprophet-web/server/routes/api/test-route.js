const express = require("express");
const router = express.Router();

router.get("/data", (req, res) => {
  res.status(200).json({ serverProd: "server data" });
});

module.exports = router;
