const bodyParser = require("../helpers/bodyParser");

module.exports = (req, res, next) => {
  bodyParser(req, () => next());
};
