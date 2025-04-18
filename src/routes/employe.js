const express = require('express');
const router = express.Router();
const { Employe } = require('../models');

/**
 * @swagger
 * /api/employes:
 *   get:
 *     summary: Récupère tous les employés
 *     tags: [Employes]
 *     responses:
 *       200:
 *         description: Liste des employés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employe'
 */
router.get('/', async (req, res) => {
  try {
    const employes = await Employe.findAll();
    res.json(employes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/employes/{id}:
 *   get:
 *     summary: Récupère un employé par son ID
 *     tags: [Employes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'employé
 *     responses:
 *       200:
 *         description: Détails de l'employé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employe'
 *       404:
 *         description: Employé non trouvé
 */
router.get('/:id', async (req, res) => {
  try {
    const employe = await Employe.findByPk(req.params.id);
    if (!employe) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    res.json(employe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/employes:
 *   post:
 *     summary: Crée un nouvel employé
 *     tags: [Employes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeInput'
 *     responses:
 *       201:
 *         description: Employé créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', async (req, res) => {
  try {
    const employe = await Employe.create(req.body);
    res.status(201).json(employe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/employes/{id}:
 *   put:
 *     summary: Met à jour un employé
 *     tags: [Employes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'employé
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeInput'
 *     responses:
 *       200:
 *         description: Employé mis à jour avec succès
 *       404:
 *         description: Employé non trouvé
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await Employe.update(req.body, {
      where: { idEmploye: req.params.id }
    });
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    const employe = await Employe.findByPk(req.params.id);
    res.json(employe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/employes/{id}:
 *   delete:
 *     summary: Supprime un employé
 *     tags: [Employes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'employé
 *     responses:
 *       200:
 *         description: Employé supprimé avec succès
 *       404:
 *         description: Employé non trouvé
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employe.destroy({
      where: { idEmploye: req.params.id }
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    res.json({ message: 'Employé supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;