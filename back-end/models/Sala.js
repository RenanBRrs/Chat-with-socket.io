const Sequelize = require('sequelize');

const db = require('./db');

const Sala = db.define('salas', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
//CRIA TABELA NORMAL
// Sala.sync();

//FORÇA CRIAÇÃO DA TABELA
// Sala.sync({ force: true });

module.exports = Sala;
