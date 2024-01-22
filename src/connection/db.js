const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://gqnzfpvcfsvoxflptsjr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxbnpmcHZjZnN2b3hmbHB0c2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3Njk2MDAsImV4cCI6MjAyMTM0NTYwMH0.koUprwjRoS-s71ZV1i-PwvJ2qfkSEv8-3hM8_HJk1RU"
);

module.exports = supabase;
