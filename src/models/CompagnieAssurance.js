const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompagnieAssurance = sequelize.define('CompagnieAssurance', {
  idCompagnie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomCompagnie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailCompagnie: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  telephoneCompagnie: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'compagnies_assurance',
  timestamps: true
});

module.exports = CompagnieAssurance;