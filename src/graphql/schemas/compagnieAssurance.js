const { gql } = require('graphql-tag');

const compagnieAssuranceTypeDefs = gql`
  type CompagnieAssurance {
    idCompagnie: ID!
    nomCompagnie: String!
    emailCompagnie: String!
    telephoneCompagnie: String
    notifications: [Notification]
    createdAt: String
    updatedAt: String
  }

  input CompagnieAssuranceInput {
    nomCompagnie: String!
    emailCompagnie: String!
    telephoneCompagnie: String
  }

  extend type Query {
    compagnies: [CompagnieAssurance]
    compagnie(id: ID!): CompagnieAssurance
  }

  extend type Mutation {
    createCompagnie(compagnie: CompagnieAssuranceInput): CompagnieAssurance
    updateCompagnie(id: ID!, compagnie: CompagnieAssuranceInput): CompagnieAssurance
    deleteCompagnie(id: ID!): Boolean
    prendreEnChargeChangement(id: ID!, notificationId: ID!): Boolean
  }
`;

module.exports = compagnieAssuranceTypeDefs;