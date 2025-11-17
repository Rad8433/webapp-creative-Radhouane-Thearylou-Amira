<template>
  <div class="room">
    <div class="retoure">
      <BaseButton variant="quatrieme" @click="goBack">
        <- 
      </BaseButton>
    </div>
    <div class="memory-room"> 
      <OptionBar v-model:search="filters.search" v-model:date="filters.date" v-model:tag="filters.tag" :tag-options="tagOptions" :showRoom="false" :showSort="false" />
      <MemorySwiper :filters="filters" />
    </div>
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
      filters: {
        search: "",
        tag: "all",
        date: "all",  
      },
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
    goBack() {
      this.$router.push({ name: 'MuseumRooms'});

    },
    ajout() {
      this.$router.push({ name: 'Modal', params: { id: this.$route.params.id } });
    }
  }
};
</script>

<style scoped>
  .room{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(135deg, #ffecd2, #fcb69f);
  }

  .retoure {
    width: 45%;
  }

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

  .bouton {
      width: 60px;
  }

</style>
  