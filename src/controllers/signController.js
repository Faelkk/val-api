const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const supabase = require("../connection/db");
require("dotenv").config();

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(400, { error: "Email and password are required" });
    }

    try {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      if (error) {
        return res.send(500, { error: "Internal Server Error" });
      }

      const user = users && users.length > 0 ? users[0] : null;

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.send(400, { error: "Invalid credentials" });
      }

      const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      res.send(200, { accessToken });
    } catch (error) {
      console.error(error);
      res.send(500, { error: "Internal Server Error" });
    }
  },

  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send(400, { error: "Name, email, and password are required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const { data: existingUsers, error: existingUsersError } = await supabase
        .from("users")
        .select("email")
        .eq("email", email);

      if (existingUsersError) {
        return res.send(500, { error: "Internal Server Error" });
      }

      if (existingUsers.length > 0) {
        return res.send(400, { error: "This email is already in use" });
      }

      const { error } = await supabase.from("users").insert([
        {
          name,
          email,
          password: hashedPassword,
        },
      ]);

      if (error) {
        return res.send(500, { error: "Internal Server Error" });
      }

      const { data: newUser } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      const accessToken = jwt.sign(
        { userId: newUser[0].id, email: newUser[0].email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      res.send(200, { accessToken });
    } catch (error) {
      console.error(error);
      res.send(500, { error: "Internal Server Error" });
    }
  },
};
