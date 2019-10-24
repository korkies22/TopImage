const router_users = require("./users/routes"),
  router_contests = require("./contests/routes");

const routers = function(app) {
  app.use("/api/users", router_users);
  app.use("/api/contests", router_contests);
};

module.exports = routers;
