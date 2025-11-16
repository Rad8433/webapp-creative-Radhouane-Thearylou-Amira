<template>
  <div class="gird">
    <div class="rooms-grid">
      <MuseumCard v-for="room in rooms" :key="room.id" :room="room" @click="goToRoom(room.id)" />
    </div>
  </div>
</template>

<script>
import MuseumCard from './MuseumCard.vue';

export default {
  name: "MuseumRoomsView",
  components: { MuseumCard },

  data() {
    return {
      rooms: [{ id: 'room-1', url: '/src/assets/img-destination/evasions.jpg', name: 'Vacances et évasions', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', tag: '#memoire', }, 
      { id: 'room-2', url: '/src/assets/img-destination/aventures.jpg', name: 'Aventures', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', tag: '#memoire', }, 
      { id: 'room-3', url: '/src/assets/img-destination/explorations_urbaines.jpg', name: 'Explorations urbaines', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', tag: '#memoire', }, 
      { id: 'room-4', url: '/src/assets/img-destination/moments_droles.jpg', name: 'Moments drôles', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', tag: '#memoire', }, 
      { id: 'room-5', url: '/src/assets/img-destination/gastronomies.jpg', name: 'Gastronomies', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', tag: '#memoire', }, 
      { id: 'room-6', url: '/src/assets/img-destination/reves.jpg', name: 'Destinations de rêves', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', tag: '#memoire', },]
    };
  },

  methods: {
    goToRoom(roomId) {
      this.$router.push({
        name: 'Room',
        params: { id: roomId }
      });
    }
  }
};
</script>

<style>
.gird {
  background: rgba(0, 0, 255, 0);
  padding: 3rem;
  width: 100%;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  justify-items: center;
}
</style>
