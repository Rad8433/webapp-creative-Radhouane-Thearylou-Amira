<template>
    <div class="menu" :style="{ background: roomBackground }">
      <MemoryForm />
    </div>
  </template>
  
  <script>
  import MemoryForm from '@/components/specific/MemoryForm.vue';

  const roomsConfig = {
  "room-1": {
    title: "Vacances et évasions",
    bg: "url('/src/assets/bg-rooms/bg1.png') center/cover no-repeat"
  },
  "room-2": {
    title: "Aventures",
    bg: "url('/src/assets/bg-rooms/bg2.png') center/cover no-repeat"
  },
  "room-3": {
    title: "Explorations urbaines",
    bg: "url('/src/assets/bg-rooms/bg3.png') center/cover no-repeat"
  },
  "room-4": {
    title: "Moments drôles",
    bg: "url('/src/assets/bg-rooms/bg4.png') center/cover no-repeat"
  },
  "room-5": {
    title: "Gastronomies",
    bg: "url('/src/assets/bg-rooms/bg5.png') center/cover no-repeat"
  },
  "room-6": {
    title: "Destinations de rêves",
    bg: "url('/src/assets/bg-rooms/bg6.png') center/cover no-repeat"
  },
};

  export default {
    name: "MuseumRoomsView",
    components: {
      MemoryForm,
    },
    data() {
      return {
        msg: 'Bonjour!'
      }
    },
    computed: {
    currentRoomConfig() {
      return roomsConfig[this.$route.params.id] || {};
    },
    roomBackground() {
      return this.currentRoomConfig.bg || "linear-gradient(135deg, #ffecd2, #fcb69f)";
    },
  },
    
  }
  </script>
  
  <style>

  .menu {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }
  </style>