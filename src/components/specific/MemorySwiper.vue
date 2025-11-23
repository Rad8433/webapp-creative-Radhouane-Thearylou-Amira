<template>
  <div class="container">
    <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :spaceBetween="-40"
      :coverflowEffect="{ rotate: 50, stretch: 0, depth: 60, modifier: 1, slideShadows: false }" :pagination="false"
      :modules="modules" class="mySwiper" :breakpoints="{
        0: { spaceBetween: -15, coverflowEffect: { rotate: 20, depth: 30 } },
        480: { spaceBetween: -25, coverflowEffect: { rotate: 35, depth: 45 } },
        768: { spaceBetween: -40, coverflowEffect: { rotate: 50, depth: 60 } },
        1024: { spaceBetween: -60, coverflowEffect: { rotate: 60, depth: 80 } }
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
      this.$router.push({
        name: 'Modal',
        params: { id: this.roomId, memoryId: memory.id }, // ✅ pass memoryId
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
        filtered = filtered.filter(memory => memory.title.toLowerCase().includes(q));
      }

      if (this.filters.tag && this.filters.tag !== 'all') {
        filtered = filtered.filter(memory =>
          Array.isArray(memory.tags)
            ? memory.tags.includes(this.filters.tag)
            : String(memory.tags).includes(this.filters.tag)
        );
      }

      if (this.filters.date === 'recent') filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      else if (this.filters.date === 'old') filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

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
  padding: 50px 0;
  margin: auto;
  overflow-x: hidden;
}

.container {
  border: 1.5px solid rgba(255, 255, 255, 0.171);
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: min(80vw, 300px);
}

@media (max-width: 1024px) and (min-width: 768px) {
  .container {
    max-width: 700px;
  }

  .swiper-slide {
    width: 35vw;
  }
}

@media (max-width: 768px) {
  .container {
    max-width: 90vw;
    padding-right: 2em;
    margin: 0 auto;
    border: none;
  }

  .swiper-slide {
    width: 85vw;
  }
}
</style>
