const { Notification, Employe, ConseillerRH, CompagnieAssurance } = require('../models');
const NotificationService = require('../services/notificationService');

// Récupérer toutes les notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      include: [
        { model: Employe },
        { model: ConseillerRH },
        { model: CompagnieAssurance }
      ]
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des notifications', 
      error: error.message 
    });
  }
};

// Récupérer une notification par son ID
const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id, {
      include: [
        { model: Employe },
        { model: ConseillerRH },
        { model: CompagnieAssurance }
      ]
    });
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification non trouvée' });
    }
    
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de la notification',
      error: error.message 
    });
  }
};

// Créer une nouvelle notification
const createNotification = async (req, res) => {
  try {
    const { contenu, objet, statut, employeId, conseillerId, compagnieId } = req.body;
    
    if (!contenu || !objet || !conseillerId) {
      return res.status(400).json({ 
        message: 'Le contenu, l\'objet et l\'ID du conseiller sont obligatoires' 
      });
    }
    
    const nouvelleNotification = await Notification.create({
      contenu,
      objet,
      statut: statut || 'Non envoyée',
      dateEnvoi: new Date(),
      employeId,
      conseillerId,
      compagnieId
    });
    
    res.status(201).json(nouvelleNotification);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la création de la notification',
      error: error.message 
    });
  }
};

// Mettre à jour une notification
const updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification non trouvée' });
    }
    
    await notification.update(req.body);
    
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour de la notification',
      error: error.message 
    });
  }
};

// Supprimer une notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification non trouvée' });
    }
    
    await notification.destroy();
    
    res.status(200).json({ message: 'Notification supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression de la notification',
      error: error.message 
    });
  }
};

// Marquer une notification comme envoyée
const envoyerNotification = async (req, res) => {
  try {
    // Utilisation du service de notification pour envoyer l'email
    const notification = await NotificationService.envoyerNotificationEmail(req.params.id);
    
    res.status(200).json({ 
      message: 'Notification envoyée avec succès', 
      notification 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de l\'envoi de la notification',
      error: error.message 
    });
  }
};

// Notifier un employé d'un changement de bénéficiaire
const notifierChangementBeneficiaire = async (req, res) => {
  try {
    const { employeId, conseillerId, nomBeneficiaire } = req.body;
    
    if (!employeId || !conseillerId || !nomBeneficiaire) {
      return res.status(400).json({ 
        message: 'Les IDs de l\'employé, du conseiller et le nom du bénéficiaire sont obligatoires' 
      });
    }
    
    const notification = await NotificationService.notifierChangementBeneficiaire(
      employeId, 
      conseillerId, 
      nomBeneficiaire
    );
    
    res.status(201).json({ 
      message: 'Notification de changement de bénéficiaire créée avec succès',
      notification 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la création de la notification de changement de bénéficiaire',
      error: error.message 
    });
  }
};

// Notifier une compagnie d'assurance
const notifierCompagnieAssurance = async (req, res) => {
  try {
    const { employeId, conseillerId, compagnieId } = req.body;
    
    if (!employeId || !conseillerId || !compagnieId) {
      return res.status(400).json({ 
        message: 'Les IDs de l\'employé, du conseiller et de la compagnie sont obligatoires' 
      });
    }
    
    const notification = await NotificationService.notifierCompagnieAssurance(
      employeId, 
      conseillerId, 
      compagnieId
    );
    
    res.status(201).json({ 
      message: 'Notification à la compagnie d\'assurance créée avec succès',
      notification 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la création de la notification pour la compagnie d\'assurance',
      error: error.message 
    });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  envoyerNotification,
  notifierChangementBeneficiaire,
  notifierCompagnieAssurance
}; 