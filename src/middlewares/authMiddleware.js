const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const publicRoutes = ["/signin", "/signup"];

  if (publicRoutes.includes(req.url)) {
    next();
  } else {
    const isAuthenticated = verifyToken(req);

    if (isAuthenticated) {
      next();
    } else {
      res.writeHead(400, { "Content-type": "application/json" });
      res.end(JSON.stringify({ error: "unauthorized" }));
    }
  }
};

function verifyToken(req) {
  const token = getTokenFromRequest(req);

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.sub;
    return true;
  } catch (err) {
    return false;
  }
}

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  return token || null;
}
