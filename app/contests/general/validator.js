const { body } = require("express-validator");
exports.validate = method => {
  switch (method) {
    case "contest": {
      return [
        body("name", "Su concurso debe tener un nombre definido")
          .exists()
          .not()
          .isEmpty()
          .withMessage("El formato del nombre no es válido"),
        body("endDate", "Su concurso debe tener una fecha de fin")
          .exists()
          .not()
          .isEmpty()
          .withMessage("Se esperaba una fecha")
      ];
    }
  }
};
