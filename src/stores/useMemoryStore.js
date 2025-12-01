// src/stores/useMemoryStore.js
import { defineStore } from "pinia";
import data from "@/data/memoires.json";

// Fonction utilitaire pour nettoyer le tag et le convertir en string
function normalizeTagInput(input) {
  if (!input) return "";
  // si c’est un tableau, on garde juste le premier
  if (Array.isArray(input)) {
    input = input[0];
  }
  return (input ?? "").toString().trim();
}

export const useMemoryStore = defineStore("memory", {
  state: () => {
    // sert à compter le nombre de mémoires par salle
    const memoriesByRoomCount = {};

    // on transforme les données du JSON en objets mémoire utilisés dans l'app
    const memories = data.memoires.map((souvenir) => {
      const roomId = souvenir.roomId;
      memoriesByRoomCount[roomId] = (memoriesByRoomCount[roomId] || 0) + 1;

      // on récupère un seul tag propre
      const tag = normalizeTagInput(souvenir.tagsSouvenir);

      return {
        id: Date.now().toString() + Math.random(), // id unique
        roomId, // id de la salle
        title: souvenir.titreSouvenir, // titre de la mémoire
        image: souvenir.imageSouvenir, // image de la mémoire
        caption: souvenir.descriptionSouvenir, // petite légende
        date: souvenir.dateSouvenir, // date de la mémoire
        tag, // tag en string
        memoryNumber: `Memory ${memoriesByRoomCount[roomId]}`, // numéro de mémoire dans la salle
        createdAt: new Date().toISOString(), // date de création dans l’app
      };
    });

    return {
      // toutes les mémoires chargées au démarrage
      memories,
      // filtres utilisés par les composants (swiper, etc.)
      filters: {
        search: "", // texte de recherche
        tag: null, // tag sélectionné
        date: null, // 'recent' | 'old' | null
      },
    };
  },

  getters: {
    // renvoie toutes les mémoires d'une salle précise
    memoriesByRoom: (state) => (roomId) =>
      state.memories.filter((m) => m.roomId === roomId),

    // renvoie les mémoires d'une salle avec les filtres appliqués
    filteredMemoriesByRoom: (state) => (roomId) => {
      return (
        state.memories
          // on garde seulement les mémoires de cette salle
          .filter((m) => m.roomId === roomId)
          // on applique les filtres recherche + tag
          .filter((m) => {
            const q = (state.filters.search || "").toLowerCase();
            const title = m.title.toLowerCase();
            const caption = m.caption?.toLowerCase() || "";

            const matchesSearch =
              !q || title.startsWith(q) || caption.startsWith(q);

            const matchesTag =
              !state.filters.tag ||
              state.filters.tag === "all" ||
              m.tag === state.filters.tag;

            return matchesSearch && matchesTag;
          })
          // on gère le tri par date ou par numéro de mémoire
          .sort((a, b) => {
            if (state.filters.date === "recent") {
              return new Date(b.date) - new Date(a.date);
            }
            if (state.filters.date === "old") {
              return new Date(a.date) - new Date(b.date);
            }
            // par défaut on trie par memoryNumber
            return a.memoryNumber.localeCompare(b.memoryNumber);
          })
      );
    },
  },

  actions: {
    // met à jour le texte de recherche
    setSearch(query) {
      this.filters.search = query;
    },

    // met à jour le tag sélectionné
    setTag(tag) {
      this.filters.tag = tag;
    },

    // met à jour l’ordre par date
    setDateOrder(order) {
      const allowed = ["recent", "old", null];
      if (allowed.includes(order)) {
        this.filters.date = order;
      }
    },

    // renumérote toutes les mémoires d'une salle en fonction de leur date de création
    renumberRoom(roomId) {
      const roomMemories = this.memories
        .filter((m) => m.roomId === roomId)
        .sort((a, b) => {
          const da = new Date(a.createdAt || a.date);
          const db = new Date(b.createdAt || b.date);
          return da - db;
        });

      roomMemories.forEach((m, index) => {
        m.memoryNumber = `Memory ${index + 1}`;
      });
    },

    // crée une nouvelle mémoire à partir des données du formulaire
    createMemory(raw) {
      // accepte raw.tag ou raw.tags
      const tag = normalizeTagInput(raw.tag ?? raw.tags);

      const memory = {
        id: Date.now().toString(), // nouvel id
        roomId: raw.roomId, // salle cible
        title: raw.title.trim(), // titre propre
        image: raw.image, // image en base64
        caption: raw.caption.trim(), // description propre
        date: raw.date, // date choisie dans le form
        tag, // tag en string
        memoryNumber: "", // sera recalculé après
        createdAt: new Date().toISOString(),
      };

      // on ajoute la mémoire dans le tableau
      this.memories.push(memory);
      // on renumérote les mémoires de cette salle
      this.renumberRoom(raw.roomId);
    },

    // met à jour une mémoire existante
    updateMemory(id, updates) {
      const index = this.memories.findIndex((m) => m.id === id);
      if (index === -1) return;

      const old = this.memories[index];
      const oldRoomId = old.roomId;

      // on récupère la nouvelle valeur brute du tag (tag ou tags)
      const newTagRaw =
        updates.tag !== undefined ? updates.tag : updates.tags ?? old.tag;

      // on prépare les nouvelles valeurs en gardant l’ancienne si rien n’est envoyé
      const safeUpdates = {
        title: updates.title?.trim() ?? old.title,
        caption: updates.caption?.trim() ?? old.caption,
        date: updates.date ?? old.date,
        image: updates.image ?? old.image,
        tag: normalizeTagInput(newTagRaw),
        roomId: updates.roomId ?? old.roomId,
        updatedAt: new Date().toISOString(),
      };

      // on fusionne l’ancienne mémoire avec les nouvelles valeurs
      this.memories[index] = { ...old, ...safeUpdates };

      // si la salle a changé, on renumérote les deux salles
      if (safeUpdates.roomId !== oldRoomId) {
        this.renumberRoom(oldRoomId);
        this.renumberRoom(safeUpdates.roomId);
      } else {
        this.renumberRoom(safeUpdates.roomId);
      }
    },

    // supprime une mémoire par son id
    deleteMemory(id) {
      const memory = this.memories.find((m) => m.id === id);
      if (!memory) return;

      const roomId = memory.roomId;
      // on enlève la mémoire du tableau
      this.memories = this.memories.filter((m) => m.id !== id);
      // on renumérote après suppression
      this.renumberRoom(roomId);
    },
  },
});
