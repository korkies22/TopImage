const handlerException = fn => (req, res, next) => {
  fn(req, res,next).catch(error => next(error))
}

module.exports = handlerException;
