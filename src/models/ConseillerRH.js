const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ConseillerRH = sequelize.define('ConseillerRH', {
  idConseiller: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  tableName: 'conseillers_rh',
  timestamps: true
});

module.exports = ConseillerRH;