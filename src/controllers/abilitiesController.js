const validateAbilities = require("../helpers/validateAbilities");
const supabase = require("../connection/db");

module.exports = {
  async listAbilities(req, res) {
    const { order } = req.query;

    try {
      const { data, error } = await supabase.from("agents").select("*");

      if (error) return res.send(500, { error: "Internal Server Error" });

      if (!order || (order !== "asc" && order !== "desc"))
        data.sort((a, b) => a.name.localeCompare(b.name));

      res.send(200, data);
    } catch (error) {
      res.send(500, { error: "Internal Server Error" });
    }
  },

  async getAbilityById(req, res) {
    let { id } = req.params;

    try {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("id", id)
        .single();

      if (error) return res.send(500, { error: "Internal Server Error" });

      if (!data)
        return res.send(404, {
          error: `Not found ability with id: ${id}`,
        });

      res.send(200, { abilityAgent: data });
    } catch (error) {
      res.send(500, { error: "Internal Server Error" });
    }
  },

  async createAbilities(req, res) {
    const { name, abilities, ...rest } = req.body;

    if (!name) {
      return res.send(400, { error: "Name is required" });
    }

    if (Object.keys(rest).length > 0) {
      return res.send(400, { error: "Invalid properties in req.body" });
    }

    const isValidationSuccess = validateAbilities(abilities, res);

    if (!isValidationSuccess) {
      return;
    }

    try {
      const { error } = await supabase
        .from("agents")
        .insert([{ name, abilities }])
        .single();

      if (error) {
        res.send(400, { error: "Internal Server Error" });
      }

      res.send(200);
    } catch (error) {
      console.log(error);
      res.send(500, { error: "Internal Server Error" });
    }
  },

  async deleteAbility(req, res) {
    let { id } = req.params;

    try {
      const { error } = await supabase.from("agents").delete().eq("id", id);

      if (error) return res.send(500, { error: "Internal Server Error" });

      res.send(200, { deleted: true });
    } catch (error) {
      res.send(500, { error: "Internal Server Error" });
    }
  },

  async updateAbilities(req, res) {
    let { id } = req.params;
    const { name, abilities, ...rest } = req.body;

    if (!name) return res.send(400, { error: "Name is required" });

    if (Object.keys(rest).length > 0) {
      return res.send(400, { error: "Invalid properties in req.body" });
    }

    const isValidationSuccess = validateAbilities(abilities, res);

    if (!isValidationSuccess) return;

    try {
      const { error } = await supabase
        .from("agents")
        .update({ name, abilities })
        .eq("id", id);

      if (error) return res.send(500, { error: "Internal Server Error" });

      res.send(200, { abilities, name });
    } catch (error) {
      res.send(500, { error: "Internal Server Error" });
    }
  },
};
