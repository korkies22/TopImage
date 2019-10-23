const querys= require('./querys')

exports.getAll = async (req, res, next) => {
  try {
    res.json(await querys.findAll())
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
