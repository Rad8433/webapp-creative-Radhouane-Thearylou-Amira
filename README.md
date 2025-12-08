# Vos voyages en mémoires

## À propos du projet
Projet scolaire réalisé dans le cadre du cours Web 5 (582-511MO) au Cégep de Montmorency, programme Techniques d'intégration multimédia.

"Ce musée interactif permet aux utilisateurs de créer, organiser et explorer des souvenirs personnels à travers différentes salles thématiques."

## Équipe
- **Radhouane Kordan** — Chef de projet + Architecture Vue
- **Amira Tounekti** — Design + Animations
- **Thearylou Lach** — Données + Validation

## Description
"Vos voyages en mémoires" est un musée interactif organisé en différentes salles thématiques, comme les aventures, les vacances, les explorations urbaines, les moments drôles ou encore la gastronomie.  
Les utilisateurs peuvent y ajouter leurs souvenirs de voyage, les organiser par thème, leur attribuer des tags (ex. #plage, #montagne, #culture, #amis) et écrire une légende pour mieux les décrire.  
Chaque souvenir peut être modifié à tout moment, et toutes les données sont sauvegardées directement dans le navigateur de l’usager, ce qui permet de conserver son musée personnel localement et en toute simplicité.

### Fonctionnalités principales
- Ajout de souvenirs personnalisés  
- Organisation des souvenirs dans différentes salles thématiques  
- Système de tags pour filtrer et classer les souvenirs  
- Ajout d’une légende pour chaque souvenir  
- Modification des souvenirs en tout temps  
- Sauvegarde locale dans le navigateur (LocalStorage)  
- Interface immersive illustrée (thèmes, images, catégories)  
- Architecture modulaire en composants Vue  

## Technologies utilisées
- **Vue.js 3**
- **Vite**
- **JavaScript / ES6**
- **LocalStorage**
- **CSS / Animations**
- **Figma** (maquettes & schémas)
- **Trello** (gestion de projet)

## Démo en ligne
*(À ajouter lorsque votre site sera déployé)*  
[Voir la démo](URL_DU_SITE)

## Comment utiliser
1. Ouvrir l'application via la démo en ligne.  
2. Choisir une salle thématique (Vacances, Aventures, Gastronomie, etc.).  
3. Ajouter un souvenir en entrant les informations demandées.  
4. Ajouter des tags et une légende pour faciliter la recherche.  
5. Modifier un souvenir à tout moment.  
6. Explorer vos salles thématiques pour revisiter vos souvenirs.

## Installation en local pour développement

```bash
# Cloner le projet
git clone [URL_DU_REPO]

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build
