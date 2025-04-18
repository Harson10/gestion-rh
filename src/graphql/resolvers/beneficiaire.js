const { Beneficiaire, Employe } = require('../../models');

const beneficiaireResolvers = {
  Query: {
    beneficiaires: async () => {
      return await Beneficiaire.findAll();
    },
    beneficiaire: async (_, { id }) => {
      return await Beneficiaire.findByPk(id);
    },
    beneficiairesParEmploye: async (_, { employeId }) => {
      return await Beneficiaire.findAll({ where: { employeId } });
    }
  },
  Mutation: {
    createBeneficiaire: async (_, { beneficiaire }) => {
      return await Beneficiaire.create(beneficiaire);
    },
    updateBeneficiaire: async (_, { id, beneficiaire }) => {
      await Beneficiaire.update(beneficiaire, { where: { idBeneficiaire: id } });
      return await Beneficiaire.findByPk(id);
    },
    deleteBeneficiaire: async (_, { id }) => {
      const deleted = await Beneficiaire.destroy({ where: { idBeneficiaire: id } });
      return deleted > 0;
    },
    ajouterNouveauBeneficiaire: async (_, { beneficiaire }) => {
      return await Beneficiaire.create({
        ...beneficiaire,
        dateAjout: new Date()
      });
    },
    obtenirInformation: async (_, { id }) => {
      return await Beneficiaire.findByPk(id);
    }
  },
  Beneficiaire: {
    employe: async (beneficiaire) => {
      return await Employe.findByPk(beneficiaire.employeId);
    }
  }
};

module.exports = beneficiaireResolvers;