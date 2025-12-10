<template>
  <!-- Carte mémoire affichant les détails d'une mémoire -->
  <div class="memory-card" role="button" tabindex="0" @click="$emit('click')" @keyup.enter="$emit('click')" :style="{ backgroundColor: cardBackground }">
    <div class="card-header">
      <!-- Tags et date de la mémoire -->
      <span class="tags">{{ tag }}</span> <span class="date">{{ date }}</span>
    </div>
    <!-- Titre de la mémoire -->
    <h2 class="title">{{ title }}</h2>

    <!-- Image de la mémoire -->
    <div class="card-image">
      <!-- Image principale de la mémoire -->
      <img :src="image" alt="Memory Image" loading="lazy"/>
    </div>

    <!-- Légende de la mémoire -->
    <p class="caption">{{ caption }}</p>
    <!-- Numéro de la mémoire -->
    <p class="memory-number">{{ memoryNumber }}</p>
  </div>
</template>

<script>
export default {
  name: "MemoryCard",// Nom du composant

  props: {
    tag: { type: String, default: "" },// Tag associé à la mémoire
    date: { type: String, default: "" },// Date de la mémoire
    title: { type: String, default: "" },// Titre de la mémoire
    image: { type: String, required: true },// URL de l'image de la mémoire
    caption: { type: String, default: "" },// Légende de la mémoire
    memoryNumber: { type: String, default: "" },// Numéro de la mémoire
  },

  computed: {
    // Détermine la couleur de fond de la carte en fonction de la salle
    cardBackground() {
      const roomId = this.$route.params.id;// Récupère l'ID de la salle depuis les paramètres de la route
      const colors = {
        "room-1": "#5fbcb2",
        "room-2": "#d96a4d",
        "room-3": "#b3b3b3",
        "room-4": "#7fbf9c",
        "room-5": "#c9b56a",
        "room-6": "#5f8fab",
      };
      return colors[roomId] || "#ffffff";// Valeur par défaut si l'ID de la salle n'est pas trouvé
    },
  },
};
</script>

<style scoped>
  
/* Style pour la mise au point accessible */
.memory-card:focus-visible {
  outline: solid 3px #0245ff;  
  outline-offset: 4px;         
  border-radius: 6px;
}

/* Style de la carte mémoire */
.memory-card {
  width: 30em;
  height: 40em;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.11);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  text-align: center;
  transition: transform 0.3s ease;
  transform: translate3d(0, 0, 0) 
  
}
/* Effet au survol de la carte mémoire */
.memory-card:hover {
  transform: translateY(-10px) scale(1.02);
  cursor: pointer;
  box-shadow: 0 12px 50px rgba(255, 255, 255, 0.13);
}


/* En-tête de la carte (tags + date) */
.card-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #000;
  margin-bottom: 12px;
}

/* Titre de la mémoire */
.title {
  margin: 12px 0;
  font-weight: bold;
  font-size: 1.6rem;
  color: #000;
}

/* Image principale de la mémoire */
.card-image {
  width: 100%;
  height: 220px;
  margin-bottom: 1.4em;
  overflow: hidden;
  border-radius: 16px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Description ou légende */
.caption {
  font-size: 1.05rem;
  color: #1d1d1d;
  word-wrap: break-word;
  overflow-wrap: break-word; 
  white-space: normal; 
  max-width: 100%; 
  text-align: center; 
}

/* Numéro de mémoire */
.memory-number {
  font-weight: bold;
  color: #000;
  font-size: 1.1rem;
  margin-top: auto;
}

/* Styles responsive pour mobile */
@media (max-width: 768px) {
  .memory-card {
    width: 90%;
    padding: 16px;
  }

  .card-image {
    height: 180px;
  }

  .title {
    font-size: 1.3rem;
  }

  .caption {
    font-size: 0.95rem;
    margin-bottom: 11em;
  }

  .memory-number {
    font-size: 1rem;
  }
}
</style>