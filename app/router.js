const router_users = require("./users/routes"),
  router_events = require("./events/routes");

const routers = function(app) {
  app.use("/api/users", router_users);
  app.use("/api/events", router_events);
};

module.exports = routers;
