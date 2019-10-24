const express = require("express"),
  path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  contestController = require("./controller"),
  { validate } = require("./validator");

const handlerExceptions = require(path.join(
  rootDir,
  "util/errors",
  "handlerException"
));
const router = express.Router();

//Get events
router.get("", handlerExceptions(contestController.getAll));
router.post("", 
  validate("contest"),
  handlerExceptions(contestController.create));

router.put(":id", handlerExceptions(contestController.getAll));
router.delete("/:id", handlerExceptions(contestController.delete));

module.exports = router;
