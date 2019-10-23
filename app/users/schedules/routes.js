const express = require("express"),
  path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  eventController = require("./controller"),
  { validate } = require("./validator");

const handlerExceptions = require(path.join(
  rootDir,
  "util/errors",
  "handlerException"
));
const router = express.Router();

router.get(
  "/",
  handlerExceptions(eventController.getAll)
);

router.post(
  "/",
  validate("schedule"),
  handlerExceptions(eventController.newSchedule)
);

router.delete("/", handlerExceptions(eventController.deleteAll));

router.put(
  "/:scheduleId/",
  validate("schedule"),
  handlerExceptions(eventController.updateSchedule)
);

router.delete(
  "/:scheduleId/",
  handlerExceptions(eventController.deleteSchedule)
);

module.exports = router;
