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

// Create contest (multiform-data)
router.post("", 
  upload.any(),
  handlerExceptions(contestController.create));

//Get contest
router.get("/:id", handlerExceptions(contestController.getContest));

// Delete one contest
router.delete("/:id", handlerExceptions(contestController.delete));
// Renew access key
router.put("/:id/accessKey", handlerExceptions(contestController.changeAccessKey));
// Like or dislike
router.post("/:id/images/:imageIndex/likes", handlerExceptions(contestController.likeImage));

module.exports = router;
