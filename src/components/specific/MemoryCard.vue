<template>
  <div class="memory-card">
    <h3>{{ card.title }}</h3>
    <p>{{ card.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.memory-card {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: center;
}

.memory-card h3 {
  margin-bottom: 10px;
}

.memory-card p {
  color: #666;
}
</style>
