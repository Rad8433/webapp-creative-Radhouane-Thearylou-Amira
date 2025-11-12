# Liste des composants

## HomeView
- **Responsabilité** : Vue principale de la page d’accueil qui regroupe la structure générale de l'application.
- **Props** : Aucune.
- **Événements émis** : Aucun.

## MuseumGrid
- **Responsabilité** : Affiche une grille de cartes de musées.
- **Props** : `museums` (Array) - liste des musées à afficher.
- **Événements émis** : `selectMuseum` (id) - lorsqu’un musée est sélectionné.

## MuseumCard
- **Responsabilité** : Affiche les informations synthétiques d’un musée.
- **Props** : `museum` (Object) - données du musée.
- **Événements émis** : `click` - lorsqu’on clique sur la carte.

## MuseumRoomsView
- **Responsabilité** : Vue présentant les différentes salles d’un musée. Chaque salle regroupe plusieurs thèmes de mémoires liés à ce musée.
- **Props** : `museumId` (String) - identifiant du musée à afficher.
- **Événements émis** : Aucun.

## RoomView
- **Responsabilité** : Vue d'une salle spécifique d’un musée, affichant ses mémoires détaillées selon le thème associé.
- **Props** : `roomId` (String) - identifiant de la salle à afficher.
- **Événements émis** : Aucun.

## MemoryList
- **Responsabilité** : Liste des cartes de mémoire liées à un musée ou à une salle spécifique.
- **Props** : `memories` (Array) - liste des mémoires.
- **Événements émis** : `selectMemory` (id) - sélection d’une mémoire.

## MemoryCard
- **Responsabilité** : Affiche les informations synthétiques d’une mémoire.
- **Props** : `memory` (Object) - données de la mémoire.
- **Événements émis** : `click` - sélection de la mémoire.

## ModalView
- **Responsabilité** : Fenêtre modale/page pour formulaire ou détails.
- **Props** : `isOpen` (Boolean) - état d’ouverture.
- **Événements émis** : `close` - demande de fermeture.

## MemoryForm
- **Responsabilité** : Formulaire d’ajout ou de modification d’une mémoire.
- **Props** : `memory` (Object) - mémoire à modifier (optionnel).
- **Événements émis** : `submit` (memoryData) - soumission du formulaire, `cancel` - annulation.

## MemoryDetail
- **Responsabilité** : Affiche le détail complet d’une mémoire.
- **Props** : `memory` (Object) - mémoire à afficher.
- **Événements émis** : Aucun.

## BaseButton
- **Responsabilité** : Bouton générique affichant différentes options selon le contexte.
- **Props** : `context` (String) - contexte d’affichage des options.
- **Événements émis** : `click` - interaction utilisateur.

## OptionBar
- **Responsabilité** : Barre d’options pour filtrer et rechercher dans les musées, salles et mémoires.
- **Props** : `filters` (Object) - filtres actifs.
- **Événements émis** : `updateFilters` (filters) - modification des filtres.

## ImportData
- **Responsabilité** : Composant pour importer des données externes.
- **Props** : Aucune.
- **Événements émis** : `import` (data) - données importées.

## SaveData
- **Responsabilité** : Composant pour sauvegarder les données.
- **Props** : `data` (Object) - données à sauvegarder.
- **Événements émis** : `saved` - confirmation de sauvegarde.

## Header
- **Responsabilité** : Barre de navigation et titre principal de l’application.
- **Props** : `title` (String) - titre affiché dans l’en-tête.
- **Événements émis** : `navigate` (routeName) - événement de navigation déclenché par un clic utilisateur.

## Footer
- **Responsabilité** : Pied de page de l’application.
- **Props** : Aucune.
- **Événements émis** : Aucun.
