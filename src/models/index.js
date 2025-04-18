const sequelize = require('../config/database');
const Employe = require('./Employe');
const ConseillerRH = require('./ConseillerRH');
const DossierEmploye = require('./DossierEmploye');
const Beneficiaire = require('./Beneficiaire');
const CompagnieAssurance = require('./CompagnieAssurance');
const Notification = require('./Notification');

// Définition des relations
Employe.hasOne(DossierEmploye, { foreignKey: 'employeId' });
DossierEmploye.belongsTo(Employe, { foreignKey: 'employeId' });

Employe.hasMany(Beneficiaire, { foreignKey: 'employeId' });
Beneficiaire.belongsTo(Employe, { foreignKey: 'employeId' });

ConseillerRH.hasMany(DossierEmploye, { foreignKey: 'conseillerId' });
DossierEmploye.belongsTo(ConseillerRH, { foreignKey: 'conseillerId' });

ConseillerRH.hasMany(Notification, { foreignKey: 'conseillerId' });
Notification.belongsTo(ConseillerRH, { foreignKey: 'conseillerId' });

Notification.belongsTo(Employe, { foreignKey: 'employeId' });
Employe.hasMany(Notification, { foreignKey: 'employeId' });

Notification.belongsTo(CompagnieAssurance, { foreignKey: 'compagnieId' });
CompagnieAssurance.hasMany(Notification, { foreignKey: 'compagnieId' });

// Synchronisation de la base de données
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de données synchronisée avec succès');
  } catch (error) {
    console.error('Erreur de synchronisation de la base de données:', error);
  }
};

module.exports = {
  sequelize,
  Employe,
  ConseillerRH,
  DossierEmploye,
  Beneficiaire,
  CompagnieAssurance,
  Notification,
  syncDatabase
};