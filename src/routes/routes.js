const AbilitiesController = require("../controllers/abilitiesController");
const HomeController = require("../controllers/homeController");
const UsersController = require("../controllers/usersController");

module.exports = [
  {
    endpoint: "/signin",
    method: "POST",
    handler: UsersController.login,
  },
  {
    endpoint: "/signup",
    method: "POST",
    handler: UsersController.register,
  },
  {
    endpoint: "/home",
    method: "GET",
    handler: HomeController.getHomeDetails,
  },
  {
    endpoint: "/home/:id",
    method: "GET",
    handler: HomeController.getHomeById,
  },
  {
    endpoint: "/home",
    method: "POST",
    handler: HomeController.createHomeDetails,
  },
  {
    endpoint: "/home/:id",
    method: "DELETE",
    handler: HomeController.deleteHomeDetails,
  },
  {
    endpoint: "/home/:id",
    method: "PUT",
    handler: HomeController.updateHomeDetails,
  },
  {
    endpoint: "/abilities",
    method: "GET",
    handler: AbilitiesController.listAbilities,
  },
  {
    endpoint: "/abilities/:id",
    method: "GET",
    handler: AbilitiesController.getAbilityById,
  },
  {
    endpoint: "/abilities",
    method: "POST",
    handler: AbilitiesController.createAbilities,
  },
  {
    endpoint: "/abilities/:id",
    method: "PUT",
    handler: AbilitiesController.updateAbilities,
  },
  {
    endpoint: "/abilities/:id",
    method: "DELETE",
    handler: AbilitiesController.deleteAbility,
  },
];
