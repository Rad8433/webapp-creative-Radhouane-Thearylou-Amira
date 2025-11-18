<template>
  <div class="room" :style="{ background: roomBackground }">
    <!-- Bouton retour vers la liste des salles -->
    <div class="retoure">
      <BaseButton variant="quatrieme" @click="goBack">
        <- </BaseButton>
    </div>

    <!-- Section principale : filtres + swiper des mémoires -->
    <div class="memory-room">

      <!-- Barre de filtres : recherche, date, tag (sans salle ni tri) -->
      <OptionBar v-model:search="filters.search" v-model:date="filters.date" v-model:tag="filters.tag"
        :tag-options="tagOptions" :showRoom="false" :showSort="false" />

      <!-- Swiper qui affiche les mémoires filtrées -->
      <MemorySwiper :filters="filters" />
    </div>

    <!-- Bouton pour ajouter une nouvelle mémoire -->
    <BaseButton variant="troisieme" @click="ajout">
      +
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from '@/components/common/BaseButton.vue';
import MemorySwiper from '@/components/specific/MemorySwiper.vue';
import OptionBar from "@/components/layout/OptionBar.vue";

export default {
  name: 'MemoryRoom',
  components: { MemorySwiper, BaseButton, OptionBar },

  data() {
    return {
      // Filtres utilisés dans la salle de mémoires
      filters: {
        search: "",
        tag: "all",
        date: "all",
      },

      // Liste des tags disponibles
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

  methods: {
    // Retour à la page des salles
    goBack() {
      this.$router.push({ name: 'MuseumRooms' });
    },

    // Ouvre la modal pour ajouter une mémoire dans cette salle
    ajout() {
      this.$router.push({ name: 'Modal', params: { id: this.$route.params.id } });
    }
  },

  computed: {
    // Choisit le fond d'écran selon l'ID de la salle
    roomBackground() {
      const id = this.$route.params.id;

      switch (id) {
        case "room-1":
          return "url('/src/assets/bg-rooms/bg1.png') center/cover no-repeat";

        case "room-2":
          return "url('/src/assets/bg-rooms/bg2.png') center/cover no-repeat";

        case "room-3":
          return "url('/src/assets/bg-rooms/bg3.png') center/cover no-repeat";

        case "room-4":
          return "url('/src/assets/bg-rooms/bg4.png') center/cover no-repeat";

        case "room-5":
          return "url('/src/assets/bg-rooms/bg5.png') center/cover no-repeat";

        case "room-6":
          return "url('/src/assets/bg-rooms/bg6.png') center/cover no-repeat";
      }
    }
  }
};
</script>

<style scoped>

/* Style général de la salle de mémoires */
.room {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #ffecd2, #fcb69f);
}

/* Positionnement du bouton retour */
.retoure {
  width: 45%;
}

/* Conteneur principal des filtres + swiper */
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

/* Largeur d’un bouton générique (si utilisé) */
.bouton {
  width: 60px;
}
</style>
