<template>
    <div class="menu">
    
      <div class="rooms-grid">
        <div :src="room.url" v-for="room in rooms" :key="room.id" class="room-card" @click="goToRoom(room.id)">
          <img :src="room.url" alt="">
          <h2>{{ room.name}}</h2>
          <p class="room-description">{{ room.description }}</p>
          <p class="memory-count">{{ room.tag }}</p>
 
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RoomsView',
    
    data() {
      return {
        // Données temporaires pour tester
        rooms: [
          {
            id: 'room-1',
            url:'/src/assets/img-destination/evasions.jpg',
            name: 'Vacances et évasions',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            tag: '#memoire',
          },
          {
            id: 'room-2',
            url:'/src/assets/img-destination/aventures.jpg',
            name: 'Aventures',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            tag: '#memoire',
          },
          {
            id: 'room-3',
            url:'/src/assets/img-destination/explorations_urbaines.jpg',
            name: 'Explorations urbaines',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            tag: '#memoire',
          },
          {
            id: 'room-4',
            url:'/src/assets/img-destination/moments_droles.jpg',
            name: 'Moments drôles',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            tag: '#memoire',
          },
          {
            id: 'room-3',
            url:'/src/assets/img-destination/gastronomies.jpg',
            name: 'Gastronomies',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            tag: '#memoire',
          },
          {
            id: 'room-3',
            url:'/src/assets/img-destination/reves.jpg',
            name: 'Destinations de rêves',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            tag: '#memoire',
          },
        ]
      };
    },
    
    methods: {
      goToRoom(roomId) {
        // TODO: Naviguer vers la page de détail de la salle ayant l'id roomID
        this.$router.push({
          name: 'roomDetail',
          params: { id: roomId }
        })
        // Note de cours: https://tim-montmorency.com/compendium/582-511-web5/vue/router-and-views.html#32-navigation-programmatique-dans-les-methodes
        
      },
      
      goHome() {
        this.$router.push({ name: 'home' });
        // TODO Naviguer vers l'accueil
  
        // Notes de cours: https://tim-montmorency.com/compendium/582-511-web5/vue/router-and-views.html#32-navigation-programmatique-dans-les-methodes 
       
      }
    }
  };
  </script>
  
  <style scoped>
.menu {
  background: rgba(0, 0, 255, 0);
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.room-card {
  position: relative;
  background: white;
  padding: 8rem 0; 
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  overflow: hidden; 
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
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

.room-card h2, .room-description, .memory-count {
  position: relative;
  z-index: 1; 
 
}

.room-card h2 {
  color: #fff; 
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
}

.room-description {
  color: #fff; 
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.memory-count {
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.back-button {
  background: #95a5a6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.back-button:hover {
  background: #7f8c8d;
}

  </style>