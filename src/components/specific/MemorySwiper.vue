<template>
  <div class="container">
    <!-- Composant Swiper pour afficher les mémoires en mode carrousel -->
    <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :spaceBetween="50"
      :coverflowEffect="{ rotate: 10, stretch: 0, depth: 100, modifier: 1, slideShadows: false }" :pagination="false"
      :modules="modules" class="mySwiper" :breakpoints="{
        0: { slidesPerView: 1, spaceBetween: 10, coverflowEffect: { rotate: 5, depth: 50 } },
        480: { slidesPerView: 1, spaceBetween: 15, coverflowEffect: { rotate: 7, depth: 70 } },
        768: { slidesPerView: 2, spaceBetween: 30, coverflowEffect: { rotate: 10, depth: 80 } },
        1024: { slidesPerView: 2, spaceBetween: 50, coverflowEffect: { rotate: 12, depth: 100 } },
        1224: { slidesPerView: 3, spaceBetween: 50, coverflowEffect: { rotate: 12, depth: 100 } }
      }">
      <swiper-slide v-for="memory in filteredMemories" :key="memory.id"> <!-- Carte mémoire individuelle -->
        <MemoryCard v-bind="memory" @click="() => detail(memory)" /> <!-- Détail de la mémoire au clic -->
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import MemoryCard from "./MemoryCard.vue";
import { useMemoryStore } from "@/stores/useMemoryStore";

export default {
  name: "MemorySwiper", // Nom du composant
  components: { Swiper, SwiperSlide, MemoryCard }, // Composants utilisés

  props: {
    roomId: { // ID de la salle pour filtrer les mémoires
      type: String,
      required: true,
    },
  },

  data() {
    return { // Données du composant
      modules: [EffectCoverflow, Pagination],
      memoryStore: useMemoryStore(),
    };
  },

  computed: {
    filteredMemories() { // Mémoires filtrées par salle
      return this.memoryStore.filteredMemoriesByRoom(this.roomId);
    },
  },

  methods: {
    // Navigue vers le détail de la mémoire
    detail(memory) {
      this.$router.push({
        name: "Modal",
        params: { id: this.roomId, memoryId: memory.id },
      });
    },
  },
};
</script>
<style scoped>
/* Styles spécifiques au composant MemorySwiper */
.mySwiper {
  width: 100%;
  padding: 60px 0;
}

.container {
  width: 100%;
  margin: auto;
}
/* Style des slides du Swiper */
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transform: scale(0.9);
  transition: transform 0.3s ease;
}
/* Slide actif agrandi */
.swiper-slide-active {
  transform: translate3d(0, 0, 0) !important;
}
</style>
