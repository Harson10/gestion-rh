const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employe = sequelize.define('Employe', {
  idEmploye: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomEmploye: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenomEmploye: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailEmploye: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  telephone: {
    type: DataTypes.STRING
  },
  dateEmbauche: {
    type: DataTypes.DATE
  },
  adresse: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'employes',
  timestamps: true
});

module.exports = Employe;