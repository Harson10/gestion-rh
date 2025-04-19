const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Récupère toutes les notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Liste des notifications
 */
router.get('/', notificationController.getAllNotifications);

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Récupère une notification par son ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la notification
 *       404:
 *         description: Notification non trouvée
 */
router.get('/:id', notificationController.getNotificationById);

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Crée une nouvelle notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contenu
 *               - objet
 *               - conseillerId
 *             properties:
 *               contenu:
 *                 type: string
 *               objet:
 *                 type: string
 *               statut:
 *                 type: string
 *               employeId:
 *                 type: integer
 *               conseillerId:
 *                 type: integer
 *               compagnieId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Notification créée avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', notificationController.createNotification);

/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     summary: Met à jour une notification
 *     tags: [Notifications]
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
 *         description: Notification mise à jour avec succès
 *       404:
 *         description: Notification non trouvée
 */
router.put('/:id', notificationController.updateNotification);

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Supprime une notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notification supprimée avec succès
 *       404:
 *         description: Notification non trouvée
 */
router.delete('/:id', notificationController.deleteNotification);

/**
 * @swagger
 * /api/notifications/envoyer/{id}:
 *   put:
 *     summary: Envoie une notification par email
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notification envoyée avec succès
 *       404:
 *         description: Notification non trouvée
 */
router.put('/envoyer/:id', notificationController.envoyerNotification);

/**
 * @swagger
 * /api/notifications/beneficiaire:
 *   post:
 *     summary: Crée une notification pour un changement de bénéficiaire
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeId
 *               - conseillerId
 *               - nomBeneficiaire
 *             properties:
 *               employeId:
 *                 type: integer
 *               conseillerId:
 *                 type: integer
 *               nomBeneficiaire:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification de changement de bénéficiaire créée avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/beneficiaire', notificationController.notifierChangementBeneficiaire);

/**
 * @swagger
 * /api/notifications/compagnie:
 *   post:
 *     summary: Crée une notification pour une compagnie d'assurance
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeId
 *               - conseillerId
 *               - compagnieId
 *             properties:
 *               employeId:
 *                 type: integer
 *               conseillerId:
 *                 type: integer
 *               compagnieId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Notification à la compagnie d'assurance créée avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/compagnie', notificationController.notifierCompagnieAssurance);

module.exports = router; 