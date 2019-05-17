const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator/check')

const index = async({ Tarefa }, req, res) => {
    const tarefas = await Tarefa.findAll({
        where: {
            UsuarioId: req.params.id
        }
    }) 
    res.send(tarefas)    
}

const consultaPorId = async({ Tarefa }, req, res) => {
    const tarefas = await Tarefa.findById(req.params.id)
    if(tarefas){
        res.send(tarefas)    
    }else{
        res.send('Tarefa não encontrada')
    }  
}

const cadastrar = async({ Tarefa }, req, res) => {
    try{        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const tarefa = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            concluida: false,
            UsuarioId: req.body.userId
        }
        await Tarefa.create(tarefa)
        res.send(tarefa)
    }catch(e){
        res.send({
            success: false,
            errors: Object.keys(e.errors)
        })
    }  
}

const excluir = async({ Tarefa }, req, res) => {
    const tarefaDB = await Tarefa.findById(req.params.id)
    if(tarefaDB) {
        await Tarefa.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send('Excluida com sucesso!')
    }else{
        res.send('Tarefa não encontrada!')
    }          
} 

const editar = async({ Tarefa }, req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }

    const tarefaDB = await Tarefa.findById(req.params.id)
    if(tarefaDB){
        await Tarefa.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.send('Alterada com sucesso')
    }else{
        res.send('Tarefa não encontrada')
    }
}

const marcarConcluida = async({ Tarefa }, req, res) => {
    try{       
        const tarefaDB = await Tarefa.findById(req.params.id)
        if(tarefaDB){
            const tarefa = {
                id: tarefaDB.id,
                titulo: tarefaDB.titulo,
                descricao: tarefaDB.descricao,
                concluida: true               
            }             
            await Tarefa.update(tarefa, {
            where: {
                id: req.params.id
            }            
            })        
            res.send(tarefa)             
        }else{
            res.send('Tarefa não encontrada')
        }        
    }catch(e){       
        res.send({
            success: false,
            errors: Object.keys(e.errors)
        })
    }  
}

const desmarcarConcluida = async({ Tarefa }, req, res) => {
    try{       
        const tarefaDB = await Tarefa.findById(req.params.id)
        if(tarefaDB){   
            const tarefa = {
                id: tarefaDB.id,
                titulo: tarefaDB.titulo,
                descricao: tarefaDB.descricao,
                concluida: false                
            }   
            await Tarefa.update(tarefa, {
            where: {
                id: req.params.id
            }            
            })           
            res.send(tarefa)             
        }else{
            res.send('Tarefa não encontrada')
        }
    }catch(e){
        res.send({
            success: false,
            errors: Object.keys(e.errors)
        })
    }  
}

module.exports = {
    index,
    consultaPorId,
    cadastrar,
    excluir,
    editar,
    marcarConcluida,
    desmarcarConcluida
}