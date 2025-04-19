const { gql } = require('graphql-tag');

const dossierEmployeTypeDefs = gql`
  type DossierEmploye {
    idDossier: ID!
    dateMiseAJour: String
    validation: Boolean
    employe: Employe
    conseiller: ConseillerRH
    createdAt: String
    updatedAt: String
  }

  input DossierEmployeInput {
    employeId: ID!
    conseillerId: ID
    validation: Boolean
  }

  extend type Query {
    dossiers: [DossierEmploye]
    dossier(id: ID!): DossierEmploye
    dossiersParEmploye(employeId: ID!): [DossierEmploye]
    dossiersParConseiller(conseillerId: ID!): [DossierEmploye]
  }

  extend type Mutation {
    createDossier(dossier: DossierEmployeInput): DossierEmploye
    updateDossier(id: ID!, dossier: DossierEmployeInput): DossierEmploye
    deleteDossier(id: ID!): Boolean
    validerModification(id: ID!): DossierEmploye
    afficherInformations(id: ID!): DossierEmploye
    modifierInformations(id: ID!, dossier: DossierEmployeInput): DossierEmploye
  }
`;

module.exports = dossierEmployeTypeDefs;