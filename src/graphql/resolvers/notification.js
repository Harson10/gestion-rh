const { Notification, Employe, ConseillerRH, CompagnieAssurance } = require('../../models');

const notificationResolvers = {
  Query: {
    notifications: async () => {
      return await Notification.findAll();
    },
    notification: async (_, { id }) => {
      return await Notification.findByPk(id);
    },
    notificationsParEmploye: async (_, { employeId }) => {
      return await Notification.findAll({ where: { employeId } });
    },
    notificationsParConseiller: async (_, { conseillerId }) => {
      return await Notification.findAll({ where: { conseillerId } });
    },
    notificationsParCompagnie: async (_, { compagnieId }) => {
      return await Notification.findAll({ where: { compagnieId } });
    }
  },
  Mutation: {
    createNotification: async (_, { notification }) => {
      return await Notification.create({
        ...notification,
        dateEnvoi: new Date(),
        statut: 'en attente'
      });
    },
    updateNotification: async (_, { id, notification }) => {
      await Notification.update(notification, { where: { idNotification: id } });
      return await Notification.findByPk(id);
    },
    deleteNotification: async (_, { id }) => {
      const deleted = await Notification.destroy({ where: { idNotification: id } });
      return deleted > 0;
    },
    redigerMail: async (_, { notification }) => {
      return await Notification.create({
        ...notification,
        dateEnvoi: null,
        statut: 'en attente'
      });
    },
    envoyerMail: async (_, { id }) => {
      try {
        await Notification.update(
          { dateEnvoi: new Date(), statut: 'envoyé' },
          { where: { idNotification: id } }
        );
        return true;
      } catch (error) {
        console.error('Erreur lors de l\'envoi du mail:', error);
        return false;
      }
    }
  },
  Notification: {
    employe: async (notification) => {
      return notification.employeId ? await Employe.findByPk(notification.employeId) : null;
    },
    conseiller: async (notification) => {
      return notification.conseillerId ? await ConseillerRH.findByPk(notification.conseillerId) : null;
    },
    compagnie: async (notification) => {
      return notification.compagnieId ? await CompagnieAssurance.findByPk(notification.compagnieId) : null;
    }
  }
};

module.exports = notificationResolvers;