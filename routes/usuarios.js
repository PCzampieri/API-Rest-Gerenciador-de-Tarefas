const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuarios')
const { usuarioCheck } = require('../validations/usuario')
const { loginCheck } = require('../validations/login')


const model = require('../models/index')

router.get('/', usuariosController.index.bind(null, model.models))
router.get('/:id', usuariosController.consultaPorId.bind(null, model.models))
router.delete('/:id', usuariosController.excluir.bind(null, model.models))
router.put('/:id', usuarioCheck, usuariosController.editar.bind(null, model.models))
router.post('/login', loginCheck, usuariosController.login.bind(null, model.models))
router.post('/', usuarioCheck, usuariosController.cadastrar.bind(null, model.models))

module.exports = router