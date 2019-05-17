const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    operatorsAliases: false,
    storage: './database.sqlite', 
    define: {
        timestamps: true,
        freezeTableName: true,
    }  
})

const models = {}
const fs = require('fs')
const path = require('path')
    fs
        .readdirSync(__dirname)
        .filter((file) => file!=='index.js')
        .forEach((file) => {
            const model = sequelize.import(path.join(__dirname, file))
            models[model.name] = model
        })
    Object.keys(models).forEach( modelName => {
        if('associate' in models[modelName]){
            models[modelName].associate(models)
        }
    })

module.exports = {
    sequelize,
    models
}