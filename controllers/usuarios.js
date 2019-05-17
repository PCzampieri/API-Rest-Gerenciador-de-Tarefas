const jwt = require('jsonwebtoken')
global.jwtSecret = '105f52a6ac311b65b0c34b29ef7b0ec0'
const { check, validationResult } = require('express-validator/check')

const index = async({ Usuario }, req, res) => {
    const usuarios = await Usuario.findAll({ attributes: { exclude: ['senha'] }})
    res.send(usuarios)    
}

const consultaPorId = async({ Usuario }, req, res) => {
    const usuarioDB = await Usuario.findAll({
        where: {
            id: req.params.id
        },
        attributes: { 
            exclude: ['senha'] 
        }
    })

    if(usuarioDB){
        res.send(usuarioDB)    
    }else{
        res.send('Usuário não encontrado!')
    }    
}

const cadastrar = async({ Usuario }, req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        const usuario = {
        nome: req.body.nome,
        email: req.body.email,
        cpf: req.body.cpf,
        nascimento: req.body.nascimento,
        senha: await Usuario.generateHash(req.body.senha)            
        }
        await Usuario.create(usuario)
        res.send('Usuário inserido com sucesso!')        
    }catch(e){
        res.send({
            success: false,
            errors: Object.keys(e.errors)
        })
    }
} 

const excluir = async({ Usuario }, req, res) => {
    try{
        const usuarioDB = await Usuario.findByPk(req.params.id)
        if(usuarioDB) {
            await Usuario.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send('Excluido!')
        } else {
            res.send('Usuário não encontrado')
        }        
    }catch(e){
        res.send({
            success: false,
            errors: Object.keys(e.errors)
        })
    }      
} 

const editar = async({ Usuario }, req, res) => {
    try{
        const usuarioDB = await Usuario.findById(req.params.id)
        if(usuarioDB){
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
            }

            const usuario = {
                nome: req.body.nome,
                email: req.body.email,
                cpf: req.body.cpf,
                nascimento: req.body.cpf,
                senha: await Usuario.generateHash(req.body.senha)
            }            
            await Usuario.update(usuario, {
                where: { id: req.params.id }
            })
            res.send(usuario)
        }else{
            res.send('Usuário não encontrado!')
        }
    }catch(e){
        res.send({
            success: false,
            errors: Object.keys(e.errors)
        })
    }  
}

const login = async({ Usuario }, req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    console.log(errors)

    const { email, senha } = req.body
    console.log(email, senha)
    const usuarioDB = await Usuario.findOne({ where: {email: email} })  
    if(usuarioDB){   
        const isValid = await usuarioDB.checkPassword(senha)           
        if(isValid){
            const payload = {
                id: usuarioDB.id,
                nome: usuarioDB.nome,
                email: usuarioDB.email
            }
            jwt.sign(payload, global.jwtSecret, (err, token) => {
                res.send({
                    success: true,
                    token: token
                })
            })            
        }else{
            res.status(422).json({ errors: [{'msg': 'Erro no login, verifique usuário/senha!'}] })
        }
    }else{
        res.status(422).json({ errors: [{'msg': 'Erro no login, verifique usuário/senha!'}] })
    }
}

module.exports = {
    index,
    cadastrar,
    consultaPorId,
    excluir,
    editar, 
    login
}