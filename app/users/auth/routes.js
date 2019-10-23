const express = require('express'),
  path = require('path'),
  rootDir = path.dirname(process.mainModule.filename),
  userController = require('./controller'),
  { validate } = require('./validator')

const handlerExceptions = require(path.join(
  rootDir,
  'util/errors',
  'handlerException'
))
const router = express.Router()

//Get users
router.get(
  '',
  handlerExceptions(userController.getAll)
)

router.post(
  '/signup',
  validate('signup'),
  handlerExceptions(userController.signUp)
)

router.post(
  '/login',
  validate('login'),
  handlerExceptions(userController.login)
)

module.exports = router

