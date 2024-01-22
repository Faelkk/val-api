const abilitiesVideoController = require("../controllers/abilitiesVideoController");
const homeController = require("../controllers/homeController");
const signController = require("../controllers/signController");

module.exports = [
  {
    endpoint: "/signin",
    method: "POST",
    handler: signController.login,
  },
  {
    endpoint: "/signup",
    method: "POST",
    handler: signController.register,
  },
  {
    endpoint: "/home",
    method: "GET",
    handler: homeController.getHomeDetails,
  },
  {
    endpoint: "/home/:id",
    method: "GET",
    handler: homeController.getHomeById,
  },
  {
    endpoint: "/home",
    method: "POST",
    handler: homeController.createHomeDetails,
  },
  {
    endpoint: "/home/:id",
    method: "DELETE",
    handler: homeController.deleteHomeDetails,
  },
  {
    endpoint: "/home/:id",
    method: "PUT",
    handler: homeController.updateHomeDetails,
  },
  {
    endpoint: "/abilities",
    method: "GET",
    handler: abilitiesVideoController.listAbilities,
  },
  {
    endpoint: "/abilities/:id",
    method: "GET",
    handler: abilitiesVideoController.getAbilityById,
  },
  {
    endpoint: "/abilities",
    method: "POST",
    handler: abilitiesVideoController.createAbilities,
  },
  {
    endpoint: "/abilities/:id",
    method: "PUT",
    handler: abilitiesVideoController.updateAbilities,
  },
  {
    endpoint: "/abilities/:id",
    method: "DELETE",
    handler: abilitiesVideoController.deleteAbility,
  },
];
