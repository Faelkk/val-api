const supabase = require("../connection/db");
const validateHome = require("../helpers/validateHome");

const sendErrorResponse = require("../utils/sendErrorResponse");
const errorMessages = require("../utils/errorMessages");

module.exports = {
  async getHomeDetails(req, res) {
    try {
      const { data, error } = await supabase.from("home_details").select("*");
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
      const { data, error } = await supabase
        .from("home_details")
        .select("*")
        .eq("id", id);

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
      const { data, error } = await supabase.from("home_details").insert([
        {
          video_background_home: videoBgHomePath,
          episode,
          url_trailer_home: urlTrailerHome,
          act,
        },
      ]);

      if (error) {
        return sendErrorResponse(res, errorMessages.internalServerError);
      }

      const newHomeDetails = data && data.length > 0 ? data[0] : null;

      res.send(200, { newHomeDetails });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },

  async deleteHomeDetails(req, res) {
    let { id } = req.params;

    try {
      const { error } = await supabase
        .from("home_details")
        .delete()
        .eq("id", id);

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
      const { data, error } = await supabase
        .from("home_details")
        .update({
          video_background_home: videoBgHomePath,
          episode,
          url_trailer_home: urlTrailerHome,
          act,
        })
        .eq("id", id);

      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);

      res.send(200, { data });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },
};
