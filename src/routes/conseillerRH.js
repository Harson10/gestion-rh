const express = require('express');
const router = express.Router();
const { ConseillerRH } = require('../models');

/**
 * @swagger
 * /api/conseillers:
 *   get:
 *     summary: Récupère tous les conseillers RH
 *     tags: [ConseillerRH]
 *     responses:
 *       200:
 *         description: Liste des conseillers RH
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ConseillerRH'
 */
router.get('/', async (req, res) => {
  try {
    const conseillers = await ConseillerRH.findAll();
    res.json(conseillers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/conseillers/{id}:
 *   get:
 *     summary: Récupère un conseiller RH par son ID
 *     tags: [ConseillerRH]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du conseiller RH
 *     responses:
 *       200:
 *         description: Détails du conseiller RH
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConseillerRH'
 *       404:
 *         description: Conseiller RH non trouvé
 */
router.get('/:id', async (req, res) => {
  try {
    const conseiller = await ConseillerRH.findByPk(req.params.id);
    if (!conseiller) {
      return res.status(404).json({ message: 'Conseiller RH non trouvé' });
    }
    res.json(conseiller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/conseillers:
 *   post:
 *     summary: Crée un nouveau conseiller RH
 *     tags: [ConseillerRH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConseillerRHInput'
 *     responses:
 *       201:
 *         description: Conseiller RH créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', async (req, res) => {
  try {
    const conseiller = await ConseillerRH.create(req.body);
    res.status(201).json(conseiller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/conseillers/{id}:
 *   put:
 *     summary: Met à jour un conseiller RH
 *     tags: [ConseillerRH]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du conseiller RH
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConseillerRHInput'
 *     responses:
 *       200:
 *         description: Conseiller RH mis à jour avec succès
 *       404:
 *         description: Conseiller RH non trouvé
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await ConseillerRH.update(req.body, {
      where: { idConseiller: req.params.id }
    });
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Conseiller RH non trouvé' });
    }
    const conseiller = await ConseillerRH.findByPk(req.params.id);
    res.json(conseiller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/conseillers/{id}:
 *   delete:
 *     summary: Supprime un conseiller RH
 *     tags: [ConseillerRH]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du conseiller RH
 *     responses:
 *       200:
 *         description: Conseiller RH supprimé avec succès
 *       404:
 *         description: Conseiller RH non trouvé
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ConseillerRH.destroy({
      where: { idConseiller: req.params.id }
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Conseiller RH non trouvé' });
    }
    res.json({ message: 'Conseiller RH supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;