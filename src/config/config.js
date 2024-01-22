require("dotenv").config();

class Env {
  constructor(apiURL, apiKeyUrl, jwtSecret) {
    this.apiUrl = apiURL;
    this.apiKeyUrl = apiKeyUrl;
    this.jwtSecret = jwtSecret;
  }
}

const env = new Env(
  process.env.API_KEY_URL,
  process.env.API_PASSWORD_URL,
  process.env.JWT_SECRET_KEY
);

console.log(env.apiKeyUrl);

module.exports = env;
