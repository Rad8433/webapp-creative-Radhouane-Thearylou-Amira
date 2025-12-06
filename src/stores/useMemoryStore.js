import { defineStore } from "pinia"; // Importation de Pinia pour la gestion d'état
import data from "@/data/memoires.json"; // Importation des données initiales

// Fonction utilitaire pour nettoyer le tag et le convertir en string
function normalizeTagInput(input) {
  // input peut être string ou array
  if (!input) return ""; // gérer null ou undefined
  // prendre le premier élément si c'est un tableau
  if (Array.isArray(input)) input = input[0];
  return (input ?? "").toString().trim();
}

// Fonction utilitaire pour sauvegarder dans le LocalStorage
function saveToLocalStorage(memories) {
  localStorage.setItem("memories", JSON.stringify(memories));
}

// Fonction utilitaire pour charger depuis le LocalStorage
function loadFromLocalStorage() {
  const stored = localStorage.getItem("memories");
  return stored ? JSON.parse(stored) : null;
}

// Définition du store Pinia pour la gestion des mémoires
export const useMemoryStore = defineStore("memory", {
  state: () => {
    // objet pour compter les mémoires par roomId
    const memoriesByRoomCount = {};

    // on charge les mémoires depuis le LocalStorage si disponible
    const localMemories = loadFromLocalStorage();

    // on initialise les mémoires
    const memories = localMemories
      ? localMemories
      : data.memoires.map((souvenir) => {
          // transformation des données initiales
          const roomId = souvenir.roomId; // obtenir le roomId
          // incrémenter le compteur de mémoires pour cette roomId
          memoriesByRoomCount[roomId] = (memoriesByRoomCount[roomId] || 0) + 1;
          const tag = normalizeTagInput(souvenir.tagsSouvenir); // normaliser le tag
          return {
            // créer l'objet mémoire
            id: Date.now().toString() + Math.random(),
            roomId,
            title: souvenir.titreSouvenir,
            image: souvenir.imageSouvenir,
            caption: souvenir.descriptionSouvenir,
            date: souvenir.dateSouvenir,
            tag,
            memoryNumber: `Mémoire ${memoriesByRoomCount[roomId]}`,
            createdAt: new Date().toISOString(),
          };
        });

    // retour de l'état initial
    return {
      memories,
      filters: {
        search: "",
        tag: null,
        date: null,
      },
    };
  },

  getters: {
    // obtenir les mémoires par roomId sans filtre
    memoriesByRoom: (state) => (roomId) =>
      state.memories.filter((m) => m.roomId === roomId),
    // obtenir les mémoires par roomId avec filtres appliqués
    filteredMemoriesByRoom: (state) => (roomId) => {
      return (
        state.memories
          .filter((m) => m.roomId === roomId) // filtrer par roomId
          .filter((m) => {
            // appliquer les filtres de recherche et de tag
            const q = (state.filters.search || "").toLowerCase(); // requête de recherche en minuscules
            const title = m.title.toLowerCase();
            const caption = m.caption?.toLowerCase() || "";
            const matchesSearch =
              !q || title.startsWith(q) || caption.startsWith(q); // correspondance de la recherche
            const matchesTag = // correspondance du tag
              !state.filters.tag ||
              state.filters.tag === "all" ||
              m.tag === state.filters.tag;
            return matchesSearch && matchesTag; // retourner vrai si les deux correspondent
          })
          // tri des mémoires selon le filtre de date
          .sort((a, b) => {
            if (state.filters.date === "recent")
              return new Date(b.date) - new Date(a.date);
            if (state.filters.date === "old")
              return new Date(a.date) - new Date(b.date);
            return a.memoryNumber.localeCompare(b.memoryNumber);
          })
      );
    },
  },

  actions: {
    // actions pour mettre à jour les filtres
    setSearch(query) {
      this.filters.search = query;
    },
    // mettre à jour le filtre de tag
    setTag(tag) {
      this.filters.tag = tag;
    },
    // mettre à jour le filtre de date
    setDateOrder(order) {
      const allowed = ["recent", "old", null];
      if (allowed.includes(order)) this.filters.date = order;
    },
    // renuméroter les mémoires dans une room donnée
    renumberRoom(roomId) {
      const roomMemories = this.memories
        .filter((m) => m.roomId === roomId)
        .sort(
          (a, b) =>
            new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date)
        );
      roomMemories.forEach((m, index) => {
        m.memoryNumber = `Mémoire ${index + 1}`;
      });
    },
    // créer une nouvelle mémoire
    createMemory(raw) {
      const tag = normalizeTagInput(raw.tag ?? raw.tags); // gérer les deux cas de tag
      const memory = {
        // création de la nouvelle mémoire
        id: Date.now().toString(),
        roomId: raw.roomId,
        title: raw.title.trim(),
        image: raw.image,
        caption: raw.caption.trim(),
        date: raw.date,
        tag,
        memoryNumber: "",
        createdAt: new Date().toISOString(),
      };
      this.memories.push(memory); // ajouter la mémoire au store
      this.renumberRoom(raw.roomId); // renuméroter les mémoires dans la room
      saveToLocalStorage(this.memories); // sauvegarde dans le LocalStorage la creation d'une memoire.
    },
    // Mettre à jour une mémoire existante
    updateMemory(id, updates) {
      // Trouver l'index de la mémoire à mettre à jour
      const index = this.memories.findIndex((m) => m.id === id);
      if (index === -1) return; // mémoire non trouvée

      const old = this.memories[index]; // mémoire existante
      const oldRoomId = old.roomId; // conserver l'ancien roomId pour la renumérotation

      const newTagRaw =
        updates.tag !== undefined ? updates.tag : updates.tags ?? old.tag; // gérer les deux cas de tag

      // Préparer les mises à jour en nettoyant les entrées
      const safeUpdates = {
        title: updates.title?.trim() ?? old.title,
        caption: updates.caption?.trim() ?? old.caption,
        date: updates.date ?? old.date,
        image: updates.image ?? old.image,
        tag: normalizeTagInput(newTagRaw),
        roomId: updates.roomId ?? old.roomId,
        updatedAt: new Date().toISOString(),
      };

      // Appliquer les mises à jour
      this.memories[index] = { ...old, ...safeUpdates };

      // Renuméroter les mémoires si le roomId a changé
      if (safeUpdates.roomId !== oldRoomId) {
        this.renumberRoom(oldRoomId);
        this.renumberRoom(safeUpdates.roomId);
      } else {
        this.renumberRoom(safeUpdates.roomId);
      }

      saveToLocalStorage(this.memories); // sauvegarde dans le LocalStorage de l'edition d'une memoire.
    },
    // Supprimer une mémoire par son ID
    deleteMemory(id) {
      // Trouver la mémoire à supprimer
      const memory = this.memories.find((m) => m.id === id);
      if (!memory) return; // mémoire non trouvée
      const roomId = memory.roomId; // conserver le roomId pour la renumérotation
      this.memories = this.memories.filter((m) => m.id !== id); // supprimer la mémoire
      this.renumberRoom(roomId); // renuméroter les mémoires dans la room
      saveToLocalStorage(this.memories); // sauvegarde dans le LocalStorage de la suppression d'une memoire.
    },
  },
});
