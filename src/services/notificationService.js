const { Notification, Employe, CompagnieAssurance } = require('../models');

/**
 * Service de notification pour gérer l'envoi de notifications par email
 */
class NotificationService {
  /**
   * Envoie une notification par email (simulé)
   * @param {Object} notification - L'objet notification à envoyer
   * @returns {Promise<Object>} La notification mise à jour
   */
  static async envoyerNotificationEmail(notificationId) {
    try {
      // Récupérer les informations complètes de la notification
      const notification = await Notification.findByPk(notificationId, {
        include: [
          { model: Employe },
          { model: CompagnieAssurance }
        ]
      });

      if (!notification) {
        throw new Error('Notification non trouvée');
      }

      // Simuler l'envoi d'un email à l'employé si présent
      if (notification.Employe) {
        console.log(`Email envoyé à ${notification.Employe.emailEmploye} avec pour objet "${notification.objet}"`);
        console.log(`Contenu: ${notification.contenu}`);
      }

      // Simuler l'envoi d'un email à la compagnie d'assurance si présente
      if (notification.CompagnieAssurance) {
        console.log(`Email envoyé à ${notification.CompagnieAssurance.emailCompagnie} avec pour objet "${notification.objet}"`);
        console.log(`Contenu: ${notification.contenu}`);
      }

      // Mettre à jour le statut de la notification
      await notification.update({
        statut: 'Envoyée',
        dateEnvoi: new Date()
      });

      return notification;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
      throw error;
    }
  }

  /**
   * Crée une notification pour informer un employé d'un changement de bénéficiaire
   * @param {number} employeId - ID de l'employé concerné
   * @param {number} conseillerId - ID du conseiller RH
   * @param {string} nomBeneficiaire - Nom du bénéficiaire ajouté/modifié
   * @returns {Promise<Object>} La notification créée
   */
  static async notifierChangementBeneficiaire(employeId, conseillerId, nomBeneficiaire) {
    try {
      const employe = await Employe.findByPk(employeId);
      if (!employe) {
        throw new Error('Employé non trouvé');
      }

      const notification = await Notification.create({
        contenu: `Un changement a été effectué concernant votre bénéficiaire ${nomBeneficiaire}. Veuillez consulter votre dossier pour plus d'informations.`,
        objet: 'Modification de bénéficiaire',
        statut: 'Non envoyée',
        employeId,
        conseillerId
      });

      return notification;
    } catch (error) {
      console.error('Erreur lors de la création de la notification de changement de bénéficiaire:', error);
      throw error;
    }
  }

  /**
   * Crée une notification pour informer une compagnie d'assurance d'un changement de bénéficiaire
   * @param {number} employeId - ID de l'employé concerné
   * @param {number} conseillerId - ID du conseiller RH
   * @param {number} compagnieId - ID de la compagnie d'assurance
   * @returns {Promise<Object>} La notification créée
   */
  static async notifierCompagnieAssurance(employeId, conseillerId, compagnieId) {
    try {
      const employe = await Employe.findByPk(employeId);
      const compagnie = await CompagnieAssurance.findByPk(compagnieId);
      
      if (!employe) {
        throw new Error('Employé non trouvé');
      }
      
      if (!compagnie) {
        throw new Error('Compagnie d\'assurance non trouvée');
      }

      const notification = await Notification.create({
        contenu: `Une modification a été effectuée dans le dossier de l'employé ${employe.nomEmploye} ${employe.prenomEmploye}. Veuillez mettre à jour vos informations.`,
        objet: 'Mise à jour dossier employé',
        statut: 'Non envoyée',
        employeId,
        conseillerId,
        compagnieId
      });

      return notification;
    } catch (error) {
      console.error('Erreur lors de la création de la notification pour la compagnie d\'assurance:', error);
      throw error;
    }
  }
}

module.exports = NotificationService; 