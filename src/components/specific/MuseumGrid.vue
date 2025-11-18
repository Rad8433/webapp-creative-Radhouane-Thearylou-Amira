<template>
  <div class="gird">
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

  // Reçoit l'objet "filters" depuis la page MuseumRoomsView
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      // Liste des salles provenant du fichier JSON
      rooms: roomsData.rooms,
    };
  },

  computed: {
    // Filtre toutes les salles selon les critères appliqués
    filteredRooms() {
      let result = [...this.rooms]; // copie pour éviter de modifier l'original

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
      }
      else if (sort === "desc") {
        result = result.sort(
          (a, b) => (b.memoriesCount || 0) - (a.memoriesCount || 0)
        );
      }

      return result;
    },
  },

  methods: {
    // Redirige vers la page Room (vue détaillée d’une salle)
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
.gird {
  background: rgba(0, 0, 255, 0);
  padding: 3rem;
  width: 100%;
}

/* Grille responsive pour les cartes */
.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  /* S’adapte à l’espace disponible */
  gap: 2rem;
  justify-items: center;
}
</style>
