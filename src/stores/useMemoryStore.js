// src/stores/useMemoryStore.js
import { defineStore } from "pinia";
import data from "@/data/memoires.json";

export const useMemoryStore = defineStore("memory", {
  state: () => ({
    memories: data.memoires.map((souvenir, index) => ({
      id: index,
      roomId: souvenir.roomId, // Id de salle
      room: souvenir.roomId, // alias pour tes getters actuels
      title: souvenir.titreSouvenir, // Titre
      image: souvenir.imageSouvenir, // Image
      caption: souvenir.descriptionSouvenir, // Description (caption)
      description: souvenir.descriptionSouvenir, // alias pour les getters
      date: souvenir.dateSouvenir, // Date texte
      tags: souvenir.tagsSouvenir, // on garde un ARRAY ici
      memoryNumber: `Memory ${index + 1}`, // Numéro visible
      bgColor: "#e0e0e0", // Couleur de fond
    })),

    filters: {
      room: null,
      tag: null,
    },
    searchQuery: "",
  }),

  getters: {
    // Memories filtrées par recherche + filtre pièce + tag
    filteredMemories: (state) => {
      return state.memories.filter((memory) => {
        const matchesSearch =
          state.searchQuery === "" ||
          memory.title
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          memory.description
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase());

        const matchesRoom =
          !state.filters.room || memory.room === state.filters.room;

        const matchesTag =
          !state.filters.tag || memory.tags?.includes(state.filters.tag);

        return matchesSearch && matchesRoom && matchesTag;
      });
    },

    memoriesByRoom: (state) => {
      return (roomId) => state.memories.filter((m) => m.roomId === roomId);
    },

    memoriesByTag: (state) => {
      return (tag) => state.memories.filter((m) => m.tags?.includes(tag));
    },
  },

  actions: {
    addMemory(memory) {
      this.memories.push({
        ...memory,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
    },

    updateMemory(id, updates) {
      const index = this.memories.findIndex((m) => m.id === id);
      if (index !== -1) {
        this.memories[index] = {
          ...this.memories[index],
          ...updates,
        };
      }
    },

    deleteMemory(id) {
      this.memories = this.memories.filter((m) => m.id !== id);
    },

    searchMemories(query) {
      this.searchQuery = query;
    },
  },
});
