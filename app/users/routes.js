const express = require("express");

const router = express.Router();

router.use("/", require("./auth/routes"));
router.use(
  "/:userId/schedules/",
  function(req, res, next) {
    req.userId = req.params.userId;
    req.auth = req.header("Authorization");
    next();
  },
  require("./schedules/routes")
);

module.exports = router;
