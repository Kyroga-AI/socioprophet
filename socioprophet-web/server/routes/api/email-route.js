const express = require("express");
const router = express.Router();

// supabase...
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "http://137.184.132.251:8000",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYyNzIwODU0MCwiZXhwIjoxOTc0MzYzNzQwLCJhdWQiOiIiLCJzdWIiOiIiLCJyb2xlIjoiYW5vbiJ9.Mwpb4Yz-oGwYZVLB3GMvBXm81E9xh3LOrlDfBlTregA"
);

router.post("/user", (req, res) => {
  // const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // const userId = req.body.user_id;

  // const { error } = supabase.auth.api.deleteUser(userId, serviceRoleKey);
  // if (error) {
  //   console.log(error);
  // } else {
  //   res.status(200).send({ msg: "success" });
  // }
  const { error } = supabase.from("users").select().then(console.log);
  if (!error) {
    res.status(200).send({ msg: "success" });
  }
});

module.exports = router;
