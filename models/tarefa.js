const TarefaModel = (sequelize, DataTypes) => {
    const Tarefa = sequelize.define('Tarefa', {
        titulo: DataTypes.STRING(200),
        descricao: DataTypes.TEXT,
        concluida: DataTypes.BOOLEAN        
    }) 
    return Tarefa
}

module.exports = TarefaModel