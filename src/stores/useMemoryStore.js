// src/stores/useMemoryStore.js
import { defineStore } from "pinia";
import data from "@/data/memoires.json";

export const useMemoryStore = defineStore("memory", {
  state: () => {
    const memoriesByRoom = {};
    const memories = data.memoires.map((souvenir) => {
      const roomId = souvenir.roomId;

      memoriesByRoom[roomId] = (memoriesByRoom[roomId] || 0) + 1;

      return {
        id: Date.now().toString() + Math.random(),
        roomId,
        room: roomId,
        title: souvenir.titreSouvenir,
        image: souvenir.imageSouvenir,
        caption: souvenir.descriptionSouvenir,
        date: souvenir.dateSouvenir,
        tags: souvenir.tagsSouvenir,
        memoryNumber: `Memory ${memoriesByRoom[roomId]}`,
        bgColor: "#e0e0e0",
      };
    });

    return {
      memories,
      filters: {
        room: null,
        tag: null,
      },
      searchQuery: "",
    };
  },

  getters: {
    filteredMemories: (state) => {
      return state.memories.filter((memory) => {
        const matchesSearch =
          state.searchQuery === "" ||
          memory.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          memory.caption?.toLowerCase().includes(state.searchQuery.toLowerCase());

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
    /** Create a new memory */
    createMemory(raw) {
      const tags = raw.tags
        ? (Array.isArray(raw.tags) ? raw.tags : [raw.tags.trim()])
        : [];

      const memoriesInRoom = this.memories.filter(
        (m) => m.roomId === raw.roomId
      ).length;

      const memory = {
        id: Date.now().toString(),
        roomId: raw.roomId,
        title: raw.title.trim(),
        image: raw.image,
        caption: raw.caption.trim(),
        date: raw.date,
        tags,
        createdAt: new Date().toISOString(),
        memoryNumber: `Memory ${memoriesInRoom + 1}`,
        bgColor: "#e0e0e0",
      };

      this.memories.push(memory);
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
