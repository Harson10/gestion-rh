# Application de Gestion RH

Application de gestion des ressources humaines permettant la mise à jour des dossiers d'employés, la gestion des bénéficiaires et l'envoi de notifications.

## Fonctionnalités

- Gestion des employés et de leurs informations personnelles
- Gestion des bénéficiaires des employés
- Traitement des demandes de mise à jour de dossier
- Envoi de notifications aux employés et aux compagnies d'assurance
- API REST et GraphQL

## Prérequis

- Node.js (v14 ou supérieur)
- PostgreSQL
- npm

## Installation

1. Cloner le dépôt
```
git clone <URL_DU_DEPOT>
cd gestion-rh
```

2. Installer les dépendances
```
npm install
```

3. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet avec les variables suivantes :
```
PORT=3000
DB_NAME=grh_db
DB_USER=grh_user
DB_PASSWORD=password123
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
NODE_ENV=development
```

4. Créer la base de données PostgreSQL
```sql
CREATE USER grh_user WITH PASSWORD 'password123';
CREATE DATABASE grh_db;
GRANT ALL PRIVILEGES ON DATABASE grh_db TO grh_user;
```

5. Initialiser la base de données
```
npm run init-db
```

## Démarrage

Pour démarrer le serveur en mode développement :
```
npm run dev
```

Pour démarrer le serveur en mode production :
```
npm start
```

## Endpoints API

### API REST

- `GET /api` - Page d'accueil de l'API
- `GET /api-docs` - Documentation Swagger de l'API

#### Employés
- `GET /api/employes` - Liste de tous les employés
- `GET /api/employes/:id` - Détails d'un employé
- `POST /api/employes` - Créer un nouvel employé
- `PUT /api/employes/:id` - Mettre à jour un employé
- `DELETE /api/employes/:id` - Supprimer un employé

#### Bénéficiaires
- `GET /api/beneficiaires` - Liste de tous les bénéficiaires
- `GET /api/beneficiaires/:id` - Détails d'un bénéficiaire
- `POST /api/beneficiaires` - Créer un nouveau bénéficiaire
- `PUT /api/beneficiaires/:id` - Mettre à jour un bénéficiaire
- `DELETE /api/beneficiaires/:id` - Supprimer un bénéficiaire

#### Dossiers d'employés
- `GET /api/dossiers` - Liste de tous les dossiers
- `GET /api/dossiers/:id` - Détails d'un dossier
- `POST /api/dossiers` - Créer un nouveau dossier
- `PUT /api/dossiers/:id` - Mettre à jour un dossier
- `DELETE /api/dossiers/:id` - Supprimer un dossier

### API GraphQL

L'API GraphQL est disponible à l'adresse : `http://localhost:3000/graphql`

## Technologies utilisées

- Node.js
- Express
- GraphQL (Apollo Server)
- Sequelize (ORM)
- PostgreSQL
- Swagger 