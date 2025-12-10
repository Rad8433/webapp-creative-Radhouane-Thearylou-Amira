# Vos voyages en mémoires

## À propos du projet
Projet scolaire réalisé dans le cadre du cours Web 5 (582-511MO) au Cégep de Montmorency, programme Techniques d'intégration multimédia.

"Ce musée interactif permet aux utilisateurs de créer, organiser et explorer des souvenirs personnels à travers différentes salles thématiques."

## Équipe
- **Radhouane** - Chef de projet / Pinia, routes, pages
- **Amira** - Composantes, styles(css), trello
- **Thearylou** - Responsable du Design, validation  

## Description
"Vos voyages en mémoires" est un musée interactif organisé en différentes salles thématiques, comme les aventures, les vacances, la gastronomie ou les explorations urbaines.  
Les utilisateurs peuvent y sauvegarder leurs souvenirs de voyage, les organiser par thème, ajouter un **tag obligatoire** (ex. #plage, #montagne, #amis, #culture) et écrire une légende pour les accompagner.  
Chaque souvenir peut être modifié à tout moment, et toutes les données sont sauvegardées localement dans le navigateur de l’usager.  
Le système inclut une recherche par titre ainsi qu'un filtrage des souvenirs par date.

### Fonctionnalités principales
- Ajout de souvenirs (mémoires) dans différentes salles thématiques  
- **Tag obligatoire (un seul tag par mémoire)**  
- Ajout d’une légende descriptive  
- Modification des souvenirs existants  
- Organisation par thèmes visuels  
- Recherche par nom (fonctionne uniquement sur le **titre** du souvenir)  
- Filtrage des souvenirs par **date**  
- Sauvegarde locale dans le navigateur (LocalStorage)  
- Interface immersive illustrée  
- Architecture modulaire en composants Vue  

### Conditions obligatoires pour créer un souvenir
Pour pouvoir ajouter un nouveau mémoire, l'utilisateur doit obligatoirement fournir :

- **Titre**  
- **Image**  
- **Date**  
- **Tag (un seul)**  
- **Légende**  

Sans ces éléments, la création du souvenir n’est pas possible.

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
[Voir la démo](https://rad8433.github.io/webapp-creative-Radhouane-Thearylou-Amira/)

## Comment utiliser
1. Ouvrir l’application via la démo en ligne.  
2. Choisir une salle thématique (Vacances, Aventures, Gastronomie, etc.).  
3. Ajouter un souvenir en remplissant **tous les champs obligatoires** : titre, image, date, tag, légende.  
4. Modifier un souvenir à tout moment.  
5. Utiliser la barre de recherche pour retrouver un souvenir par **titre**.  
6. Filtrer les souvenirs par **date** selon vos besoins.  
7. Explorer vos salles thématiques pour revisiter vos voyages.

## Installation en local pour développement

```bash
# Cloner le projet
git clone [https://github.com/Rad8433/webapp-creative-Radhouane-Thearylou-Amira/tree/main]

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build
```

## Documentation additionnelle:

[Lien vers le cahier de charges](https://github.com/Rad8433/webapp-creative-Radhouane-Thearylou-Amira/blob/main/cahier_charges_memoires.md)

[Lien vers les maquettes Figma](https://www.figma.com/design/Rh88WsbMc4QIQthWICHuUe/Maquette-webapp?node-id=16-172&t=cZE3cz4W4AiX3Rzv-1)

[Lien vers le Trello/board de projet](https://trello.com/b/eMP37IFg/taches-projet-web-integrateur)  

[Lien vers le Figjam / Brainstorm](https://www.figma.com/board/vnLXvU6hgCiSru4Nfu6PXu/Brainstorm-webapp?node-id=0-1&t=0mpvvEb1GYNQi9qV-1)

## Remerciements et autres crédits

**Images prisent sur Unsplash**: Aaron Burden, Casey Horney, Jake Allison, Vaida Tamosauskaite, Ryan Spencer, Felix Rostig, John Towner, Wojciech Then, Upgraded Points, Kevin Charit, Pietro De Grandi,

## License
Projet éducatif - Cégep de Montmorency © 2024-2025
---

**Session**: Automne 2025

**Enseignante**: Marie-Michelle Ouellet

**Programme**: Techniques d'intégration multimédia (TIM)
