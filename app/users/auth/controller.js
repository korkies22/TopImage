const path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  bcrypt = require("bcrypt"),
  { validationResult } = require("express-validator"),
  querys = require("./querys"),
  tokenManager = require(path.join(rootDir, "util", "auth", "token"));

exports.getAll = async (req, res, next) => {
  try {
    res.send(await querys.findAll());
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.signUp = async (req, res, next) => {
  {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error("Error de validación.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
      const email = req.body.email;
      let alreadySigned = await querys.findUser({ email });
      if (alreadySigned) {
        const error = new Error("Ya existe un usuario con este email");
        error.statusCode = 422;
        throw error;
      }
      const password = await bcrypt.hash(req.body.password, 12);
      req.body.password = password;

      const refreshToken = await tokenManager.generateRefreshToken();
      req.body.refreshToken = refreshToken;
      const user = (await querys.createUser(req.body)).ops[0];
      const token = tokenManager.signToken({
        email: email,
        id: user._id
      });

      res.status(201).json({
        token: token,
        tokenTimeout: 12,
        user,
        refreshToken: user.refreshToken
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.login = async (req, res, next) => {
  {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error("Error de validación.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
      const email = req.body.email;
      let user = await querys.findUser({ email });
      if (!user) {
        const error = new Error("Email o contraseña incorrecta");
        error.statusCode = 404;
        throw error;
      }
      const password = req.body.password;
      let isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error("Email o contraseña incorrecta");
        error.statusCode = 422;
        throw error;
      }
      const token = tokenManager.signToken({
        email: email,
        id: user._id
      });

      console.log(token);

      res.status(201).json({
        token: token,
        tokenTimeout: 12,
        user,
        refreshToken: user.refreshToken
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};
