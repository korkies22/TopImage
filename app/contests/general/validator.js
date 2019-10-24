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
        body("topic", "Su concurso debe tener un tema definido")
          .exists()
          .not()
          .isEmpty()
          .withMessage("El formato del tema no es válido"),
        body("endDate", "Su concurso debe tener una fecha de fin")
          .exists()
          .not()
          .isEmpty()
          .withMessage("Se esperaba una fecha"),
        body("images", "Su concurso debe tener un tema definido")
          .custom(images => {
            let errMsg = validateImages(images);
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve("OK");
          })
      ];
    }
  }
};

validateImages=(images)=>{
  if(!images)
    return;
  let image;
  for(let i=0;i<images.length;i++){
    image=images[i];
    if(!image.data)
    {
      return `La imagen ${i+1} no tiene contenido`;
    }
  }
  return;
}
