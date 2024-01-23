const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const supabase = require("../connection/db");
const env = require("../config/config");
const sendErrorResponse = require("../utils/sendErrorResponse");
const errorMessages = require("../utils/errorMessages");

module.exports = {
  async loginUser(res, email, password) {
    try {
      let { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      if (error) throw error;

      const user = users && users.length > 0 ? users[0] : null;

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return sendErrorResponse(res, errorMessages.invalidCredentials);
      }

      const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        env.jwtSecret,
        { expiresIn: "1000d" }
      );

      return { accessToken };
    } catch (error) {
      throw error;
    }
  },

  async registerUser(res, name, email, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const { data: existingUsers, error: existingUsersError } = await supabase
        .from("users")
        .select("email")
        .eq("email", email);

      if (existingUsers.length > 0) {
        console.log(existingUsers);
        return sendErrorResponse(res, errorMessages.emailAlreadyExists);
      }

      const { error } = await supabase.from("users").insert([
        {
          name,
          email,
          password: hashedPassword,
        },
      ]);

      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);

      const { data: newUser } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      const accessToken = jwt.sign(
        { userId: newUser[0].id, email: newUser[0].email },
        env.jwtSecret,
        { expiresIn: "1000d" }
      );

      return { accessToken };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
