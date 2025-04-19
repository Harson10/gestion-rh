const { 
  Employe, 
  ConseillerRH, 
  DossierEmploye, 
  Beneficiaire, 
  CompagnieAssurance, 
  Notification 
} = require('../models');

const seedDatabase = async () => {
  try {
    console.log('Démarrage du remplissage de la base de données...');

    // Création des conseillers RH
    const conseillers = await ConseillerRH.bulkCreate([
      {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@gestion-rh.com'
      },
      {
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@gestion-rh.com'
      }
    ]);
    console.log('Conseillers RH créés');

    // Création des employés
    const employes = await Employe.bulkCreate([
      {
        nomEmploye: 'Dubois',
        prenomEmploye: 'Pierre',
        emailEmploye: 'pierre.dubois@email.com',
        telephone: '0123456789',
        dateEmbauche: new Date('2020-01-15'),
        adresse: '123 Rue de la Paix, Paris'
      },
      {
        nomEmploye: 'Leclerc',
        prenomEmploye: 'Marie',
        emailEmploye: 'marie.leclerc@email.com',
        telephone: '0987654321',
        dateEmbauche: new Date('2021-03-20'),
        adresse: '456 Avenue des Champs, Lyon'
      },
      {
        nomEmploye: 'Bernard',
        prenomEmploye: 'Thomas',
        emailEmploye: 'thomas.bernard@email.com',
        telephone: '0654321789',
        dateEmbauche: new Date('2022-05-10'),
        adresse: '789 Boulevard des Fleurs, Marseille'
      }
    ]);
    console.log('Employés créés');

    // Création des dossiers d'employé
    const dossiers = await DossierEmploye.bulkCreate([
      {
        dateMiseAJour: new Date(),
        validation: true,
        employeId: employes[0].id,
        conseillerId: conseillers[0].id
      },
      {
        dateMiseAJour: new Date(),
        validation: true,
        employeId: employes[1].id,
        conseillerId: conseillers[1].id
      },
      {
        dateMiseAJour: new Date(),
        validation: false,
        employeId: employes[2].id,
        conseillerId: conseillers[0].id
      }
    ]);
    console.log('Dossiers employés créés');

    // Création des bénéficiaires
    const beneficiaires = await Beneficiaire.bulkCreate([
      {
        nomBeneficiaire: 'Dubois',
        prenomBeneficiaire: 'Claire',
        relation: 'Épouse',
        dateAjout: new Date(),
        employeId: employes[0].id
      },
      {
        nomBeneficiaire: 'Dubois',
        prenomBeneficiaire: 'Lucas',
        relation: 'Fils',
        dateAjout: new Date(),
        employeId: employes[0].id
      },
      {
        nomBeneficiaire: 'Leclerc',
        prenomBeneficiaire: 'Paul',
        relation: 'Époux',
        dateAjout: new Date(),
        employeId: employes[1].id
      }
    ]);
    console.log('Bénéficiaires créés');

    // Création des compagnies d'assurance
    const compagnies = await CompagnieAssurance.bulkCreate([
      {
        nomCompagnie: 'AssurTout',
        emailCompagnie: 'contact@assurtout.com',
        telephoneCompagnie: '0123456789'
      },
      {
        nomCompagnie: 'PrevAssu',
        emailCompagnie: 'contact@prevassu.com',
        telephoneCompagnie: '0987654321'
      }
    ]);
    console.log('Compagnies d\'assurance créées');

    // Création des notifications
    await Notification.bulkCreate([
      {
        contenu: 'Mise à jour du dossier employé',
        objet: 'Mise à jour dossier',
        statut: 'Envoyée',
        dateEnvoi: new Date(),
        employeId: employes[0].id,
        conseillerId: conseillers[0].id
      },
      {
        contenu: 'Ajout d\'un nouveau bénéficiaire',
        objet: 'Nouveau bénéficiaire',
        statut: 'Envoyée',
        dateEnvoi: new Date(),
        employeId: employes[0].id,
        conseillerId: conseillers[0].id,
        compagnieId: compagnies[0].id
      },
      {
        contenu: 'Validation requise pour le dossier',
        objet: 'Validation dossier',
        statut: 'Non envoyée',
        dateEnvoi: null,
        employeId: employes[2].id,
        conseillerId: conseillers[0].id
      }
    ]);
    console.log('Notifications créées');

    console.log('Base de données remplie avec succès');
  } catch (error) {
    console.error('Erreur lors du remplissage de la base de données:', error);
  }
};

module.exports = { seedDatabase }; 