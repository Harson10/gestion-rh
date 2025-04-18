const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DossierEmploye = sequelize.define('DossierEmploye', {
  idDossier: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dateMiseAJour: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  validation: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'dossiers_employe',
  timestamps: true
});

module.exports = DossierEmploye;