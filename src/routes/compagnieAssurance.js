const express = require('express');
const router = express.Router();
const compagnieController = require('../controllers/compagnieAssuranceController');

/**
 * @swagger
 * /api/compagnies:
 *   get:
 *     summary: Récupère toutes les compagnies d'assurance
 *     tags: [CompagniesAssurance]
 *     responses:
 *       200:
 *         description: Liste des compagnies d'assurance
 */
router.get('/', compagnieController.getAllCompagnies);

/**
 * @swagger
 * /api/compagnies/{id}:
 *   get:
 *     summary: Récupère une compagnie d'assurance par son ID
 *     tags: [CompagniesAssurance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la compagnie d'assurance
 *       404:
 *         description: Compagnie d'assurance non trouvée
 */
router.get('/:id', compagnieController.getCompagnieById);

/**
 * @swagger
 * /api/compagnies:
 *   post:
 *     summary: Crée une nouvelle compagnie d'assurance
 *     tags: [CompagniesAssurance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomCompagnie
 *               - emailCompagnie
 *               - telephoneCompagnie
 *             properties:
 *               nomCompagnie:
 *                 type: string
 *               emailCompagnie:
 *                 type: string
 *               telephoneCompagnie:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compagnie d'assurance créée avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', compagnieController.createCompagnie);

/**
 * @swagger
 * /api/compagnies/{id}:
 *   put:
 *     summary: Met à jour une compagnie d'assurance
 *     tags: [CompagniesAssurance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Compagnie d'assurance mise à jour avec succès
 *       404:
 *         description: Compagnie d'assurance non trouvée
 */
router.put('/:id', compagnieController.updateCompagnie);

/**
 * @swagger
 * /api/compagnies/{id}:
 *   delete:
 *     summary: Supprime une compagnie d'assurance
 *     tags: [CompagniesAssurance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Compagnie d'assurance supprimée avec succès
 *       404:
 *         description: Compagnie d'assurance non trouvée
 */
router.delete('/:id', compagnieController.deleteCompagnie);

module.exports = router; 