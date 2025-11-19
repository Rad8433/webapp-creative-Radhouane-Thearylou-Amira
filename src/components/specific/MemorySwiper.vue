<template>
  <div class="container">
    <!-- Composant Swiper (carrousel) -->
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :spaceBetween="-40"

      
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 60,
        modifier: 1,
        slideShadows: false
      }"

      :pagination="false"
      :modules="modules"
      class="mySwiper"

      
      :breakpoints="{
        0: {
          spaceBetween: -15,
          coverflowEffect: { rotate: 20, depth: 30 }
        },
        480: {
          spaceBetween: -25,
          coverflowEffect: { rotate: 35, depth: 45 }
        },
        768: {
          spaceBetween: -40,
          coverflowEffect: { rotate: 50, depth: 60 }
        },
        1024: {
          spaceBetween: -60,
          coverflowEffect: { rotate: 60, depth: 80 }
        }
      }"
    >
      <!-- Une carte MemoryCard par mémoire filtrée -->
      <swiper-slide v-for="(card, index) in filteredMemories" :key="index">
        <MemoryCard v-bind="card" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import MemoryCard from './MemoryCard.vue';
import data from '@/data/memoires.json';
import { useMemoryStore } from '@/stores/useMemoryStore';

export default {
  name: 'MemorySwiper',
  components: { Swiper, SwiperSlide, MemoryCard },

  // Reçoit les filtres depuis la page Room
  props: {
    filters: {
      type: Object,
      default: () => ({ search: '', tag: 'all', date: '', sort: '' })
    },
  },

  data() {
    return {
      // Modules nécessaires pour le Swiper
      modules: [EffectCoverflow, Pagination],

      // ID de la salle (prise depuis l’URL)
      roomId: null,

      // Mémoires chargées depuis le JSON + transformées
      memories: data.memoires.map((souvenir, index) => ({
        id: index,
        roomId: souvenir.roomId,                  // Id de salle
        title: souvenir.titreSouvenir,            // Titre
        image: souvenir.imageSouvenir,            // Image
        caption: souvenir.descriptionSouvenir,    // Description
        date: souvenir.dateSouvenir,              // Date texte
        tags: souvenir.tagsSouvenir.join(', '),   // Tags concaténés
        memoryNumber: `Memory ${index + 1}`,      // Numéro visible
        bgColor: '#e0e0e0'                        // Couleur de fond
      }))
    };
  },

  created() {
    // Récupère l'ID de la salle depuis l'URL
    this.roomId = this.$route.params.id;
  },

  computed: {
    // Fonction qui renvoie les mémoires filtrées selon les filtres choisis
    filteredMemories() {
      let filtered = this.memories;

      /* --- FILTER BY ROOM --- */
      if (this.roomId !== null) {
        filtered = filtered.filter(memory => memory.roomId === this.roomId);
      }

      /* --- FILTER SEARCH --- */
      if (this.filters.search) {
        filtered = filtered.filter(memory =>
          memory.title.toLowerCase().includes(this.filters.search.toLowerCase())
        );
      }

      /* --- FILTER TAGS --- */
      if (this.filters.tag && this.filters.tag !== 'all') {
        filtered = filtered.filter(memory =>
          memory.tags.includes(this.filters.tag)
        );
      }

      /* --- SORT BY DATE --- */
      if (this.filters.date === 'recent') {
        filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      else if (this.filters.date === 'old') {
        filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      /* --- SORT BY MEMORY NUMBER (asc/desc) --- */
      if (this.filters.sort === 'asc') {
        filtered = filtered.sort((a, b) => a.memoryNumber.localeCompare(b.memoryNumber));
      }
      else if (this.filters.sort === 'desc') {
        filtered = filtered.sort((a, b) => b.memoryNumber.localeCompare(a.memoryNumber));
      }

      return filtered;
    }
  }
};
</script>

<style scoped>
/* Style du swiper */
.mySwiper {
  width: 100%;
  padding: 50px 0;
  margin: auto;
  overflow-x: hidden;
}

.container{
  border: 1.5px solid rgba(255, 255, 255, 0.171);
}

/* Style des slides individuelles */
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;


  width: min(80vw, 300px);
}


@media (max-width: 1024px) and (min-width: 768px) {

.container {
  max-width: 700px; /* Tablet container */
}

.swiper-slide {
  width: 35vw; /* 1.5 cards visible */
}
}

@media (max-width: 768px) {


.container {
  max-width: 90vw;       
  margin: 0 auto;
}


.swiper-slide {
  width: 85vw  
}
}
</style>
