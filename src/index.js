const http = require("http");
const { URL } = require("url");
const routes = require("./routes/routes");
const handleRoute = require("./handlers/routeHandler");
const authMiddleware = require("./middlewares/authMiddleware");
require("dotenv").config();

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = new URL(`http://localhost:5000${req.url}`);
  let { pathname } = parsedUrl;
  let id = null;

  const splitEndPoint = pathname.split("/").filter(Boolean);

  if (splitEndPoint.length > 1) {
    pathname = `/${splitEndPoint[0]}/:id`;
    id = splitEndPoint[1];
  }

  const route = routes.find(
    (routeOBJ) =>
      routeOBJ.endpoint === pathname && routeOBJ.method === req.method
  );

  if (route) {
    authMiddleware(req, res, () => {
      handleRoute(req, res, route);
    });
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end(`Cannot access ${req.method} ${parsedUrl.pathname}`);
  }
});

server.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
