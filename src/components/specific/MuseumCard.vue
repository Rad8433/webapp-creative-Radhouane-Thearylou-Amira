<template>
  <div class="room-card">
    <!-- Image de la salle en arrière-plan -->
    <img :src="room.url" :alt="room.name" />

    <!-- Nom de la salle -->
    <h2>{{ room.name }}</h2>

    <!-- Description de la salle -->
    <p class="room-description">{{ room.description }}</p>

    <!-- Nombre total de mémoires dans la salle -->
    <p class="memory-count">{{ memoryCount }} mémoires</p>
  </div>
</template>

<script>
import { useMemoryStore } from "@/stores/useMemoryStore";
import { computed } from "vue";

export default {
  name: "MuseumCard",

  props: {
    room: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const memoryStore = useMemoryStore();

    // Compute the number of memories in this room
    const memoryCount = computed(() => {
      return memoryStore.memoriesByRoom(props.room.id).length;
    });

    return {
      memoryCount,
    };
  },
};
</script>

<style scoped>
/* Carte de salle (conteneur principal) */
.room-card {
  position: relative;
  /* permet de placer l'image en absolute */
  background: white;
  padding: 14rem 0 2rem 0;
  /* gros padding en haut pour laisser la place à l'image */
  border-radius: 12px;
  cursor: pointer;
  /* main au survol */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  /* le texte en bas de la carte */
  transition: all 0.3s;
  overflow: hidden;
  /* masque ce qui dépasse (image) */
  width: 100%;
  font-family: 'roboto', sans-serif;
}

/* Effet au survol : légère élévation + ombre */
.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

/* L’image couvre toute la carte en arrière-plan */
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* garde les proportions mais remplit */
  border-radius: 12px;
  z-index: 1;
  /* derrière les textes */
}

/* Les textes passent devant l’image */
.room-card h2,
.room-description,
.memory-count {
  position: relative;
  z-index: 2;
}

/* Nom de la salle */
.room-card h2 {
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.7rem;
}

/* Courte description */
.room-description {
  color: #fff;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
}

/* Nombre de mémoires de la salle */
.memory-count {
  color: #fff;
  font-size: 0.9rem;
}
</style>
