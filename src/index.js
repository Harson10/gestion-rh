const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const routes = require('./routes');
const { syncDatabase } = require('./models');

// Initialisation de l'application Express
const app = express();
app.use(express.json());

// Configuration des routes REST
app.use('/api', routes);

// Configuration de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Configuration d'Apollo Server (GraphQL)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { req };
  },
});

// Fonction pour démarrer le serveur
const startServer = async () => {
  // Synchronisation de la base de données
  await syncDatabase();
  
  // Démarrage d'Apollo Server
  await server.start();
  
  // Application d'Apollo Server comme middleware
  server.applyMiddleware({ app, path: '/graphql' });
  
  // Démarrage du serveur Express
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`GraphQL disponible sur http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`Swagger UI disponible sur http://localhost:${PORT}/api-docs`);
  });
};

// Démarrage du serveur
startServer().catch(error => {
  console.error('Erreur lors du démarrage du serveur:', error);
});