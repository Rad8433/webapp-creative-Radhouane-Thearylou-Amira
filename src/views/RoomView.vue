<template>
  <main class="memory-room" :style="{ background: roomBackground }">
<div class="room" >
     <!-- En-tête avec titre personnalisé -->
     <div class="retour">
     <!-- En-tête avec titre personnalisé -->
     <AppHeader variantHeader="titleWhite" sect endroit="MuseumRooms"  sectionGrid="sectionRoom" visibleCog="cogDisplayN" visibleBouton="cogDisplay" :title="roomTitle"></AppHeader>
  </div>


    <div class="filtre">
      <!-- Barre de filtres : recherche, salle, tag, tri -->
    <OptionBar v-model:search="filters.search" v-model:date="filters.date" v-model:tag="filters.tag"
      :tag-options="tagOptions" :showRoom="false" :showSort="false" />

  </div>
  <div class="carte">
    <!-- Les cartes de mémoires -->
    <MemorySwiper :filters="filters" />
<!-- Bouton pour ajouter une mémoire -->
</div>
  <BaseButton variant="troisieme" @click="ajout">
    +
  </BaseButton>

</div>
</main>
</template>

<script>
import BaseButton from '@/components/common/BaseButton.vue';
import MemorySwiper from '@/components/specific/MemorySwiper.vue';
import OptionBar from "@/components/layout/OptionBar.vue";
import AppHeader from "@/components/common/AppHeader.vue";
//Données des salles 
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
name: 'MemoryRoom',
components: { MemorySwiper, BaseButton, OptionBar,AppHeader },

data() {
  return {
    // Valeurs des filtres contrôlées par la barre OptionBar
    filters: {
      search: "",
      tag: "all",
      date: "all",
    },
     // Liste des tags disponibles dans le filtre
    tagOptions: [
      { value: "#vacances", label: "#vacances" },
      { value: "#aventure", label: "#aventure" },
      { value: "#urbain", label: "#urbain" },
      { value: "#humour", label: "#humour" },
      { value: "#food", label: "#food" },
      { value: "#rêve", label: "#rêve" },
    ],
  };
},

computed: {
    // retourne l'ID 
  currentRoomConfig() {
    return roomsConfig[this.$route.params.id] || {};
  },
    // Arrière plan de la salle spécifique
  roomBackground() {
    return this.currentRoomConfig.bg || "linear-gradient(135deg, #ffecd2, #fcb69f)";
  },
    // Titre de la salle spécifique
  roomTitle() {
    return this.currentRoomConfig.title || "Salle de mémoires";
  }
},

methods: {
  goBack() {
    this.$router.push({ name: 'MuseumRooms' });
  },
  ajout() {
    this.$router.push({ name: 'Modal', params: { id: this.$route.params.id } });
  }
}
};
</script>

<style scoped>


h1{
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

}
.room {
min-width: 0;
height: auto;
display: flex;
flex-direction: column;
align-items: center; 
padding: 1.5rem 0 0 0;
width: 100%;
 box-sizing: border-box;


}

.retour {

width: 70vw;

}
.filtre {
display: flex;
justify-content: flex-start; 
flex-wrap: wrap; 
gap: 1rem; 
width: 70vw;
margin-bottom:-1rem ;

}

.filtre > * {
flex: 1 1 auto;
max-width: 100%;
}

.memory-room {
min-height: 100vh;
height: auto;
width: 100%;
display: flex;
flex-direction: column;

align-items: center;
box-sizing: border-box;
}

.room-title {
width: 100%;
font-size: 2rem;
margin: 0 0 0.8rem 0;
color: #fff;
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
text-align: left;
}

.carte{
width: 100%;
height: 100%;

}




</style>
