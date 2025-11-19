<template>
  <div class="room" :style="{ background: roomBackground }">
    <div class="retour">
      <BaseButton variant="quatrieme" @click="goBack">
        <- </BaseButton>
    </div>
 
    <div class="memory-room">
       <!-- En-tête avec titre personnalisé -->
      <h1 class="room-title">
        {{ roomTitle }}
      </h1>
      <div class="filtre">
        <!-- Barre de filtres : recherche, salle, tag, tri -->
      <OptionBar v-model:search="filters.search" v-model:date="filters.date" v-model:tag="filters.tag"
        :tag-options="tagOptions" :showRoom="false" :showSort="false" />
    </div>
     <!-- Les cartes de mémoires -->
      <MemorySwiper :filters="filters" />
    </div>
 <!-- Bouton pour ajouter une mémoire -->
    <BaseButton variant="troisieme" @click="ajout">
      +
    </BaseButton>
  </div>
</template>
 
<script>
import BaseButton from '@/components/common/BaseButton.vue';
import MemorySwiper from '@/components/specific/MemorySwiper.vue';
import OptionBar from "@/components/layout/OptionBar.vue";
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
  components: { MemorySwiper, BaseButton, OptionBar },
 
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
 
.retour {
width: 45em;
}

.filtre{
  display: flex;
  justify-content: start;
  
}
 
.memory-room {
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  position: relative;
  gap: 20px;
}
 
.room-title {
  width: 100%;
  font-size: 2rem;
  margin: 0 0 0.8rem 0;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  text-align: left;
}
 
.bouton {
  width: 60px;
}
@media (min-width:730px) and (max-width: 900px) {
  .retour {
width: 41em;
}

}

@media (min-width:700px) and  (max-width: 730px) {
  .retour {
    width: 40em;
  }


}

@media   (max-width: 700px) {
  .retour {
    width: 90%;
  }


}
</style>
 