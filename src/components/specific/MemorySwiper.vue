<template>
  <div>
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
    >
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
import data from '@/data/data.json';

export default {
  name: 'MemorySwiper',
  components: { Swiper, SwiperSlide, MemoryCard },
  props: {
    filters: Object,  // Receive filters from parent
  },
  data() {
    return {
      modules: [EffectCoverflow, Pagination],
      memories: data.souvenirsDeVoyage.map((souvenir, index) => ({
        title: souvenir.titreSouvenir,
        image: souvenir.imageSouvenir,
        caption: souvenir.descriptionSouvenir,
        date: souvenir.dateSouvenir,
        tags: souvenir.tagsSouvenir.join(', '),
        memoryNumber: `Memory ${index + 1}`,
        bgColor: '#e0e0e0'
      }))
    };
  },
  computed: {
    filteredMemories() {
      let filtered = this.memories;

      // Filter by search
      if (this.filters.search) {
        filtered = filtered.filter(memory =>
          memory.title.toLowerCase().includes(this.filters.search.toLowerCase())
        );
      }

      // Filter by tag
      if (this.filters.tag !== "all") {
        filtered = filtered.filter(memory =>
          memory.tags.includes(this.filters.tag)
        );
      }

      // Filter by date (Assuming `date` is a string like "recent", "old", etc.)
      if (this.filters.date === "recent") {
        filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (this.filters.date === "old") {
        filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      // Sort by memory number (if necessary, or any other criteria)
      if (this.filters.sort === "asc") {
        filtered = filtered.sort((a, b) => a.memoryNumber.localeCompare(b.memoryNumber));
      } else if (this.filters.sort === "desc") {
        filtered = filtered.sort((a, b) => b.memoryNumber.localeCompare(a.memoryNumber));
      }

      return filtered;
    }
  }
};
</script>

<style scoped>
.mySwiper {
  width: 100%;
  padding: 50px 0;
  margin: auto;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;

  /* Important: match image behavior from demo */
  width: 300px; /* adjust if needed */
}
</style>
