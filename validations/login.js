const { check, validationResult } = require('express-validator/check')

module.exports = {    
    loginCheck: [
       
        check('email').isEmail().withMessage('email inválido!'),
        
        check('senha').isLength({ min: 3, max: 12}).withMessage('Senha tem que ter entre 3 a 12 caracteres!')
    ]   
}