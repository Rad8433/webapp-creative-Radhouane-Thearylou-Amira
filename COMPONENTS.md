# Components

## HomeView
**Responsabilité :**  
Vue principale affichant la liste des musées et coordonnant les actions de recherche et de filtrage.  
Connecte les composants `OptionBar`, `MuseumGrid` et `Footer`.

**Props :**  
- Aucune  

**Événements émis :**  
- Aucun  

---

## MuseumGrid
**Responsabilité :**  
Affiche une grille de cartes de musées selon les résultats de recherche et de filtrage.

**Props :**  
- `Museums: Array` – liste des objets musée à afficher.  

**Événements émis :**  
- `SelectMuseum(id: String)` – émis lorsqu’une carte de musée est sélectionnée.  

---

## MuseumCard
**Responsabilité :**  
Représente un musée unique (image, nom, courte description).

**Props :**  
- `Museum: Object` – données d’un musée (titre, description, image, etc.).  

**Événements émis :**  
- `Click(id: String)` – lorsque l’utilisateur clique sur la carte du musée.  

---

## ViewMuseum
**Responsabilité :**  
Affiche les détails d’un musée sélectionné ainsi que ses souvenirs associés.  
Gère les modales pour l’ajout et la visualisation des souvenirs.

**Props :**  
- `Museum: Object` – musée actuellement sélectionné.  

**Événements émis :**  
- `AddMemory()` – lorsque l’utilisateur souhaite créer un nouveau souvenir.  

---

## MemoryList
**Responsabilité :**  
Affiche la liste de tous les souvenirs liés à un musée.  
Réagit aux filtres et à la recherche.

**Props :**  
- `Memories: Array` – liste des objets souvenir à afficher.  

**Événements émis :**  
- `OpenMemory(id: String)` – lorsqu’un souvenir est sélectionné.  
- `AddMemory()` – lorsqu’un nouvel ajout de souvenir est demandé.  

---

## MemoryCard
**Responsabilité :**  
Affiche un résumé d’un souvenir (titre, date, extrait du contenu).

**Props :**  
- `Memory: Object` – données du souvenir à afficher.  

**Événements émis :**  
- `Click(id: String)` – lorsque la carte du souvenir est sélectionnée.  

---

## MemoryDetail
**Responsabilité :**  
Affiche les détails complets d’un souvenir (contenu, date, auteur, image, etc.).

**Props :**  
- `Memory: Object` – données du souvenir à afficher.  

**Événements émis :**  
- `Close()` – lorsqu’on ferme la vue détaillée.  

---

## MemoryForm
**Responsabilité :**  
Formulaire permettant d’ajouter ou de modifier un souvenir.  
Généralement affiché dans une modale.

**Props :**  
- `Memory: Object` *(optionnel)* – données existantes d’un souvenir (pour la modification).  

**Événements émis :**  
- `Submit(memory: Object)` – lors de la soumission du formulaire.  
- `Cancel()` – lorsque l’utilisateur annule l’opération.  

---

## Modal
**Responsabilité :**  
Composant générique de modale utilisé pour afficher des formulaires, des détails ou des dialogues.

**Props :**  
- `Visible: Boolean` – contrôle la visibilité de la modale.  
- `Title: String` *(optionnel)* – titre de la modale.  

**Événements émis :**  
- `Close()` – lorsque la modale est fermée.  

---

## BaseButton
**Responsabilité :**  
Bouton réutilisable et contextuel.  
Peut se comporter comme un simple bouton ou afficher un menu d’options selon le contexte.

**Props :**  
- `Label: String` – texte affiché sur le bouton.  
- `Type: String` – style visuel (`primary`, `secondary`, `danger`, etc.).  
- `Icon: String` *(optionnel)* – icône à afficher.  
- `Options: Array` *(optionnel)* – liste d’options du menu déroulant (`[{ id, label }]`).  
- `Context: String` *(optionnel)* – contexte d’utilisation (`Museum`, `Memory`, `Header`, etc.).  

**Événements émis :**  
- `Click()` – lorsque le bouton est cliqué (sans menu).  
- `Select(option: Object)` – lorsqu’une option du menu est sélectionnée.  

---

## OptionBar
**Responsabilité :**  
Barre d’options centrale permettant la recherche et le filtrage des musées et des souvenirs.  
Agit comme le contrôleur principal des entrées utilisateur pour filtrer les contenus affichés.

**Props :**  
- `SearchQuery: String` *(optionnel)* – texte de recherche actuel.  
- `Filters: Object` *(optionnel)* – paramètres de filtre actifs.  

**Événements émis :**  
- `Search(query: String)` – lorsqu’une recherche est effectuée.  
- `Filter(filters: Object)` – lorsqu’un filtre est appliqué ou modifié.  

---

## ImportData
**Responsabilité :**  
Gère l’importation de données externes (ex. fichiers JSON).

**Props :**  
- Aucune  

**Événements émis :**  
- `DataImported(data: Object | Array)` – lorsque les données ont été importées avec succès.  

---

## SaveData
**Responsabilité :**  
Gère l’enregistrement ou l’exportation des données de l’application.

**Props :**  
- `Data: Object | Array` – données à exporter.  

**Événements émis :**  
- `DataSaved()` – lorsque les données ont été enregistrées ou exportées.  

---

## Footer
**Responsabilité :**  
Affiche le bas de page de l’application (informations, liens, copyright, etc.).

**Props :**  
- Aucune  

**Événements émis :**  
- Aucun  

---
