const uploadMiddleware = require("../middlewares/uploadMiddleware");
const bodyParserMiddleware = require("../middlewares/bodyParserMiddleware");
const sendJsonResponse = require("../utils/sendJsonResponse");

const handleRoute = (req, res, route) => {
  req.query = Object.fromEntries(
    new URL(`http://localhost:5000${req.url}`).searchParams
  );
  req.params = { id: req.url.split("/").filter(Boolean)[1] };

  res.send = (statusCode, body) => sendJsonResponse(res, statusCode, body);

  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (
      req.headers["content-type"] &&
      req.headers["content-type"].startsWith("multipart/form-data")
    ) {
      uploadMiddleware.single("videoBackGroundHome")(req, res, (err) => {
        if (err) {
          sendJsonResponse(res, 500, {
            error: true,
            message: "Erro no upload do vídeo",
          });
        } else {
          route.handler(req, res);
        }
      });
      return;
    }
  }

  bodyParserMiddleware(req, res, () => route.handler(req, res));
};

module.exports = handleRoute;
