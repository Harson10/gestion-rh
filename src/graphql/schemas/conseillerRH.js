const { gql } = require('graphql-tag');

const conseillerRHTypeDefs = gql`
  type ConseillerRH {
    idConseiller: ID!
    nom: String!
    prenom: String!
    email: String!
    dossiers: [DossierEmploye]
    notifications: [Notification]
    createdAt: String
    updatedAt: String
  }

  input ConseillerRHInput {
    nom: String!
    prenom: String!
    email: String!
  }

  extend type Query {
    conseillers: [ConseillerRH]
    conseiller(id: ID!): ConseillerRH
  }

  extend type Mutation {
    createConseiller(conseiller: ConseillerRHInput): ConseillerRH
    updateConseiller(id: ID!, conseiller: ConseillerRHInput): ConseillerRH
    deleteConseiller(id: ID!): Boolean
    repondreAppel(conseillerId: ID!, employeId: ID!): Boolean
    demanderInformations(conseillerId: ID!, employeId: ID!): Boolean
    validerInformations(conseillerId: ID!, dossierId: ID!): Boolean
    noterBeneficiaire(conseillerId: ID!, beneficiaireId: ID!): Boolean
    notifierChangement(conseillerId: ID!, employeId: ID!, compagnieId: ID!): Boolean
  }
`;

module.exports = conseillerRHTypeDefs;