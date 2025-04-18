const { gql } = require('apollo-server-express');

const employeTypeDefs = gql`
  type Employe {
    idEmploye: ID!
    nomEmploye: String!
    prenomEmploye: String!
    emailEmploye: String!
    telephone: String
    dateEmbauche: String
    adresse: String
    dossier: DossierEmploye
    beneficiaires: [Beneficiaire]
    notifications: [Notification]
    createdAt: String
    updatedAt: String
  }

  input EmployeInput {
    nomEmploye: String!
    prenomEmploye: String!
    emailEmploye: String!
    telephone: String
    dateEmbauche: String
    adresse: String
  }

  extend type Query {
    employes: [Employe]
    employe(id: ID!): Employe
  }

  extend type Mutation {
    createEmploye(employe: EmployeInput): Employe
    updateEmploye(id: ID!, employe: EmployeInput): Employe
    deleteEmploye(id: ID!): Boolean
    fournirInformationsPersonnelles(id: ID!, employe: EmployeInput): Employe
    communiquerBeneficiaire(id: ID!, beneficiaireId: ID!): Boolean
    recevoirConfirmation(id: ID!, notificationId: ID!): Boolean
  }
`;

module.exports = employeTypeDefs;