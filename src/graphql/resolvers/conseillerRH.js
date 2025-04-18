const { ConseillerRH, DossierEmploye, Notification } = require('../../models');

const conseillerRHResolvers = {
  Query: {
    conseillers: async () => {
      return await ConseillerRH.findAll();
    },
    conseiller: async (_, { id }) => {
      return await ConseillerRH.findByPk(id);
    }
  },
  Mutation: {
    createConseiller: async (_, { conseiller }) => {
      return await ConseillerRH.create(conseiller);
    },
    updateConseiller: async (_, { id, conseiller }) => {
      await ConseillerRH.update(conseiller, { where: { idConseiller: id } });
      return await ConseillerRH.findByPk(id);
    },
    deleteConseiller: async (_, { id }) => {
      const deleted = await ConseillerRH.destroy({ where: { idConseiller: id } });
      return deleted > 0;
    },
    repondreAppel: async (_, { conseillerId, employeId }) => {
      // Logique pour répondre à l'appel
      return true;
    },
    demanderInformations: async (_, { conseillerId, employeId }) => {
      // Logique pour demander des informations
      return true;
    },
    validerInformations: async (_, { conseillerId, dossierId }) => {
      try {
        await DossierEmploye.update(
          { validation: true },
          { where: { idDossier: dossierId } }
        );
        return true;
      } catch (error) {
        console.error('Erreur lors de la validation:', error);
        return false;
      }
    },
    noterBeneficiaire: async (_, { conseillerId, beneficiaireId }) => {
      // Logique pour noter un bénéficiaire
      return true;
    },
    notifierChangement: async (_, { conseillerId, employeId, compagnieId }) => {
      try {
        await Notification.create({
          contenu: "Notification de changement de bénéficiaire",
          objet: "Changement de bénéficiaire",
          employeId,
          conseillerId,
          compagnieId,
          statut: 'envoyé'
        });
        return true;
      } catch (error) {
        console.error('Erreur lors de la notification:', error);
        return false;
      }
    }
  },
  ConseillerRH: {
    dossiers: async (conseiller) => {
      return await DossierEmploye.findAll({ where: { conseillerId: conseiller.idConseiller } });
    },
    notifications: async (conseiller) => {
      return await Notification.findAll({ where: { conseillerId: conseiller.idConseiller } });
    }
  }
};

module.exports = conseillerRHResolvers;