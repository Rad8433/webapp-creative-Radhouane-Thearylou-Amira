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
      <swiper-slide v-for="(card, index) in memories" :key="index">
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
