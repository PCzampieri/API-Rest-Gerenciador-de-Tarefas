const bcrypt = require('bcryptjs')
const saltRounds = 10

const UsuarioModel = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nome: DataTypes.STRING(200),
        email: DataTypes.STRING(150),
        cpf: DataTypes.STRING(11),
        senha: DataTypes.STRING,
        nascimento: DataTypes.DATEONLY        
    })  
    
    //generating a hash
    Usuario.generateHash = function(password){
        return bcrypt.hash(password, saltRounds)
    }

    //check if senha is valid
    Usuario.prototype.checkPassword = async function(senha) {        
        return await bcrypt.compare(senha, this.senha)        
    }

    Usuario.associate = ({ Tarefa }) => {
        Usuario.hasMany(Tarefa)
        Tarefa.belongsTo(Usuario)
    }
    return Usuario
}

module.exports = UsuarioModel