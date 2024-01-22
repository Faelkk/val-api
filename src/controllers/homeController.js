const supabase = require("../connection/db");
const validateHome = require("../helpers/validateHome");

module.exports = {
  async getHomeDetails(req, res) {
    try {
      const { data, error } = await supabase.from("home_details").select("*");
      if (error) return res.send(500, { error: "Internal Server Error" });
      res.send(200, data);
    } catch (error) {
      console.error(error);
      res.send(500, { error: "Internal Server Error" });
    }
  },

  async getHomeById(req, res) {
    let { id } = req.params;

    try {
      const { data, error } = await supabase
        .from("home_details")
        .select("*")
        .eq("id", id);

      if (error) return res.send(500, { error: "Internal Server Error" });

      const homeDetailsById = data && data.length > 0 ? data[0] : null;

      if (!homeDetailsById)
        return res.send(404, {
          error: `Not found details for ID:${id}`,
        });

      res.send(200, homeDetailsById);
    } catch (error) {
      console.error(error);
      res.send(500, { error: "Internal Server Error" });
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
        return res.send(500, { error: "Internal Server Error" });
      }

      const newHomeDetails = data && data.length > 0 ? data[0] : null;

      res.send(200, { newHomeDetails });
    } catch (error) {
      console.error(error);
      res.send(500, { error: "Internal Server Error" });
    }
  },

  async deleteHomeDetails(req, res) {
    let { id } = req.params;

    try {
      const { error } = await supabase
        .from("home_details")
        .delete()
        .eq("id", id);

      if (error) return res.send(500, { error: "Internal Server Error" });

      res.send(200, { deleted: true });
    } catch (error) {
      console.error(error);
      res.send(500, { error: "Internal Server Error" });
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

      if (error) return res.send(500, { error: "Internal Server Error" });

      res.send(200, { data });
    } catch (error) {
      console.error(error);
      res.send(500, { error: "Internal Server Error" });
    }
  },
};
