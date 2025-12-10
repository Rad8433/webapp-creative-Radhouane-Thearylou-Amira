<template>
  <div class="room-card" tabindex="0" role="button" @click="$emit('click')" @keyup.enter="$emit('click')">
    <!-- Image de la salle -->
    <img :src="room.url" :alt="room.alt" loading="lazy"/>
    <!-- Nom de la salle -->
    <h2>{{ room.name }}</h2>
    <!-- Description courte de la salle -->
    <p class="room-description">{{ room.description }}</p>
    <!-- Nombre de mémoires dans la salle -->
    <p class="memory-count">{{ memoryLabel }}</p>
  </div>
</template>
<script>
export default {
  name: "MuseumCard", // Nom du composant
  props: { room: { type: Object, required: true } }, // Propriété pour recevoir les données de la salle
  computed: {
    memoryLabel() {
      const count = this.room.memoriesCount;
      return count + " " + (count === 1 ? "mémoire" : "mémoires");
    }
  }
};
</script>
<style scoped>

.room-card:focus-visible {
  outline: solid 3px #0245ff;  
  outline-offset: 4px;         
  border-radius: 6px;
}
/* Style de la carte de la salle */ 
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
  font-family: "roboto", sans-serif;
}

/* Effet au survol de la carte */
.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

/* Style de l’image de la salle */
.room-card img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  z-index: 1;
}

/* Style du texte au-dessus de l’image */
.room-card h2,
.room-description,
.memory-count {
  position: relative;
  z-index: 2;
}

/* Titre de la salle */
.room-card h2 {
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.7rem;
}

/* Description de la salle */
.room-description {
  color: #fff;
  font-size: 0.9rem;
  padding: 0 0.4rem;
  margin-bottom: 1rem;
  text-align: center;
}

/* Nombre de mémoires */
.memory-count {
  color: #fff;
  font-size: 0.9rem;
}

@media (max-width: 910px){
  .room-card h2 {
    font-size: 1.2rem;
  }

  .room-description {
    font-size: 0.7rem;
  }
}

</style>
