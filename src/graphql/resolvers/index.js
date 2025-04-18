const employeResolvers = require('./employe');
const conseillerRHResolvers = require('./conseillerRH');
const dossierEmployeResolvers = require('./dossierEmploye');
const beneficiaireResolvers = require('./beneficiaire');
const compagnieAssuranceResolvers = require('./compagnieAssurance');
const notificationResolvers = require('./notification');

// Fusionner tous les resolvers
const mergeResolvers = (resolversArray) => {
  return resolversArray.reduce((acc, resolvers) => {
    // Fusion des Query
    if (resolvers.Query) {
      acc.Query = { ...acc.Query, ...resolvers.Query };
    }
    
    // Fusion des Mutation
    if (resolvers.Mutation) {
      acc.Mutation = { ...acc.Mutation, ...resolvers.Mutation };
    }
    
    // Fusion des autres types
    Object.keys(resolvers).forEach(key => {
      if (key !== 'Query' && key !== 'Mutation') {
        acc[key] = resolvers[key];
      }
    });
    
    return acc;
  }, { Query: {}, Mutation: {} });
};

module.exports = mergeResolvers([
  employeResolvers,
  conseillerRHResolvers,
  dossierEmployeResolvers,
  beneficiaireResolvers,
  compagnieAssuranceResolvers,
  notificationResolvers
]);