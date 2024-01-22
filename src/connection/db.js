const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.API_KEY_URL,
  process.env.API_PASSWORD_URL
);

module.exports = supabase;
