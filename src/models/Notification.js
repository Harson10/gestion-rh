const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
  idNotification: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dateEnvoi: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  objet: {
    type: DataTypes.STRING,
    allowNull: false
  },
  statut: {
    type: DataTypes.ENUM('envoyé', 'non envoyé', 'en attente'),
    defaultValue: 'en attente'
  }
}, {
  tableName: 'notifications',
  timestamps: true
});

module.exports = Notification;