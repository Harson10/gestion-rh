const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Beneficiaire = sequelize.define('Beneficiaire', {
  idBeneficiaire: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomBeneficiaire: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenomBeneficiaire: {
    type: DataTypes.STRING,
    allowNull: false
  },
  relation: {
    type: DataTypes.STRING
  },
  dateAjout: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'beneficiaires',
  timestamps: true
});

module.exports = Beneficiaire;