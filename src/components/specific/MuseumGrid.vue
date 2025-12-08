<template>
  <!-- Conteneur de la grille des salles du musée -->
  <div class="grid">
    <div class="rooms-grid">
      <!-- Carte pour chaque salle filtrée -->
      <MuseumCard v-for="room in filteredRooms" :key="room.id" :room="room" @click="goToRoom(room.id)" />
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useMuseumStore } from "@/stores/useMuseumStore";
import MuseumCard from "./MuseumCard.vue";
export default {
  name: "MuseumGrid",
  // Enregistrement du composant MuseumCard
  components: { MuseumCard },
  setup() {
    // Accède au routeur pour la navigation
    const router = useRouter();
    // Accède au magasin du musée
    const museumStore = useMuseumStore();
    // Méthode pour naviguer vers une salle spécifique
    const goToRoom = (roomId) => {
      router.push({ name: "Room", params: { id: roomId } });
    };
    const filteredRooms = computed(() => museumStore.filteredRooms); // Accède aux salles filtrées depuis le store
    return { filteredRooms, goToRoom }; // Expose les données et méthodes au template
  },
};
</script>
<style>
.MuseumCard:focus-visible {
  outline: solid 3px #0245ff;  
  outline-offset: 4px;         
  border-radius: 6px;
}
/* Conteneur principal de la grille */
.grid {
  background: rgba(0, 0, 255, 0);
  padding: 3em 0 5em 0;
  width: 100%;
}

/* Grille des salles avec espacement */
.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

/* Between 993px and 1319px → 2 columns */
@media (min-width: 993px) and (max-width: 1319px) {
  .rooms-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
  }
}

/* Tablet (992px) */
@media (max-width: 992px) {
  .rooms-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

/* Petit Tablet / Large Mobile (768px) */
@media (max-width: 768px) {
  .rooms-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.2rem;
  }
}

/* Mobile (600px) */
@media (max-width: 600px) {
  .rooms-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
