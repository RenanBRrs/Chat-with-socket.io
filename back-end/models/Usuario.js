const Sequelize = require('sequelize');

const db = require('./db');

const Usuario = db.define('usuarios', {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
//CRIA TABELA NORMAL
// Usuario.sync();

//FORÇA CRIAÇÃO DA TABELA
// Usuario.sync({ force: true });

module.exports = Usuario;
