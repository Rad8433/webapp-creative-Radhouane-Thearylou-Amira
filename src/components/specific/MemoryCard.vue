<template>
  <div class="memory-card" :style="{ backgroundColor: bgColor }">
    <div class="card-header">
      <span class="tags">{{ tags }}</span>
      <span class="date">{{ date }}</span>
    </div>

    <h2 class="title">{{ title }}</h2>

    <div class="card-image">
      <img :src="image" alt="Memory Image" />
    </div>

    <p class="caption">{{ caption }}</p>
    <p class="memory-number">{{ memoryNumber }}</p>
  </div>
</template>

<script>
export default {
  name: "MemoryCard",
  props: {
    tags: {
      type: String,
      default: "#Tags"
    },
    tags: {
      type: String,
      default: "#Tags"
    },
    date: {
      type: String,
      default: "01/01/2025"
    },
    title: {
      type: String,
      default: "Titre"
    },
    image: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: "Légende"
    },
    memoryNumber: {
      type: String,
      default: "Mémoire 1"
    },
    bgColor: {
      type: String,
      default: "#e0e0e0" 
    }
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
