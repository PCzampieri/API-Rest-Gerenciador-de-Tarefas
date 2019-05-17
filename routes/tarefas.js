const express = require('express')
const router = express.Router()
const tarefasController = require('../controllers/tarefas')
const jwt = require('jsonwebtoken')
const { tarefaCheck } = require('../validations/tarefa')

const model = require('../models/index')

router.use(async(req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.indexOf('Bearer ') ===0 ){
        const token = req.headers.authorization.split('Bearer ').join('')          
        if(token){
            try{
                jwt.verify(token, global.jwtSecret)                      
                next()                             
            }catch(e){
            res.send({ success: false }) 
            }   }else{
            res.send({ success: false })
        }
    }else {
        res.status(401)
        res.send({ error: 'malformed or invalid token!'})
    }
})

router.get('/user/:id', tarefasController.index.bind(null, model.models))
router.get('/:id', tarefasController.consultaPorId.bind(null, model.models))
router.post('/', tarefaCheck, tarefasController.cadastrar.bind(null, model.models))
router.delete('/:id', tarefasController.excluir.bind(null, model.models))
router.put('/:id', tarefaCheck, tarefasController.editar.bind(null, model.models))
router.put('/:id/concluida', tarefasController.marcarConcluida.bind(null, model.models))
router.delete('/:id/concluida', tarefasController.desmarcarConcluida.bind(null, model.models))

module.exports = router