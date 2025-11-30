// src/stores/useMemoryStore.js
import { defineStore } from "pinia";
import data from "@/data/memoires.json";

export const useMemoryStore = defineStore("memory", {
  state: () => {
    const memoriesByRoomCount = {};

    const memories = data.memoires.map((souvenir) => {
      const roomId = souvenir.roomId;
      memoriesByRoomCount[roomId] = (memoriesByRoomCount[roomId] || 0) + 1;

      return {
        id: Date.now().toString() + Math.random(),
        roomId,
        title: souvenir.titreSouvenir,
        image: souvenir.imageSouvenir,
        caption: souvenir.descriptionSouvenir,
        date: souvenir.dateSouvenir,
        tags: souvenir.tagsSouvenir || [],
        memoryNumber: `Memory ${memoriesByRoomCount[roomId]}`,
        bgColor: "#e0e0e0",
        createdAt: new Date().toISOString(),
      };
    });

    return {
      memories,
      filters: {
        room: null,       // roomId filter
        tag: null,        // tag filter
        search: "",       // search string filter
        date: null,       // 'recent' | 'old' date order filter
        sort: "asc",      // 'asc' | 'desc' memoryNumber sort order
      },
    };
  },

  getters: {
    // Basic getter returning memories by roomId (function)
    memoriesByRoom: (state) => (roomId) => {
      return state.memories.filter((m) => m.roomId === roomId);
    },

    // Filter memories by all current filters (general)
    filteredMemories: (state) => {
      let result = [...state.memories];

      if (state.filters.room) {
        result = result.filter((m) => m.roomId === state.filters.room);
      }

      if (state.filters.search?.trim()) {
        const q = state.filters.search.toLowerCase();
        result = result.filter(
          (m) =>
            m.title.toLowerCase().includes(q) ||
            m.caption?.toLowerCase().includes(q)
        );
      }

      if (state.filters.tag && state.filters.tag !== "all") {
        result = result.filter((m) => m.tags?.includes(state.filters.tag));
      }

      if (state.filters.date === "recent") {
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (state.filters.date === "old") {
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      if (state.filters.sort === "asc") {
        result.sort((a, b) =>
          a.memoryNumber.localeCompare(b.memoryNumber)
        );
      } else if (state.filters.sort === "desc") {
        result.sort((a, b) =>
          b.memoryNumber.localeCompare(a.memoryNumber)
        );
      }

      return result;
    },

    // Filtered and sorted memories by specific room with filters applied
    filteredMemoriesByRoom: (state) => (roomId) => {
      return state.memories
        .filter((m) => m.roomId === roomId)
        .filter((m) => {
          const matchesSearch =
            !state.filters.search ||
            m.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
            m.caption?.toLowerCase().includes(state.filters.search.toLowerCase());

          const matchesTag =
            !state.filters.tag || state.filters.tag === "all" || m.tags?.includes(state.filters.tag);

          return matchesSearch && matchesTag;
        })
        .sort((a, b) => {
          if (state.filters.date === "recent") return new Date(b.date) - new Date(a.date);
          if (state.filters.date === "old") return new Date(a.date) - new Date(b.date);

          if (state.filters.sort === "asc") return a.memoryNumber.localeCompare(b.memoryNumber);
          if (state.filters.sort === "desc") return b.memoryNumber.localeCompare(a.memoryNumber);

          return 0;
        });
    },

    // Memories filtered by tag only
    memoriesByTag: (state) => (tag) =>
      state.memories.filter((m) => m.tags?.includes(tag)),
  },

  actions: {
    // Filter setters
    setSearch(query) {
      this.filters.search = query;
    },
    setRoom(roomId) {
      this.filters.room = roomId;
    },
    setTag(tag) {
      this.filters.tag = tag;
    },
    setDateOrder(order) {
      if (order === "recent" || order === "old") this.filters.date = order;
    },
    setSortOrder(order) {
      if (order === "asc" || order === "desc") this.filters.sort = order;
    },

    // Normalize tags into array of trimmed strings
    normalizeTags(tags) {
      if (!tags) return [];
      if (Array.isArray(tags)) return tags.map((t) => t.trim());
      return [tags.trim()];
    },

    // Create a new memory and push to state
    createMemory(raw) {
      const tags = this.normalizeTags(raw.tags);
      const count = this.memories.filter((m) => m.roomId === raw.roomId).length;

      const memory = {
        id: Date.now().toString(),
        roomId: raw.roomId,
        title: raw.title.trim(),
        image: raw.image,
        caption: raw.caption.trim(),
        date: raw.date,
        tags,
        memoryNumber: `Memory ${count + 1}`,
        bgColor: "#e0e0e0",
        createdAt: new Date().toISOString(),
      };

      this.memories.push(memory);
    },

    // Update a memory by id with safe trimming and normalization
    updateMemory(id, updates) {
      const index = this.memories.findIndex((m) => m.id === id);
      if (index === -1) return;

      const old = this.memories[index];

      const safeUpdates = {
        title: updates.title?.trim() ?? old.title,
        caption: updates.caption?.trim() ?? old.caption,
        date: updates.date ?? old.date,
        image: updates.image ?? old.image,
        tags: this.normalizeTags(updates.tags ?? old.tags),
        updatedAt: new Date().toISOString(),
      };

      this.memories[index] = { ...old, ...safeUpdates };
    },

    // Delete memory by id
    deleteMemory(id) {
      this.memories = this.memories.filter((m) => m.id !== id);
    },
  },
});
