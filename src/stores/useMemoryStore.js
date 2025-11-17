import { defineStore } from 'pinia';

export const useMemoryStore = defineStore('memory', {
    state: () => ({
        memories: [],      // tableau de mémoires
        filters: {         // filtres actifs
            room: null,
            tag: null
        },
        searchQuery: "",   // recherche textuelle
    }),

    getters: {
        // Memories filtrées par recherche + filtre pièce + tag
        filteredMemories: (state) => {
            return state.memories.filter(memory => {
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

        // Groupement par pièce / room
        memoriesByRoom: (state) => {
            return (room) => state.memories.filter(m => m.room === room);
        },

        // Groupement par tag
        memoriesByTag: (state) => {
            return (tag) => state.memories.filter(m => m.tags?.includes(tag));
        },
    },

    actions: {
        addMemory(memory) {
            this.memories.push({
                ...memory,
                id: Date.now().toString(),
                createdAt: new Date().toISOString()
            });
        },

        updateMemory(id, updates) {
            const index = this.memories.findIndex(m => m.id === id);
            if (index !== -1) {
                this.memories[index] = {
                    ...this.memories[index],
                    ...updates
                };
            }
        },

        deleteMemory(id) {
            this.memories = this.memories.filter(m => m.id !== id);
        },

        searchMemories(query) {
            this.searchQuery = query;
        }
    }
});
