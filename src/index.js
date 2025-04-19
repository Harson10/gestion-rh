const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const routes = require('./routes');
const { syncDatabase } = require('./models');
require('dotenv').config();

// Initialisation de l'application Express
const app = express();
app.use(express.json());
app.use(cors());

// Configuration des routes REST
app.use('/api', routes);

// Configuration de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Fonction pour démarrer le serveur
const startServer = async () => {
  // Synchronisation de la base de données
  await syncDatabase();

  // Configuration d'Apollo Server (GraphQL)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Démarrage d'Apollo Server
  await server.start();
  
  // Application d'Apollo Server comme middleware
  app.use('/graphql', 
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );
  
  // Démarrage du serveur Express
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`GraphQL disponible sur http://localhost:${PORT}/graphql`);
    console.log(`Swagger UI disponible sur http://localhost:${PORT}/api-docs`);
  });
};

// Démarrage du serveur
startServer().catch(error => {
  console.error('Erreur lors du démarrage du serveur:', error);
});