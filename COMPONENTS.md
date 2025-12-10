# 📁 Liste des composants
[Lien du figjam avec la structure des composantes](https://www.figma.com/board/5f6nKcREOkbnrHDTitKkID/WebAppComponents?node-id=0-1&t=neeOV0Z9zp852sp9-1)
## **HomeView**
- **Responsabilité** : Page d’accueil présentant l’introduction de l’expérience et un bouton pour commencer.
- **Navigation** : redirection vers `MuseumRoomsView`.
- **Props** : Aucune.
- **Événements émis** : Aucun.

---

## **MuseumRoomsView**
- **Responsabilité** : Page affichant toutes les salles du musée.  
  Inclut la `OptionBar` pour filtrer par recherche, tag et tri.
- **Navigation** : redirection vers `RoomView` selon la salle sélectionnée.
- **Props** : Aucune.
- **Événements émis** : Aucun.

---

## **MuseumGrid**
- **Responsabilité** : Grille responsive affichant l’ensemble des salles (via `MuseumCard`).
- **Props** :
  - `filters` (Object) — contient la recherche, les tags, le tri et le filtre de salle.
- **Événements émis** : Aucun (la navigation est gérée en interne).

---

## **MuseumCard**
- **Responsabilité** : Représente visuellement une salle (image, nom, description, nombre de mémoires).
- **Props** :
  - `room` (Object)
- **Événements émis** :
  - `click` — lorsqu’une salle est sélectionnée.

---

## **RoomView / MemoryRoom**
- **Responsabilité** : Page d’une salle spécifique.  
  Affiche :
  - la couleur/fond selon l’ID de la salle  
  - les filtres via `OptionBar`  
  - les mémoires via `MemorySwiper`  
  - un bouton permettant d’ajouter une nouvelle mémoire  
- **Navigation** :
  - clic sur une carte → ouvre `ModalView`
  - clic sur le bouton "+" → ouvre `ModalView` en mode formulaire
- **Props** : Aucune (utilise `this.$route.params.id`).
- **Événements émis** : Aucun.

---

## **MemorySwiper**
- **Responsabilité** : Carrousel interactif (Swiper) affichant toutes les mémoires filtrées de la salle sélectionnée.
- **Props** :
  - `filters` (Object) — recherche, tag, date, tri
- **Événements émis** : Aucun.

---

## **MemoryCard**
- **Responsabilité** : Affiche une mémoire individuelle :  
  - image  
  - titre  
  - tags  
  - date  
  - légende  
  - numéro de mémoire  
- **Props** :
  - `title` (String)
  - `image` (String)
  - `caption` (String)
  - `tags` (String)
  - `date` (String)
  - `memoryNumber` (String)
  - `bgColor` (String)
- **Événements émis** :
  - `click` — ouvre la mémoire dans `ModalView`.

---

## **ModalView**
- **Responsabilité** : Composant modal permettant :
  - d’afficher le détail d’une mémoire **ou**
  - de créer une nouvelle mémoire via un formulaire (`MemoryForm`)
- **Contenu variable selon l’interaction de l’utilisateur**.
- **Props** : dépend du contexte (détails mémoire ou formulaire).
- **Événements émis** :
  - `close` — fermeture du modal.

---

## **MemoryForm**
- **Responsabilité** : Formulaire permettant de créer une nouvelle mémoire dans la salle actuelle.  
  Champs : titre, image, description, tags, date, légende.
- **Props** : Aucune.
- **Événements émis** :
  - `submit` — ajoute la mémoire
  - `cancel` — retourne à la salle

---

## **BaseButton**
- **Responsabilité** : Bouton réutilisable avec différents styles (`primary`, `secondary`, `troisieme`, `quatrieme`, `icon`).
- **Props** :
  - `variant` (String)
  - `engrenage` (String)
- **Événements émis** :
  - `click`

---

## **OptionBar**
- **Responsabilité** : Barre de filtres dynamique permettant d'affiner la recherche dans :
  - les salles  
  - les mémoires  
- **Props** :
  - `search`, `room`, `tag`, `date`, `sort`
  - `roomOptions` (Array)
  - `tagOptions` (Array)
  - `showRoom` / `showSort` / `showDate` (Boolean)
- **Événements émis** :
  - `update:search`
  - `update:room`
  - `update:tag`
  - `update:date`
  - `update:sort`

---

## **AppHeader**
- **Responsabilité** : En-tête du site avec un slot pour le titre et un bouton icône (paramètres/engrenage).
- **Props** :
  - `title` (String)
  - `variantHeader` (string)
  - `visibleCog` (string)
- **Événements émis** : Aucun.

---

## **AppFooter**
- **Responsabilité** : Pied de page affiché sur toutes les pages.
- **Props** : Aucune.
- **Événements émis** : Aucun.
