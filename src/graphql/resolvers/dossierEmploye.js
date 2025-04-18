const { DossierEmploye, Employe, ConseillerRH } = require('../../models');

const dossierEmployeResolvers = {
  Query: {
    dossiers: async () => {
      return await DossierEmploye.findAll();
    },
    dossier: async (_, { id }) => {
      return await DossierEmploye.findByPk(id);
    },
    dossiersParEmploye: async (_, { employeId }) => {
      return await DossierEmploye.findAll({ where: { employeId } });
    },
    dossiersParConseiller: async (_, { conseillerId }) => {
      return await DossierEmploye.findAll({ where: { conseillerId } });
    }
  },
  Mutation: {
    createDossier: async (_, { dossier }) => {
      return await DossierEmploye.create(dossier);
    },
    updateDossier: async (_, { id, dossier }) => {
      await DossierEmploye.update(dossier, { where: { idDossier: id } });
      return await DossierEmploye.findByPk(id);
    },
    deleteDossier: async (_, { id }) => {
      const deleted = await DossierEmploye.destroy({ where: { idDossier: id } });
      return deleted > 0;
    },
    validerModification: async (_, { id }) => {
      await DossierEmploye.update(
        { validation: true, dateMiseAJour: new Date() },
        { where: { idDossier: id } }
      );
      return await DossierEmploye.findByPk(id);
    },
    afficherInformations: async (_, { id }) => {
      return await DossierEmploye.findByPk(id);
    },
    modifierInformations: async (_, { id, dossier }) => {
      await DossierEmploye.update(
        { ...dossier, dateMiseAJour: new Date(), validation: false },
        { where: { idDossier: id } }
      );
      return await DossierEmploye.findByPk(id);
    }
  },
  DossierEmploye: {
    employe: async (dossier) => {
      return await Employe.findByPk(dossier.employeId);
    },
    conseiller: async (dossier) => {
      return await ConseillerRH.findByPk(dossier.conseillerId);
    }
  }
};

module.exports = dossierEmployeResolvers;