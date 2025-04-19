const { CompagnieAssurance } = require('../models');

// Récupérer toutes les compagnies d'assurance
const getAllCompagnies = async (req, res) => {
  try {
    const compagnies = await CompagnieAssurance.findAll();
    res.status(200).json(compagnies);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des compagnies d\'assurance', 
      error: error.message 
    });
  }
};

// Récupérer une compagnie d'assurance par son ID
const getCompagnieById = async (req, res) => {
  try {
    const compagnie = await CompagnieAssurance.findByPk(req.params.id);
    
    if (!compagnie) {
      return res.status(404).json({ message: 'Compagnie d\'assurance non trouvée' });
    }
    
    res.status(200).json(compagnie);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de la compagnie d\'assurance',
      error: error.message 
    });
  }
};

// Créer une nouvelle compagnie d'assurance
const createCompagnie = async (req, res) => {
  try {
    const { nomCompagnie, emailCompagnie, telephoneCompagnie } = req.body;
    
    if (!nomCompagnie || !emailCompagnie) {
      return res.status(400).json({ 
        message: 'Le nom et l\'email de la compagnie sont obligatoires' 
      });
    }
    
    const nouvelleCompagnie = await CompagnieAssurance.create({
      nomCompagnie,
      emailCompagnie,
      telephoneCompagnie
    });
    
    res.status(201).json(nouvelleCompagnie);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la création de la compagnie d\'assurance',
      error: error.message 
    });
  }
};

// Mettre à jour une compagnie d'assurance
const updateCompagnie = async (req, res) => {
  try {
    const compagnie = await CompagnieAssurance.findByPk(req.params.id);
    
    if (!compagnie) {
      return res.status(404).json({ message: 'Compagnie d\'assurance non trouvée' });
    }
    
    await compagnie.update(req.body);
    
    res.status(200).json(compagnie);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour de la compagnie d\'assurance',
      error: error.message 
    });
  }
};

// Supprimer une compagnie d'assurance
const deleteCompagnie = async (req, res) => {
  try {
    const compagnie = await CompagnieAssurance.findByPk(req.params.id);
    
    if (!compagnie) {
      return res.status(404).json({ message: 'Compagnie d\'assurance non trouvée' });
    }
    
    await compagnie.destroy();
    
    res.status(200).json({ message: 'Compagnie d\'assurance supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression de la compagnie d\'assurance',
      error: error.message 
    });
  }
};

module.exports = {
  getAllCompagnies,
  getCompagnieById,
  createCompagnie,
  updateCompagnie,
  deleteCompagnie
}; 