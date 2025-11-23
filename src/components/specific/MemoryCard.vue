<template>
  <!-- Carte individuelle contenant une mémoire -->
  <div class="memory-card"  :style="{ backgroundColor: bgColor }">

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
    tags: {
      type: [String, Array],
      default: () => []
    },
    date: {
      type: String,
      default: "01/01/2025",
    },
    title: {
      type: String,
      default: "Titre",
    },
    image: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "Légende",
    },
    memoryNumber: {
      type: String,
      default: "Mémoire 1",
    },
    bgColor: {
      type: String,
      default: "#e0e0e0",
    },
  },

  computed: {
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

.memory-card:hover {
  transform: scale(1.05);
}

.card-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #555;
}

.title {
  margin: 8px 0;
  font-weight: bold;
  font-size: 1.2rem;
  color: #000;
}

.card-image {
  width: 100%;
  height: 150px;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 12px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.caption {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 4px;
}

.memory-number {
  font-weight: bold;
  color: #000;
}
</style>
