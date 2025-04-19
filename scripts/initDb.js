require('dotenv').config();
const { sequelize } = require('../src/models');
const { seedDatabase } = require('../src/utils/seedData');

const initializeDatabase = async () => {
  try {
    // Force: true va supprimer et recréer toutes les tables
    await sequelize.sync({ force: true });
    console.log('Base de données réinitialisée avec succès');
    
    // Remplir la base de données avec des données de test
    await seedDatabase();
    
    console.log('Initialisation de la base de données terminée');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    process.exit(0);
  }
};

initializeDatabase(); 