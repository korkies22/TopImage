const { body } = require('express-validator')
exports.validate = (method) => {
    switch (method) {
        case 'login': {
            return [
                body('email', 'Debe ingresar un email válido').exists().isEmail().withMessage('El formato del email no es válido'),
                body('password', 'Debe ingresar una contraseña válida').exists().isLength({ min: 5 }).withMessage('La contraseña debe ser de al menos 5 caracteres'),
            ]
        }
        case 'signup': {
            return [
                body('email', 'Debe ingresar un email válido').exists().isEmail().withMessage('El formato del email no es válido'),
                body('password', 'Debe ingresar una contraseña válida').exists().isLength({ min: 5 }).withMessage('La contraseña debe ser de al menos 5 caracteres'),
            ]
        }
    }
}
