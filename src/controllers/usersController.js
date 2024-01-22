const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const supabase = require("../connection/db");
const env = require("../config/config");

const sendErrorResponse = require("../utils/sendErrorResponse");
const errorMessages = require("../utils/errorMessages");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendErrorResponse(errorMessages.userInfoRequired);
    }

    try {
      let { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);

      const user = users && users.length > 0 ? users[0] : null;

      if (!user || !bcrypt.compareSync(password, user.password)) {
      }

      const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        env.jwtSecret,
        { expiresIn: "7d" }
      );

      res.send(200, { accessToken });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },

  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendErrorResponse(res, errorMessages.allUserInfoRequired);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const { data: existingUsers, error: existingUsersError } = await supabase
        .from("users")
        .select("email")
        .eq("email", email);

      if (existingUsersError) {
        return sendErrorResponse(res, errorMessages.internalServerError);
      }

      if (existingUsers.length > 0) {
        return sendErrorResponse(res, errorMessages.emailAlreadyExists);
      }

      const { error } = await supabase.from("users").insert([
        {
          name,
          email,
          password: hashedPassword,
        },
      ]);

      if (error) {
        return sendErrorResponse(res, errorMessages.internalServerError);
      }

      const { data: newUser } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      const accessToken = jwt.sign(
        { userId: newUser[0].id, email: newUser[0].email },
        env.jwtSecret,
        { expiresIn: "7d" }
      );

      res.send(200, { accessToken });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },
};
