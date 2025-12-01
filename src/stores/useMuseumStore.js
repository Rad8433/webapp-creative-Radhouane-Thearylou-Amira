// src/stores/useMuseumStore.js
import { defineStore } from "pinia";
import roomsData from "@/data/museumrooms.json";
import { useMemoryStore } from "@/stores/useMemoryStore";

export const useMuseumStore = defineStore("museum", {
  state: () => ({
    // liste des salles chargée depuis le JSON
    rooms: roomsData.rooms,
    // id de la salle actuellement sélectionnée
    currentRoomId: null,

    // filtres utilisés par l’OptionBar des salles
    filters: {
      search: "", // texte de recherche sur le nom des salles
      room: "all", // id de salle ou "all" pour toutes
      sort: "asc", // ordre de tri par nombre de mémoires
    },
  }),

  getters: {
    // renvoie la salle actuellement sélectionnée ou null si rien
    currentRoom: (state) =>
      state.rooms.find((room) => room.id === state.currentRoomId) || null,

    // renvoie la liste des salles avec filtres + compteur de mémoires
    filteredRooms: (state) => {
      const memoryStore = useMemoryStore();

      // on ajoute à chaque salle le nombre de mémoires associées
      let result = state.rooms.map((r) => ({
        ...r,
        memoriesCount: memoryStore.memories.filter((m) => m.roomId === r.id)
          .length,
      }));

      const search = state.filters.search?.trim().toLowerCase();
      const roomFilter = state.filters.room;
      const sort = state.filters.sort;

      // filtre par salle sélectionnée
      if (roomFilter && roomFilter !== "all") {
        result = result.filter((r) => r.id === roomFilter);
      }

      // filtre par texte sur le nom de la salle
      if (search) {
        result = result.filter(
          (r) => r.name.toLowerCase().startsWith(search) // tu peux mettre includes si tu veux
        );
      }

      // tri par nombre de mémoires
      if (sort === "asc") {
        result.sort((a, b) => (a.memoriesCount || 0) - (b.memoriesCount || 0));
      } else if (sort === "desc") {
        result.sort((a, b) => (b.memoriesCount || 0) - (a.memoriesCount || 0));
      }

      return result;
    },
  },

  actions: {
    // met à jour le texte de recherche
    setSearch(value) {
      this.filters.search = value;
    },

    // met à jour la salle sélectionnée dans le filtre
    setRoom(id) {
      this.filters.room = id || "all";
    },

    // met à jour l’ordre de tri par nombre de mémoires
    setSort(order) {
      if (order === "asc" || order === "desc") {
        this.filters.sort = order;
      }
    },

    // change la salle courante utilisée ailleurs dans l’app
    setCurrentRoom(id) {
      this.currentRoomId = id;
    },
  },
});
