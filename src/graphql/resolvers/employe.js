const { Employe, DossierEmploye, Beneficiaire, Notification } = require('../../models');

const employeResolvers = {
  Query: {
    employes: async () => {
      return await Employe.findAll();
    },
    employe: async (_, { id }) => {
      return await Employe.findByPk(id);
    }
  },
  Mutation: {
    createEmploye: async (_, { employe }) => {
      return await Employe.create(employe);
    },
    updateEmploye: async (_, { id, employe }) => {
      await Employe.update(employe, { where: { idEmploye: id } });
      return await Employe.findByPk(id);
    },
    deleteEmploye: async (_, { id }) => {
      const deleted = await Employe.destroy({ where: { idEmploye: id } });
      return deleted > 0;
    },
    fournirInformationsPersonnelles: async (_, { id, employe }) => {
      await Employe.update(employe, { where: { idEmploye: id } });
      return await Employe.findByPk(id);
    }
  },
  Employe: {
    dossier: async (employe) => {
      return await DossierEmploye.findOne({ where: { employeId: employe.idEmploye } });
    },
    beneficiaires: async (employe) => {
      return await Beneficiaire.findAll({ where: { employeId: employe.idEmploye } });
    },
    notifications: async (employe) => {
      return await Notification.findAll({ where: { employeId: employe.idEmploye } });
    }
  }
};

module.exports = employeResolvers;