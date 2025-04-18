const { CompagnieAssurance, Notification } = require('../../models');

const compagnieAssuranceResolvers = {
  Query: {
    compagnies: async () => {
      return await CompagnieAssurance.findAll();
    },
    compagnie: async (_, { id }) => {
      return await CompagnieAssurance.findByPk(id);
    }
  },
  Mutation: {
    createCompagnie: async (_, { compagnie }) => {
      return await CompagnieAssurance.create(compagnie);
    },
    updateCompagnie: async (_, { id, compagnie }) => {
      await CompagnieAssurance.update(compagnie, { where: { idCompagnie: id } });
      return await CompagnieAssurance.findByPk(id);
    },
    deleteCompagnie: async (_, { id }) => {
      const deleted = await CompagnieAssurance.destroy({ where: { idCompagnie: id } });
      return deleted > 0;
    },
    prendreEnChargeChangement: async (_, { id, notificationId }) => {
      try {
        const notification = await Notification.findByPk(notificationId);
        if (notification && notification.compagnieId === parseInt(id)) {
          await Notification.update(
            { statut: 'traité' },
            { where: { idNotification: notificationId } }
          );
          return true;
        }
        return false;
      } catch (error) {
        console.error('Erreur lors de la prise en charge:', error);
        return false;
      }
    }
  },
  CompagnieAssurance: {
    notifications: async (compagnie) => {
      return await Notification.findAll({ where: { compagnieId: compagnie.idCompagnie } });
    }
  }
};

module.exports = compagnieAssuranceResolvers;