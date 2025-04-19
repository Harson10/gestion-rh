const express = require('express');
const router = express.Router();
const beneficiaireController = require('../controllers/beneficiaireController');

// Middleware de journalisation pour déboguer les requêtes
router.use((req, res, next) => {
  console.log('-------------------------------------');
  console.log(`Requête ${req.method} sur ${req.originalUrl}`);
  console.log('Headers:', req.headers);
  console.log('Corps de la requête:', req.body);
  console.log('Params:', req.params);
  console.log('Query:', req.query);
  console.log('-------------------------------------');
  next();
});

/**
 * @swagger
 * /api/beneficiaires:
 *   get:
 *     summary: Récupère tous les bénéficiaires
 *     tags: [Beneficiaires]
 *     responses:
 *       200:
 *         description: Liste des bénéficiaires
 */
router.get('/', beneficiaireController.getAllBeneficiaires);

/**
 * @swagger
 * /api/beneficiaires/{id}:
 *   get:
 *     summary: Récupère un bénéficiaire par son ID
 *     tags: [Beneficiaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du bénéficiaire
 *       404:
 *         description: Bénéficiaire non trouvé
 */
router.get('/:id', beneficiaireController.getBeneficiaireById);

/**
 * @swagger
 * /api/beneficiaires:
 *   post:
 *     summary: Crée un nouveau bénéficiaire
 *     tags: [Beneficiaires]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomBeneficiaire
 *               - prenomBeneficiaire
 *               - relation
 *               - employeId
 *             properties:
 *               nomBeneficiaire:
 *                 type: string
 *               prenomBeneficiaire:
 *                 type: string
 *               relation:
 *                 type: string
 *               employeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Bénéficiaire créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', beneficiaireController.createBeneficiaire);

/**
 * @swagger
 * /api/beneficiaires/{id}:
 *   put:
 *     summary: Met à jour un bénéficiaire
 *     tags: [Beneficiaires]
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
 *         description: Bénéficiaire mis à jour avec succès
 *       404:
 *         description: Bénéficiaire non trouvé
 */
router.put('/:id', beneficiaireController.updateBeneficiaire);

/**
 * @swagger
 * /api/beneficiaires/{id}:
 *   delete:
 *     summary: Supprime un bénéficiaire
 *     tags: [Beneficiaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bénéficiaire supprimé avec succès
 *       404:
 *         description: Bénéficiaire non trouvé
 */
router.delete('/:id', beneficiaireController.deleteBeneficiaire);

module.exports = router; 