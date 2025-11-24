<template>
  <!-- Carte individuelle contenant une mémoire -->
  <div class="memory-card" :style="{ backgroundColor: bgColor }">

    <!-- En-tête : tags à gauche, date à droite -->
    <div class="card-header">
      <span class="tags">{{ formattedTags }}</span>
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

  props: {
    // Tags associés à la mémoire
    tags: {
      type: [String, Array],
      default: () => []
    },
    // Date de la mémoire
    date: {
      type: String,
      default: "01/01/2025",
    },
    // Titre de la mémoire
    title: {
      type: String,
      default: "Titre",
    },
    // Image principale de la mémoire
    image: {
      type: String,
      required: true,
    },
    // Petite description ou légende
    caption: {
      type: String,
      default: "Légende",
    },
    // Numéro ou référence de la mémoire
    memoryNumber: {
      type: String,
      default: "Mémoire 1",
    },
    // Couleur de fond de la carte
    bgColor: {
      type: String,
      default: "#e0e0e0",
    },
  },

  computed: {
    // Formatte les tags en chaîne si c'est un tableau
    formattedTags() {
      if (Array.isArray(this.tags)) {
        return this.tags.join(", ");
      }
      return this.tags;
    },
  }
};
</script>

<style scoped>
/* Carte principale */
.memory-card {
  width: 30em; /* Agrandie */
  height: 40em;
  border-radius: 20px;
  padding: 24px; /* Plus de padding pour donner de l'espace */
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.11);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  text-align: center;
  transition: transform 0.3s ease;
 
}


/* En-tête de la carte (tags + date) */
.card-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #555;
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
  height: 220px; /* Image plus grande */
  margin-bottom: 12px;
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
  color: #333;
  margin-bottom: 6px;
}

/* Numéro de mémoire */
.memory-number {
  font-weight: bold;
  color: #000;
  font-size: 1.1rem;
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
  }

  .memory-number {
    font-size: 1rem;
  }
}
</style>
