const path = require('path'),
  rootDir = path.dirname(process.mainModule.filename),
  db = require(path.join(rootDir, 'util', 'db', 'mongo')).db(),
  users = db.collection('users')

exports.findAll = async () => {
  return users.find().toArray()
}

exports.findUser = async (params) => {
  return users.findOne(params)
}

exports.createUser = async (params) => {
  return users.insertOne(params)
}
