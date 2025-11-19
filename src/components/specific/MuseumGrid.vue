<template>
  <div class="grid">
    <!-- Grille contenant toutes les cartes de salles -->
    <div class="rooms-grid">
      <!-- Une MuseumCard par salle filtrée -->
      <MuseumCard v-for="room in filteredRooms" :key="room.id" :room="room" @click="goToRoom(room.id)" />
    </div>
  </div>
</template>

<script>
import MuseumCard from "./MuseumCard.vue";
import roomsData from '@/data/museumrooms.json';

export default {
  name: "MuseumGrid",
  components: { MuseumCard },

  props: {
    filters: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      rooms: roomsData.rooms,
    };
  },

  computed: {
    filteredRooms() {
      let result = [...this.rooms];

      const search = this.filters.search?.trim().toLowerCase();
      const roomFilter = this.filters.room;
      const tagFilter = this.filters.tag;
      const sort = this.filters.sort;

      /* --- FILTRE PAR ID DE SALLE --- */
      if (roomFilter && roomFilter !== "all") {
        result = result.filter((r) => r.id === roomFilter);
      }

      /* --- FILTRE PAR TAG --- */
      if (tagFilter && tagFilter !== "all") {
        result = result.filter((r) => r.tag === tagFilter);
      }

      /* --- RECHERCHE PAR NOM --- */
      if (search) {
        result = result.filter((r) =>
          r.name.toLowerCase().includes(search)
        );
      }

      /* --- TRI PAR NOMBRE DE MEMOIRES --- */
      if (sort === "asc") {
        result = result.sort(
          (a, b) => (a.memoriesCount || 0) - (b.memoriesCount || 0)
        );
      } else if (sort === "desc") {
        result = result.sort(
          (a, b) => (b.memoriesCount || 0) - (a.memoriesCount || 0)
        );
      }

      return result;
    },
  },

  methods: {
    goToRoom(roomId) {
      this.$router.push({
        name: "Room",
        params: { id: roomId },
      });
    },
  },
};
</script>

<style>
/* Conteneur global de la grille */
.grid {
  background: rgba(0, 0, 255, 0);
  padding: 3rem;
  width: 100%;
}

/* Grille responsive pour les cartes */
.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  justify-items: center;
}



/* ================================
   Between 993px and 1183px → 2 columns
   ================================= */
@media (min-width: 993px) and (max-width: 1319px) {
  .rooms-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
    padding: 2.5rem;
  }
}

/* ================================
   Tablet (992px)
   ================================= */
@media (max-width: 992px) {
  .rooms-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  }
}

/* ================================
   Petit Tablet / Large Mobile (768px)
   ================================= */
@media (max-width: 768px) {
  .rooms-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.2rem;
    padding: 1.5rem;
  }
}

/* ================================
   Mobile (600px)
   ================================= */
@media (max-width: 600px) {
  .rooms-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
}
</style>