const express = require("express"),
  path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  eventsController = require("./controller");

const handlerExceptions = require(path.join(
  rootDir,
  "util/errors",
  "handlerException"
));
const router = express.Router();

//Get events
router.get("", handlerExceptions(eventsController.getAll));

module.exports = router;
