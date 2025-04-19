const { gql } = require('graphql-tag');

const notificationTypeDefs = gql`
  type Notification {
    idNotification: ID!
    dateEnvoi: String
    contenu: String!
    objet: String!
    statut: String
    employe: Employe
    conseiller: ConseillerRH
    compagnie: CompagnieAssurance
    createdAt: String
    updatedAt: String
  }

  input NotificationInput {
    contenu: String!
    objet: String!
    employeId: ID
    conseillerId: ID
    compagnieId: ID
  }

  extend type Query {
    notifications: [Notification]
    notification(id: ID!): Notification
    notificationsParEmploye(employeId: ID!): [Notification]
    notificationsParConseiller(conseillerId: ID!): [Notification]
    notificationsParCompagnie(compagnieId: ID!): [Notification]
  }

  extend type Mutation {
    createNotification(notification: NotificationInput): Notification
    updateNotification(id: ID!, notification: NotificationInput): Notification
    deleteNotification(id: ID!): Boolean
    redigerMail(notification: NotificationInput): Notification
    envoyerMail(id: ID!): Boolean
  }
`;

module.exports = notificationTypeDefs;