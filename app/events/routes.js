const express = require('express')

const router = express.Router()

router.use('/', require('./general/routes'));


module.exports = router
