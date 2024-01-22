const homeActions = require("../actions/homeActions");
const validateHome = require("../helpers/validateHome");
const sendErrorResponse = require("../utils/sendErrorResponse");
const errorMessages = require("../utils/errorMessages");
const fs = require("fs");

module.exports = {
  async getHomeDetails(req, res) {
    try {
      const { data, error } = await homeActions.getHomeDetails();
      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);
      res.send(200, data);
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },

  async getHomeById(req, res) {
    let { id } = req.params;

    try {
      const { data, error } = await homeActions.getHomeById(id);

      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);

      const homeDetailsById = data && data.length > 0 ? data[0] : null;

      if (!homeDetailsById)
        return sendErrorResponse(res, errorMessages.notFound(id));

      res.send(200, homeDetailsById);
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },

  async createHomeDetails(req, res) {
    const videoBgHomePath = req.file.path;
    const { urlTrailerHome, episode, act } = req.body;

    const isValidationSuccess = validateHome(req.body, res);

    if (!isValidationSuccess || !videoBgHomePath) return;

    try {
      const { error } = await homeActions.createHomeDetails(videoBgHomePath, {
        urlTrailerHome,
        episode,
        act,
      });

      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);

      res.send(200, { created: true });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },

  async deleteHomeDetails(req, res) {
    let { id } = req.params;

    try {
      const { error } = await homeActions.deleteHomeDetails(id);

      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);

      res.send(200, { deleted: true });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },

  async updateHomeDetails(req, res) {
    let { id } = req.params;
    const videoBgHomePath = req.file.path;
    const { urlTrailerHome, episode, act } = req.body;

    const isValidationSuccess = validateHome(req.body, res);

    if (!isValidationSuccess || !videoBgHomePath) return;

    try {
      const { data, error } = await homeActions.updateHomeDetails(
        id,
        videoBgHomePath,
        {
          urlTrailerHome,
          episode,
          act,
        }
      );

      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);

      res.send(200, { data });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },
};
