const { Beneficiaire, Employe } = require('../models');

// Récupérer tous les bénéficiaires
const getAllBeneficiaires = async (req, res) => {
  try {
    const beneficiaires = await Beneficiaire.findAll({
      include: [{ model: Employe }]
    });
    res.status(200).json(beneficiaires);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des bénéficiaires', 
      error: error.message 
    });
  }
};

// Récupérer un bénéficiaire par son ID
const getBeneficiaireById = async (req, res) => {
  try {
    const beneficiaire = await Beneficiaire.findByPk(req.params.id, {
      include: [{ model: Employe }]
    });
    
    if (!beneficiaire) {
      return res.status(404).json({ message: 'Bénéficiaire non trouvé' });
    }
    
    res.status(200).json(beneficiaire);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du bénéficiaire',
      error: error.message 
    });
  }
};

// Créer un nouveau bénéficiaire
const createBeneficiaire = async (req, res) => {
  try {
    console.log('Requête reçue pour créer un bénéficiaire:', req.body);
    
    // Extraire les données avec une validation plus permissive
    let { nomBeneficiaire, prenomBeneficiaire, relation, employeId } = req.body;
    
    // Permettre également les clés en camelCase ou PascalCase
    nomBeneficiaire = nomBeneficiaire || req.body.NomBeneficiaire || req.body.nom_beneficiaire || req.body.nombeneficiaire;
    prenomBeneficiaire = prenomBeneficiaire || req.body.PrenomBeneficiaire || req.body.prenom_beneficiaire || req.body.prenombeneficiaire;
    relation = relation || req.body.Relation;
    employeId = employeId || req.body.EmployeId || req.body.employe_id || req.body.employeid;
    
    // Si employeId est une chaîne, essayer de la convertir en nombre
    if (typeof employeId === 'string') {
      employeId = parseInt(employeId, 10);
    }
    
    console.log('Valeurs extraites après normalisation:');
    console.log('nomBeneficiaire:', nomBeneficiaire);
    console.log('prenomBeneficiaire:', prenomBeneficiaire);
    console.log('relation:', relation);
    console.log('employeId:', employeId);
    
    if (!nomBeneficiaire || !prenomBeneficiaire || !relation || !employeId) {
      console.log('Validation échouée - champs manquants:');
      if (!nomBeneficiaire) console.log('nomBeneficiaire manquant');
      if (!prenomBeneficiaire) console.log('prenomBeneficiaire manquant');
      if (!relation) console.log('relation manquante');
      if (!employeId) console.log('employeId manquant');
      
      return res.status(400).json({ 
        message: 'Tous les champs obligatoires doivent être fournis',
        requete_recue: req.body,
        champs_attendus: {
          nomBeneficiaire: "string",
          prenomBeneficiaire: "string",
          relation: "string",
          employeId: "number"
        } 
      });
    }
    
    // Vérifier si l'employé existe
    const employe = await Employe.findByPk(employeId);
    if (!employe) {
      console.log('Employé non trouvé avec ID:', employeId);
      return res.status(400).json({ message: 'Employé non trouvé' });
    }
    
    const nouveauBeneficiaire = await Beneficiaire.create({
      nomBeneficiaire,
      prenomBeneficiaire,
      relation,
      dateAjout: new Date(),
      employeId
    });
    
    console.log('Bénéficiaire créé avec succès:', nouveauBeneficiaire.toJSON());
    res.status(201).json(nouveauBeneficiaire);
  } catch (error) {
    console.error('Erreur lors de la création du bénéficiaire:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création du bénéficiaire',
      error: error.message 
    });
  }
};

// Mettre à jour un bénéficiaire
const updateBeneficiaire = async (req, res) => {
  try {
    console.log('Requête reçue pour mettre à jour un bénéficiaire:', req.body);
    const beneficiaire = await Beneficiaire.findByPk(req.params.id);
    
    if (!beneficiaire) {
      return res.status(404).json({ message: 'Bénéficiaire non trouvé' });
    }
    
    await beneficiaire.update(req.body);
    
    console.log('Bénéficiaire mis à jour avec succès:', beneficiaire.toJSON());
    res.status(200).json(beneficiaire);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du bénéficiaire:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du bénéficiaire',
      error: error.message 
    });
  }
};

// Supprimer un bénéficiaire
const deleteBeneficiaire = async (req, res) => {
  try {
    const beneficiaire = await Beneficiaire.findByPk(req.params.id);
    
    if (!beneficiaire) {
      return res.status(404).json({ message: 'Bénéficiaire non trouvé' });
    }
    
    await beneficiaire.destroy();
    
    console.log('Bénéficiaire supprimé avec succès. ID:', req.params.id);
    res.status(200).json({ message: 'Bénéficiaire supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du bénéficiaire:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du bénéficiaire',
      error: error.message 
    });
  }
};

module.exports = {
  getAllBeneficiaires,
  getBeneficiaireById,
  createBeneficiaire,
  updateBeneficiaire,
  deleteBeneficiaire
}; 