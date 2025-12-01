<template>
  <!-- Carte individuelle contenant une mémoire -->
  <div class="memory-card" :style="{ backgroundColor: bgColor }">
    <!-- En-tête : tag à gauche, date à droite -->
    <div class="card-header">
      <span class="tags">{{ tag }}</span> <span class="date">{{ date }}</span>
    </div>
    <!-- Titre de la mémoire -->
    <h2 class="title">{{ title }}</h2>
    <!-- Image principale de la mémoire -->
    <div class="card-image"><img :src="image" alt="Memory Image" /></div>
    <!-- Petite description/phrase -->
    <p class="caption">{{ caption }}</p>
    <!-- Numéro de mémoire -->
    <p class="memory-number">{{ memoryNumber }}</p>
  </div>
</template>

<script>
export default {
  name: "MemoryCard",
  props: {
    tag: { type: String, default: "" },
    date: { type: String, default: "" },
    title: { type: String, default: "" },
    image: { type: String, required: true },
    caption: { type: String, default: "" },
    memoryNumber: { type: String, default: "" },
    bgColor: { type: String, default: "#e0e0e0" },
  },
};
</script>

<style scoped>
/* Carte principale */
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
}

.memory-card:hover {
  transform: translateY(-10px) scale(1.02);
  cursor: pointer;
  box-shadow: 0 12px 50px rgba(0, 196, 98, 0.247);
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
  height: 220px;
  /* Image plus grande */
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