const userActions = require("../actions/usersAction");
const sendErrorResponse = require("../utils/sendErrorResponse");
const errorMessages = require("../utils/errorMessages");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendErrorResponse(errorMessages.userInfoRequired);
    }

    try {
      const { accessToken } = await userActions.loginUser(res, email, password);
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

    try {
      const { accessToken } = await userActions.registerUser(
        res,
        name,
        email,
        password
      );
      res.send(200, { accessToken });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },
};
