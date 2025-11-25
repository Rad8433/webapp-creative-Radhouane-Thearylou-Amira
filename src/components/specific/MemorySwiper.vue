<template>
  <div class="container">
    <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :spaceBetween="-200"
      :coverflowEffect="{ rotate: 10, stretch: 0, depth: 100, modifier: 1, slideShadows: false }" :pagination="false"
      :modules="modules" class="mySwiper" :breakpoints="{
        0: { slidesPerView: 1, spaceBetween: -10, coverflowEffect: { rotate: 5, depth: 50 } },
        480: { slidesPerView: 1, spaceBetween: -15, coverflowEffect: { rotate: 7, depth: 70 } },
        768: { slidesPerView: 2, spaceBetween: -50, coverflowEffect: { rotate: 10, depth: 100 } },
        1024: { slidesPerView: 2, spaceBetween: -100, coverflowEffect: { rotate: 12, depth: 120 } },
        1224: { slidesPerView: 3, spaceBetween: -200, coverflowEffect: { rotate: 12, depth: 120 } }
      }">
      <swiper-slide v-for="(card, index) in filteredMemories" :key="index">
        <MemoryCard v-bind="card" @click="() => detail(card)" />
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
import { useMemoryStore } from '@/stores/useMemoryStore';

export default {
  name: 'MemorySwiper',
  components: { Swiper, SwiperSlide, MemoryCard },

  props: {
    filters: {
      type: Object,
      default: () => ({ search: '', tag: 'all', date: '', sort: '' }),
    },
  },

  data() {
    return {
      modules: [EffectCoverflow, Pagination],
      roomId: null,
      memoryStore: useMemoryStore(),
    };
  },

  created() {
    this.roomId = this.$route.params.id;
  },

  methods: {
    detail(memory) {
      console.log("probleme")
      this.$router.push({
        name: 'Modal',
        params: { id: this.roomId, memoryId: memory.id },
      });
    },
  },

  computed: {
    roomMemories() {
      return this.memoryStore.memoriesByRoom(this.roomId);
    },

    filteredMemories() {
      let filtered = [...this.roomMemories];

      if (this.filters.search) {
        const q = this.filters.search.toLowerCase();
        filtered = filtered.filter(memory =>
          memory.title.toLowerCase().includes(q)
        );
      }

      if (this.filters.tag && this.filters.tag !== 'all') {
        filtered = filtered.filter(memory =>
          Array.isArray(memory.tags)
            ? memory.tags.includes(this.filters.tag)
            : String(memory.tags).includes(this.filters.tag)
        );
      }

      if (this.filters.date === 'recent')
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      else if (this.filters.date === 'old')
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

      if (this.filters.sort === 'asc') {
        filtered.sort((a, b) => {
          const aNum = a.memoryNumber ?? `Memory ${a.id}`;
          const bNum = b.memoryNumber ?? `Memory ${b.id}`;
          return aNum.localeCompare(bNum);
        });
      } else if (this.filters.sort === 'desc') {
        filtered.sort((a, b) => {
          const aNum = a.memoryNumber ?? `Memory ${a.id}`;
          const bNum = b.memoryNumber ?? `Memory ${b.id}`;
          return bNum.localeCompare(aNum);
        });
      }

      return filtered;
    },
  },
};
</script>

<style scoped>
.mySwiper {
  width: 100%;
  padding: 60px 0;

}

.container {
  width: 100%;
  margin: auto;


}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transform: scale(0.90);

  transition: transform 0.3s ease;
}

.swiper-slide-active {
  transform: scale(1.05);

}
</style>
