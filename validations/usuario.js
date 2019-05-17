const { check, validationResult } = require('express-validator/check')
const { isCPF, isDate } = require('../validations/customValidators')

module.exports = {    
    usuarioCheck: [
        check('nome').isLength({ min: 3}).withMessage('Nome tem que ser maior que 3 caracteres!'),
        check('email').isEmail().withMessage('email inválido!'),
        
        check('senha').isLength({ min: 3, max: 12}).withMessage('Senha tem que ter entre 3 a 12 caracteres!'),
        
        check('cpf').custom(value => {
            const isValid = isCPF(value)
            if(isValid !== true){
                return false                
            }else{              
                return value
            }
        }).withMessage('CPF inválido!'),    
        
        check('nascimento').custom(value => {
            const isValid = isDate(value, 'YYYY-MM-DD')
            if(isValid !== true){
                return false                
            }else{              
                return value
            }
        }).withMessage('Data deve ser no formato YYYY-MM-DD!')     
    ]    
}