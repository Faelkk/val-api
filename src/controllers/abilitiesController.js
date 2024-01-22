const agentActions = require("../actions/agentsAction");
const sendErrorResponse = require("../utils/sendErrorResponse");
const errorMessages = require("../utils/errorMessages");
const validateAbilities = require("../helpers/validateAbilities");

module.exports = {
  async listAbilities(req, res) {
    const { order } = req.query;

    try {
      const { data, error } = await agentActions.getAllAgents();

      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);

      if (!order || (order !== "asc" && order !== "desc"))
        data.sort((a, b) => a.name.localeCompare(b.name));

      res.send(200, data);
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },

  async getAbilityById(req, res) {
    let { id } = req.params;

    try {
      const { data, error } = await agentActions.getAgentById(id);

      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);

      if (!data) return sendErrorResponse(res, errorMessages.notFound(id));

      res.send(200, { abilityAgent: data });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },

  async createAbilities(req, res) {
    const { name, abilities, ...rest } = req.body;

    if (!name) {
      return res.send(400, { error: "Name is required" });
    }

    if (Object.keys(rest).length > 0) {
      return sendErrorResponse(res, errorMessages.invalidProperties);
    }

    const isValidationSuccess = validateAbilities(abilities, res);

    if (!isValidationSuccess) {
      return;
    }

    try {
      const { error } = await agentActions.createAgent(name, abilities);

      if (error) sendErrorResponse(res, errorMessages.internalServerError);

      res.send(200, { created: true });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },

  async deleteAbility(req, res) {
    let { id } = req.params;

    try {
      const { error } = await agentActions.deleteAgentById(id);

      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);

      res.send(200, { deleted: true });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },

  async updateAbilities(req, res) {
    let { id } = req.params;
    const { name, abilities, ...rest } = req.body;

    if (!name) sendErrorResponse(res, errorMessages.nameRequired);

    if (Object.keys(rest).length > 0) {
      return sendErrorResponse(res, errorMessages.invalidProperties);
    }

    const isValidationSuccess = abilities.validateAbilities(abilities, res);

    if (!isValidationSuccess) return;

    try {
      const { error } = await agentActions.updateAgentById(id, name, abilities);

      if (error)
        return sendErrorResponse(res, errorMessages.internalServerError);

      res.send(200, { abilities, name });
    } catch (error) {
      sendErrorResponse(res, errorMessages.internalServerError);
    }
  },
};
