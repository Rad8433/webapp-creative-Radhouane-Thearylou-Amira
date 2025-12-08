<template>
  <div class="menu" :style="{ background: roomBackground }" :aria-label="currentRoomConfig.alt">
    <!-- Affiche le formulaire ou le détail de la mémoire selon la présence de memoryId -->
    <component :is="currentComponent" :memory-id="$route.params.memoryId" :room-id="$route.params.id" />
  </div>
</template>
<script>
import MemoryForm from "@/components/specific/MemoryForm.vue";
import MemoryDetail from "@/components/specific/MemoryDetail.vue";
// Configuration des salles avec leurs titres et fonds d'écran respectifs
const roomsConfig = {
  "room-1": {
    title: "Vacances et évasions",
    bg: "url('/webapp-creative-Radhouane-Thearylou-Amira/bg-rooms/bg1.png') center/cover no-repeat",
    alt: "Image du background représentant la room des vacances et de l'évasions.",
  },
  "room-2": {
    title: "Aventures",
    bg: "url('/webapp-creative-Radhouane-Thearylou-Amira/bg-rooms/bg2.png') center/cover no-repeat",
    alt: "Image du background représentant la room de l'aventures.",
  },
  "room-3": {
    title: "Explorations urbaines",
    bg: "url('/webapp-creative-Radhouane-Thearylou-Amira/bg-rooms/bg3.png') center/cover no-repeat",
    alt: "Image du background représentant la room des l'explorations urbaines.",
  },
  "room-4": {
    title: "Moments drôles",
    bg: "url('/webapp-creative-Radhouane-Thearylou-Amira/bg-rooms/bg4.png') center/cover no-repeat",
    alt: "Image du background représentant la room des moments drôles.",
  },
  "room-5": {
    title: "Gastronomies",
    bg: "url('/webapp-creative-Radhouane-Thearylou-Amira/bg-rooms/bg5.png') center/cover no-repeat",
    alt: "Image du background représentant la room des gastronomies.",
  },
  "room-6": {
    title: "Destinations de rêves",
    bg: "url('/webapp-creative-Radhouane-Thearylou-Amira/bg-rooms/bg6.png') center/cover no-repeat",
    alt: "Image du background représentant la room des destinations de rêves.",
  },
};
export default {
  name: "ModalView",
  components: { MemoryForm, MemoryDetail },
  props: { memoryId: { type: String, default: null } },
  computed: {
    // Récupère l'ID de la salle depuis les paramètres de la route
    roomId() {
      return this.$route.params.id;
    },
    // Récupère la configuration de la salle actuelle
    currentRoomConfig() {
      return roomsConfig[this.roomId] || {};
    },
    // Définit le fond d'écran de la salle actuelle
    roomBackground() {
      return (
        this.currentRoomConfig.bg || "linear-gradient(135deg, #ffecd2, #fcb69f)"
      );
    },
    // Détermine quel composant afficher : formulaire ou détail
    currentComponent() {
      return this.$route.params.memoryId ? MemoryDetail : MemoryForm;
    },
  },
};
</script>
<style scoped>
/* Conteneur principal centré et avec marges internes */
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
}
</style>
