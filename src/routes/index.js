const express = require('express');
const router = express.Router();

// Import de toutes les routes
const employeRoutes = require('./employe');
const conseillerRHRoutes = require('./conseillerRH');
const dossierEmployeRoutes = require('./dossierEmploye');
const beneficiaireRoutes = require('./beneficiaire');
const compagnieAssuranceRoutes = require('./compagnieAssurance');
const notificationRoutes = require('./notification');

// Route de base pour vérifier que l'API fonctionne
router.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de Gestion RH' });
});

// Enregistrement de toutes les routes
router.use('/employes', employeRoutes);
router.use('/conseillers', conseillerRHRoutes);
router.use('/dossiers', dossierEmployeRoutes);
router.use('/beneficiaires', beneficiaireRoutes);
router.use('/compagnies', compagnieAssuranceRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;