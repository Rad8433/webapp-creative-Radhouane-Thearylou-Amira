# Brief de Projet - À fournir à l'équipe testeuse

**Nom de votre équipe :** [l'équipe voyageur]  
**Nom du projet :** [Vos voyages en mémoires]  
**Type de projet :** [Mémoires interactives]  
**Date :** 3 décembre 2025

---

## 🔗 Accès au projet

**URL du site déployé :**

- Si GitHub: [https://rad8433.github.io/webapp-creative-Radhouane-Thearylou-Amira/]


## 🔗 Accès à votre Trello pour l'ajout de fiches de bogues

- À partir de Trello, Cliquez sur *Partager* en haut à droite de votre tableau.
- Ensuite, *Créer un lien*.
- Finalement, *Copier le lien* et l'amener ici (puis supprimer les instructions sous le titre de la section actuelle).
Trello: [https://trello.com/invite/b/68e6b3d6b05f115a8e2d55a5/ATTI77736540de67a22091cd465f8faab0c69BC01204/taches-projet-web-integrateur]

---

## 📖 Description du projet

### Concept général

[Décrivez en 2-3 phrases ce que fait votre projet]

**Exemple (Mémoires) :**

"Vos voyages en mémoires est une application qui permet de créer et organiser ses mémoires personnelles de voyages dans 6 salles thématiques. Les utilisateurs peuvent ajouter des photos, des descriptions et des tags à leurs souvenirs."

---

## ✅ Fonctionnalités implémentées (DONC À TESTER)

### PRIORITÉ HAUTE (fonctionnalités principales)

#### Pour "Mémoires interactives"

Remplacer le [X] par le nombre réel de votre projet

- [ ] Navigation entre [6] salles thématiques
- [ ] Ajout de mémoire (formulaire complet)
- [ ] Édition de mémoire existante
- [ ] Suppression de mémoire
- [ ] Upload d'images (limite : [2] MB)
- [ ] Système de tags
- [ ] Recherche par mot-clé
- [ ] Filtre par tag
- [ ] Filtre par salle



### PRIORITÉ MOYENNE

- [ ] Responsive (mobile, tablette, desktop)
- [ ] [Autre fonctionnalité] (à vous de mentionner les priorités moyennes à tester pour votre projet)

### PRIORITÉ BASSE (bonus si temps)

- [ ] [Fonctionnalité bonus] (à vous de mentionner les priorités basses à tester pour votre projet)

---

## ❌ Fonctionnalités NON implémentées

**Important : Ne PAS reporter ces éléments comme bugs**

S'il y a des choses qui n'ont pas été faites dans votre projet et qui ne sont donc à ne pas tester, veuillez les lister ici pour laisser savoir à vos testeurs plutôt que de les faires chercher pour rien.

Par exemple:

- ❌ [Animations GSAP (optionnelles - pas faites)]
- ❌ [Authentification]
- ❌ [Son d'ambiance]
- ❌ [Mode sombre]
- ❌ [Accessibilité]
- ❌ [Firebase]
- ❌ [Partage Social]


---

## 🧪 Cas de test suggérés

Suggérez au testeurs de tester des cas précis dans votre appli. Listez-les cas ici.

### Test 1 : [Remplir un formulaire]

**Objectif :** Vérifier qu'on est capable ajouter une carte mémoire si tous les éléments requis sont entrés/validés

**Étapes :**

1. [cliquer sur le bouton + pour ajouter une carte]
2. [Remplir à moitié le formulaire pour déclancher l'erreur]
3. [Ajouter une image d'une grande taille ]
4. [Remplir au complet et cliquer sur ajouter pour ajouter une carte et revenir à la page mémoire]


**Résultat attendu :**
[Demande de remplire les éléments requis ou de mettre une image d'une taille accepté]

---

### Test 2 : [Modifier une mémoire]

**Objectif :** [Modification d'une carte]

**Étapes :**

1. [Cliquer sur une carte de mémoire.]
2. [Une fois dans la page de la carte détaillée, cliquer sur le bouton crayon.]
3. [Modifié les champs de textes ou l'image]
4. [Une fois terminé, cliquer sur l'icone disque dure pour sauvegardé]
5. [Quitter la carte détaillé pour voir la modification appliqué.]
6. [Refaire une autre modification sur la même carte modifiée]

**Résultat attendu :**
[Les informations changés carte de mémoire ]

---

### Test 3 : Responsive mobile

**Objectif :** Vérifier que le site fonctionne sur mobile

**Étapes :**

1. Ouvrir DevTools (F12)
2. Activer le mode device (icône téléphone/tablette)
3. Sélectionner "iPhone SE" ou 375px
4. Tester les fonctionnalités principales

**Résultat attendu :**

- Tout s'affiche correctement (pas de débordement)
- Navigation fonctionne
- Boutons sont assez grands pour être cliqués

---

## 🐛 Problèmes connus (Ne PAS les reporter)

**Ces problèmes sont déjà identifiés et documentés :**

- [Images très lourdes (> 10 MB) peuvent ralentir le chargement]
- [Safari : pas testé (pas d'accès Mac)]
- [Les images ne sont pas affichées]
- [Un "hard refresh" fait une erreur 404]
- [L'accessibilité avec le bouton Tab ne fonctionne pas sur le choix des salles et sur les cartes de mémoires]
- [Le header n'est pas responsive]
- [La carte de mémoire détaillé et le formulaire ne sont pas responsives]

---

## 🎯 Zones à tester en priorité

**Nous aimerions que vous testiez particulièrement :**

1. [Création d'une carte]
2. [La version mobile (nous l'avons peu testée)]
3. [Supprimer une carte]
4. [Filtre]
5. [Filtrage des cartes modifiées]
6. [Effacer le LocalStorage après d'avoir ajouter un mémoire.]
7. [Description avec plus que de 1000 caractères]

---

## 📱 Appareils et navigateurs testés par nous

**Ce que nous avons déjà testé :**

- ✅ Chrome (Desktop)
- ✅ Firefox (Desktop)
- ⚠️ Mobile (via DevTools uniquement, pas sur vrai téléphone)
- ❌ Safari (pas d'accès)
- ❌ Tablette réelle

**Ce que vous pourriez tester en plus :**

- Safari (si vous avez un Mac/iPhone)
- Sur vos vrais téléphones
- Sur vraie tablette

---



---

## 📞 Contact

**Pour questions urgentes ou clarifications :**

- Teams : @[Radhouane Kordan]
- Email : [1804433@cmontmorency.qc.ca]

**Disponibilité :**

- Réponse rapide sur Teams ou par courriel pendant les heures de travail

---

## 💬 Notes additionnelles

[Toute autre information utile pour les testeurs]
L'icon de l'engrennage, c'est le bouton pour supprimer le LocalStorage.

