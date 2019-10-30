const express = require("express"),
  path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  contestController = require("./controller"),
  multer  = require('multer'),
  upload = multer();
  ;

const handlerExceptions = require(path.join(
  rootDir,
  "util/errors",
  "handlerException"
));
const router = express.Router();

//Get all
router.get("/", handlerExceptions(contestController.getAll));

//Get contest
router.get("/:id", handlerExceptions(contestController.getContest));

// Create contest (multiform-data)
router.post("", 
  upload.any(),
  handlerExceptions(contestController.create));

router.put("/:id", handlerExceptions(contestController.getAll));
router.delete("/:id", handlerExceptions(contestController.delete));

router.post("/:id/images/:imageIndex/likes", handlerExceptions(contestController.likeImage));

module.exports = router;
