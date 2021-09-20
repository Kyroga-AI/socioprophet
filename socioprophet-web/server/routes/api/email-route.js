const express = require("express");
const router = express.Router();

// supabase...
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLIC_ANON_KEY
);

router.post("/user", (req, res) => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const userId = req.body.user_id;

  const { error } = supabase.auth.api.deleteUser(userId, serviceRoleKey);
  if (error) {
    console.log(error);
  } else {
    res.status(200).send({ msg: "success" });
  }
});

module.exports = router;
