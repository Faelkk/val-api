const env = require("../config/config");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(env.apiUrl, env.apiKeyUrl);

module.exports = supabase;
