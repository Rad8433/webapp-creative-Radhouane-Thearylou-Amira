<template>
  <div class="room-card">
    <img :src="room.url" :alt="room.name">

    <h2>{{ room.name }}</h2>
    <p class="room-description">{{ room.description }}</p>
    <p class="memory-count">{{ room.tag }}</p>
  </div>
</template>

<script>
export default {
  name: "MuseumCard",
  props: {
    room: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
@font-face {
  src: url("/src/assets/font/FuturaCyrillicBold.ttf") format("truetype");
  font-family: "futura-bold";
}

.room-card {
  position: relative;
  background: white;
  padding: 14rem 0 2rem 0;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.3s;
  overflow: hidden;
  width: 100%;
  max-width: 420px; /* empêche les cartes d'être trop larges */
  font-family: 'roboto', sans-serif;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  z-index: 1;
}

.room-card h2,
.room-description,
.memory-count {
  position: relative;
  z-index: 2;
}

.room-card h2 {
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.7rem;
  font-family: "futura-bold";
}

.room-description {
  color: #fff;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
}

.memory-count {
  color: #fff;
  font-size: 0.9rem;
}
</style>
