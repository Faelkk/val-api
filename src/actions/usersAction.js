const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const supabase = require("../connection/db");
const env = require("../config/config");

async function loginUser(email, password) {
  try {
    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (error) throw error;

    const user = users && users.length > 0 ? users[0] : null;

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      env.jwtSecret,
      { expiresIn: "7d" }
    );

    return { accessToken };
  } catch (error) {
    throw error;
  }
}

async function registerUser(name, email, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const { data: existingUsers, error: existingUsersError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (existingUsersError) existingUsersError;

    if (existingUsers.length > 0) {
      throw new Error("Email already exists");
    }

    const { error } = await supabase.from("users").insert([
      {
        name,
        email,
        password: hashedPassword,
      },
    ]);

    if (error) throw error;

    const { data: newUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    const accessToken = jwt.sign(
      { userId: newUser[0].id, email: newUser[0].email },
      env.jwtSecret,
      { expiresIn: "7d" }
    );

    return { accessToken };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  loginUser,
  registerUser,
};
