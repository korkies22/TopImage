const jwt = require("jsonwebtoken"),
  crypto = require("crypto");

exports.signToken = params => {
  return jwt.sign(params, process.env.privateKey, { expiresIn: "12h" });
};

exports.decodeToken = async token => {
  if (!token) {
    const error = new Error(
      "Debe estar autenticado para poder usar nuestros servicios"
    );
    error.statusCode = 422;
    throw error;
  }

  let decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.privateKey, function(err, decoded) {
      if (err) {
        console.log(err);
        const error = new Error("Token incorrecto");
        error.statusCode = 422;
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
  return decodedToken;
};

exports.generateRefreshToken = async () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(50, function(err, buffer) {
      if (err) {
        reject(err);
      }
      const token = buffer.toString("hex");
      resolve(token);
    });
  });
};
