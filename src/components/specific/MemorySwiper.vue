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
import data from '@/data/memoires.json';
import { useMemoryStore } from '@/stores/useMemoryStore';

export default {
  name: 'MemorySwiper',
  components: { Swiper, SwiperSlide, MemoryCard },
  props: {
    filters: {
      type: Object,
      default: () => ({ search: '', tag: 'all', date: '', sort: '' })
    },
  },
  data() {
    return {
      modules: [EffectCoverflow, Pagination],
    
      roomId: null,
      room: null,
      memories: data.memoires.map((souvenir, index) => ({
        id: index,
        roomId: souvenir.roomId, // normalize to number
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
  created() {
    // Convert roomId from URL to number
    this.roomId = this.$route.params.id;

  },
  computed: {
    filteredMemories() {
      let filtered = this.memories;
    
      // Filter by roomId
      if (this.roomId !== null) {
        filtered = filtered.filter(memory => memory.roomId === this.roomId);
      }


      // Filter by search
      if (this.filters.search) {
        filtered = filtered.filter(memory =>
          memory.title.toLowerCase().includes(this.filters.search.toLowerCase())
        );
      }

      // Filter by tag
      if (this.filters.tag && this.filters.tag !== 'all') {
        filtered = filtered.filter(memory =>
          memory.tags.includes(this.filters.tag)
        );
      }

      // Sort by date
      if (this.filters.date === 'recent') {
        filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (this.filters.date === 'old') {
        filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      // Sort by memoryNumber
      if (this.filters.sort === 'asc') {
        filtered = filtered.sort((a, b) => a.memoryNumber.localeCompare(b.memoryNumber));
      } else if (this.filters.sort === 'desc') {
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
  width: 300px;
}
</style>
