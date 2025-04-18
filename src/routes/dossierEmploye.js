const express = require('express');
const router = express.Router();
const { DossierEmploye } = require('../models');

/**
 * @swagger
 * /api/dossiers:
 *   get:
 *     summary: Récupère tous les dossiers employés
 *     tags: [DossierEmploye]
 *     responses:
 *       200:
 *         description: Liste des dossiers employés
 */
router.get('/', async (req, res) => {
  try {
    const dossiers = await DossierEmploye.findAll();
    res.json(dossiers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/dossiers/{id}:
 *   get:
 *     summary: Récupère un dossier employé par son ID
 *     tags: [DossierEmploye]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du dossier
 *     responses:
 *       200:
 *         description: Détails du dossier employé
 *       404:
 *         description: Dossier employé non trouvé
 */
router.get('/:id', async (req, res) => {
  try {
    const dossier = await DossierEmploye.findByPk(req.params.id);
    if (!dossier) {
      return res.status(404).json({ message: 'Dossier employé non trouvé' });
    }
    res.json(dossier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/dossiers/employe/{employeId}:
 *   get:
 *     summary: Récupère les dossiers d'un employé spécifique
 *     tags: [DossierEmploye]
 *     parameters:
 *       - in: path
 *         name: employeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'employé
 *     responses:
 *       200:
 *         description: Liste des dossiers de l'employé
 */
router.get('/employe/:employeId', async (req, res) => {
  try {
    const dossiers = await DossierEmploye.findAll({
      where: { employeId: req.params.employeId }
    });
    res.json(dossiers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/dossiers:
 *   post:
 *     summary: Crée un nouveau dossier employé
 *     tags: [DossierEmploye]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeId:
 *                 type: integer
 *               conseillerId:
 *                 type: integer
 *               validation:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Dossier employé créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', async (req, res) => {
  try {
    const dossier = await DossierEmploye.create({
      ...req.body,
      dateMiseAJour: new Date()
    });
    res.status(201).json(dossier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/dossiers/{id}:
 *   put:
 *     summary: Met à jour un dossier employé
 *     tags: [DossierEmploye]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du dossier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeId:
 *                 type: integer
 *               conseillerId:
 *                 type: integer
 *               validation:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Dossier employé mis à jour avec succès
 *       404:
 *         description: Dossier employé non trouvé
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await DossierEmploye.update(
      {
        ...req.body,
        dateMiseAJour: new Date()
      },
      { where: { idDossier: req.params.id } }
    );
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Dossier employé non trouvé' });
    }
    const dossier = await DossierEmploye.findByPk(req.params.id);
    res.json(dossier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/dossiers/{id}/valider:
 *   put:
 *     summary: Valide un dossier employé
 *     tags: [DossierEmploye]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du dossier
 *     responses:
 *       200:
 *         description: Dossier employé validé avec succès
 *       404:
 *         description: Dossier employé non trouvé
 */
router.put('/:id/valider', async (req, res) => {
    try {
      const updated = await DossierEmploye.update(
        { validation: true, dateMiseAJour: new Date() },
        { where: { idDossier: req.params.id } }
      );
      if (updated[0] === 0) {
        return res.status(404).json({ message: 'Dossier employé non trouvé' });
      }
      const dossier = await DossierEmploye.findByPk(req.params.id);
      res.json(dossier);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  /**
   * @swagger
   * /api/dossiers/{id}:
   *   delete:
   *     summary: Supprime un dossier employé
   *     tags: [DossierEmploye]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID du dossier
   *     responses:
   *       200:
   *         description: Dossier supprimé avec succès
   *       404:
   *         description: Dossier employé non trouvé
   */
  router.delete('/:id', async (req, res) => {
    try {
      const deleted = await DossierEmploye.destroy({
        where: { idDossier: req.params.id }
      });
      if (deleted === 0) {
        return res.status(404).json({ message: 'Dossier employé non trouvé' });
      }
      res.json({ message: 'Dossier employé supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;