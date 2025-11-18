<template>
  <!-- Carte individuelle contenant une mémoire -->
  <div class="memory-card" :style="{ backgroundColor: bgColor }">

    <!-- En-tête : tags à gauche, date à droite -->
    <div class="card-header">
      <span class="tags">{{ tags }}</span>
      <span class="date">{{ date }}</span>
    </div>

    <!-- Titre de la mémoire -->
    <h2 class="title">{{ title }}</h2>

    <!-- Image principale de la mémoire -->
    <div class="card-image">
      <img :src="image" alt="Memory Image" />
    </div>

    <!-- Petite description/phrase -->
    <p class="caption">{{ caption }}</p>

    <!-- Numéro de mémoire (ex: Mémoire 1) -->
    <p class="memory-number">{{ memoryNumber }}</p>
  </div>
</template>

<script>
export default {
  name: "MemoryCard",

  // Les données envoyées à la carte
  props: {
    // Mot-clé/hashtag associé à la mémoire
    tags: {
      type: String,
      default: "#Tags"
    },

    // Date affichée sur la carte
    date: {
      type: String,
      default: "01/01/2025"
    },

    // Titre de la mémoire
    title: {
      type: String,
      default: "Titre"
    },

    // Image obligatoire
    image: {
      type: String,
      required: true
    },

    // Petite légende sous l’image
    caption: {
      type: String,
      default: "Légende"
    },

    // Numéro de mémoire
    memoryNumber: {
      type: String,
      default: "Mémoire 1"
    },

    // Couleur de fond de la carte
    bgColor: {
      type: String,
      default: "#e0e0e0"
    }
  }
};
</script>

<style scoped>
/* Style général de la carte */
.memory-card {
  width: 250px;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  text-align: center;
  transition: transform 0.3s ease;
}

/* Effet zoom au survol */
.memory-card:hover {
  transform: scale(1.05);
}

/* En-tête avec tags + date */
.card-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #555;
}

/* Titre principal */
.title {
  margin: 8px 0;
  font-weight: bold;
  font-size: 1.2rem;
  color: #000;
}

/* Conteneur de l’image */
.card-image {
  width: 100%;
  height: 150px;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 12px;
}

/* Image remplissant la zone */
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Légende */
.caption {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 4px;
}

/* Numéro de mémoire */
.memory-number {
  font-weight: bold;
  color: #000;
}
</style>
