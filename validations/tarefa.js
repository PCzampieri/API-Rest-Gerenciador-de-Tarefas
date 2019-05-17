const { check, validationResult } = require('express-validator/check')

module.exports = {    
    tarefaCheck: [

        check('titulo').isLength({ min: 3})
            .withMessage('Título tem que ser maior que 3 caracteres!'),
        
        check('descricao').isLength({ min: 10 })
            .withMessage('Descrição tem que ser maior que 10 caracteres!')       
    ]    
}