const { gql } = require('apollo-server-express');

const beneficiaireTypeDefs = gql`
  type Beneficiaire {
    idBeneficiaire: ID!
    nomBeneficiaire: String!
    prenomBeneficiaire: String!
    relation: String
    dateAjout: String
    employe: Employe
    createdAt: String
    updatedAt: String
  }

  input BeneficiaireInput {
    nomBeneficiaire: String!
    prenomBeneficiaire: String!
    relation: String
    employeId: ID!
  }

  extend type Query {
    beneficiaires: [Beneficiaire]
    beneficiaire(id: ID!): Beneficiaire
    beneficiairesParEmploye(employeId: ID!): [Beneficiaire]
  }

  extend type Mutation {
    createBeneficiaire(beneficiaire: BeneficiaireInput): Beneficiaire
    updateBeneficiaire(id: ID!, beneficiaire: BeneficiaireInput): Beneficiaire
    deleteBeneficiaire(id: ID!): Boolean
    ajouterNouveauBeneficiaire(beneficiaire: BeneficiaireInput): Beneficiaire
    obtenirInformation(id: ID!): Beneficiaire
  }
`;

module.exports = beneficiaireTypeDefs;