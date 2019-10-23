const path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  { validationResult } = require("express-validator"),
  querys = require("./querys"),
  tokenManager = require(path.join(rootDir, "util", "auth", "token"));

const verifyToken = async (token, userId) => {
  if (!token) return false;
  if (token.id !== userId) return false;
  return true;
};

exports.getAll = async (req, res, next) => {
  try {
    let auth = req.auth.split(" ")[1];
    let decodedToken = await tokenManager.decodeToken(auth);

    let ver = verifyToken(decodedToken, req.userId);
    if (!ver) {
      const error = new Error("Error de autenticación.");
      error.statusCode = 402;
      error.data = "El recurso al que estás accediendo no es tuyo";
      throw error;
    }

    res.send(await querys.findAll(req.userId));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.newSchedule = async (req, res, next) => {
  {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error("Error de validación.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      let auth = req.auth.split(" ")[1];
      let decodedToken = await tokenManager.decodeToken(auth);

      let ver = verifyToken(decodedToken, req.userId);
      if (!ver) {
        const error = new Error("Error de autenticación.");
        error.statusCode = 402;
        error.data = "El recurso al que estás accediendo no es tuyo";
        throw error;
      }

      let answer = await querys.newSchedule(req.userId, req.body);
      if (answer !== null) {
        res.status(201).json(answer);
        return;
      }

      const error = new Error("El horario no tiene el formato esperado");
      error.statusCode = 400;
      throw error;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.updateSchedule = async (req, res, next) => {
  {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error("Error de validación.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      let auth = req.auth.split(" ")[1];
      let decodedToken = await tokenManager.decodeToken(auth);

      let ver = verifyToken(decodedToken, req.userId);
      if (!ver) {
        const error = new Error("Error de autenticación.");
        error.statusCode = 402;
        error.data = "El recurso al que estás accediendo no es tuyo";
        throw error;
      }

      let answer = await querys.updateSchedule(
        req.userId,
        req.params.scheduleId,
        req.body
      );

      console.log(answer);
      if (answer !== null) {
        res.status(200).json(answer);
        return;
      }

      const error = new Error("El horario no se pudo actualizar correctamente");
      error.statusCode = 400;
      throw error;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.deleteSchedule = async (req, res, next) => {
  {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error("Error de validación.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      let auth = req.auth.split(" ")[1];
      let decodedToken = await tokenManager.decodeToken(auth);

      let ver = verifyToken(decodedToken, req.userId);
      if (!ver) {
        const error = new Error("Error de autenticación.");
        error.statusCode = 402;
        error.data = "El recurso al que estás accediendo no es tuyo";
        throw error;
      }

      let answer = await querys.deleteSchedule(
        req.userId,
        req.params.scheduleId,
        req.body
      );
      if (answer !== null) {
        res.status(200).json(answer);
        return;
      }

      const error = new Error("El horario no se pudo borrar correctamente");
      error.statusCode = 400;
      throw error;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.deleteAll = async (req, res, next) => {
  {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error("Error de validación.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      let auth = req.auth.split(" ")[1];
      let decodedToken = await tokenManager.decodeToken(auth);

      let ver = verifyToken(decodedToken, req.userId);
      if (!ver) {
        const error = new Error("Error de autenticación.");
        error.statusCode = 402;
        error.data = "El recurso al que estás accediendo no es tuyo";
        throw error;
      }

      let answer = await querys.deleteAll(req.userId, req.body);
      if (answer !== null) {
        res.status(200).json(answer);
        return;
      }

      const error = new Error("Los horarios borrar correctamente");
      error.statusCode = 400;
      throw error;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};
