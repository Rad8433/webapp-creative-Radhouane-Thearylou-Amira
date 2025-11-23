// src/stores/useMemoryStore.js
import { defineStore } from "pinia";
import data from "@/data/memoires.json";

export const useMemoryStore = defineStore("memory", {
  state: () => {
    // Group memories by room to calculate memoryNumber correctly
    const memoriesByRoom = {};
    const memories = data.memoires.map((souvenir) => {
      const roomId = souvenir.roomId;

      if (!memoriesByRoom[roomId]) {
        memoriesByRoom[roomId] = 1; // start at 1 for each room
      } else {
        memoriesByRoom[roomId]++;
      }

      return {
        id: Date.now().toString() + Math.random(), // unique id
        roomId: roomId,
        room: roomId,
        title: souvenir.titreSouvenir,
        image: souvenir.imageSouvenir,
        caption: souvenir.descriptionSouvenir,
        description: souvenir.descriptionSouvenir,
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
          memory.description.toLowerCase().includes(state.searchQuery.toLowerCase());

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
      const memoriesInRoom = this.memories.filter(m => m.roomId === memory.roomId).length;
      const memoryNumber = `Memory ${memoriesInRoom + 1}`;

      this.memories.push({
        ...memory,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        memoryNumber,
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
