const express = require('express')

const router = express.Router()

router.use(
  "/",
  function(req, res, next) {
    req.auth = req.header("Authorization");
    next();
  },
  require("./general/routes")
);

module.exports = router
