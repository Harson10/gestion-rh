const { gql } = require('graphql-tag');
const employeTypeDefs = require('./employe');
const conseillerRHTypeDefs = require('./conseillerRH');
const dossierEmployeTypeDefs = require('./dossierEmploye');
const beneficiaireTypeDefs = require('./beneficiaire');
const compagnieAssuranceTypeDefs = require('./compagnieAssurance');
const notificationTypeDefs = require('./notification');

// Type racine qui définit les points d'entrée de base pour les requêtes et mutations
const rootTypeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

// Exporter tous les schémas combinés
module.exports = [
  rootTypeDefs,
  employeTypeDefs,
  conseillerRHTypeDefs,
  dossierEmployeTypeDefs,
  beneficiaireTypeDefs,
  compagnieAssuranceTypeDefs,
  notificationTypeDefs
];