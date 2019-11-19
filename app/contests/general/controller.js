const querys=require('./querys'),
  path = require('path'),
  rootDir = path.dirname(process.mainModule.filename),
  { validationResult } = require("express-validator"),
  tokenManager = require(path.join(rootDir, "util", "auth", "token"));

const verifyToken = async (token) => {
  if (!token) return false;
  return true;
};

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

exports.getContest = async (req, res, next) => {
  try {
    const result=await querys.findContest(req.params.id)
    console.log('llamada',result)
    res.json(result)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.create = async (req, res, next) => {
  try {
    let auth = req.auth.split(" ")[1];
    let decodedToken = await tokenManager.decodeToken(auth);

    let ver = verifyToken(decodedToken);
    if (!ver) {
      const error = new Error("Error de autenticación.");
      error.statusCode = 402;
      error.data = "El recurso al que estás accediendo no es tuyo";
      throw error;
    }

    let name=req.body.name;
    let topic=req.body.topic;
    let endDateStr=req.body.endDate;
    let limit = req.body.limit;

    if(!name  || !endDateStr || !limit)
    {
      const error = new Error("Formato incorrecto de concurso.");
      error.statusCode = 400;
      error.data = "No se ha enviado toda la información del concurso, por favor revísalo e intenta de nuevo :)";
      throw error;
    }

    if(req.files)
    {
      if(req.files.length>limit){
        const error = new Error("Se enviaron más archivos que el límite especificado.");
        error.statusCode = 400;
        error.data = "No se han enviado bien los archivos del concurso, por favor revísalo e intenta de nuevo :)";
        throw error;
      }

      if(!topic){
        const error = new Error("No se dió el tema para completar las imágenes.");
        error.statusCode = 400;
        error.data = "No se ha enviado toda el tema para consultar tus imágenes aleatorias, por favor revísalo e intenta de nuevo :)";
        throw error;
      }
    }

    let body={
      name:name,
      topic:topic,
      limit: limit,
      endDate:new Date(endDateStr),
      images:req.files
    }

    let answer = await querys.newContest(decodedToken.id, body);
    if (answer !== null) {
      res.status(201).json(answer);
      return;
    }

    const error = new Error("El concurso no tiene el formato esperado");
    error.statusCode = 400;
    throw error;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.likeImage = async(req,res,next)=>{
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

    let ver = verifyToken(decodedToken);
    if (!ver) {
      const error = new Error("Error de autenticación.");
      error.statusCode = 402;
      error.data = "El recurso al que estás accediendo no es tuyo";
      throw error;
    }

    let isDislike=req.body.isDislike;
    console.log('ñam',isDislike);
    let answer = await querys.likeContest(decodedToken.id, req.params.id,req.params.imageIndex,isDislike);
    if (answer !== null) {
      res.status(200).json(answer);
      return;
    }

    const error = new Error("El concurso no puede recibir votos");
    error.statusCode = 400;
    throw error;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.delete = async (req, res, next) => {
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

    let ver = verifyToken(decodedToken);
    if (!ver) {
      const error = new Error("Error de autenticación.");
      error.statusCode = 402;
      error.data = "El recurso al que estás accediendo no es tuyo";
      throw error;
    }

    console.log(decodedToken);
    let answer = await querys.deleteContest(decodedToken.id, req.params.id, req.body);
    if (answer !== null) {
      res.status(200).json(answer);
      return;
    }

    const error = new Error("El concurso no tiene el formato esperado");
    error.statusCode = 400;
    throw error;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}