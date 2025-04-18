const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestion_rh_db', 'gestion_rh_user', 'password123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;