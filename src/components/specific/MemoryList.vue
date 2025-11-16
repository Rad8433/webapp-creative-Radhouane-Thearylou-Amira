<template>
  <swiper
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }"
    :pagination="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(card, index) in cards" :key="index">
      <memorycard :card="card" />
    </swiper-slide>
  </swiper>
</template>

<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/effect-coverflow';
  import 'swiper/css/pagination';
  // Import required modules
  import { EffectCoverflow, Pagination } from 'swiper/modules';
  // Import your memorycard component
  import MemoryCard from './MemoryCard.vue';

  export default {
    components: {
      Swiper,
      SwiperSlide,
      MemoryCard, // Add MemoryCard component here
    },
    data() {
      return {
        modules: [EffectCoverflow, Pagination],
        cards: [
          { title: 'Card 1', description: 'Description for card 1' },
          { title: 'Card 2', description: 'Description for card 2' },
          { title: 'Card 3', description: 'Description for card 3' },
          // Add more cards here
        ],
      };
    },
  };
</script>

<style scoped>
.swiper {
  width: 50%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}
</style>
