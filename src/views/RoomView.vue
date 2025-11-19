<template>
  <div class="room" :style="{ background: roomBackground }">
    <div class="retoure">
      <BaseButton variant="quatrieme" @click="goBack">
        <- </BaseButton>
    </div>
 
    <div class="memory-room">
      <h1 class="room-title">
        {{ roomTitle }}
      </h1>
 
      <OptionBar v-model:search="filters.search" v-model:date="filters.date" v-model:tag="filters.tag"
        :tag-options="tagOptions" :showRoom="false" :showSort="false" />
 
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
 
const roomsConfig = {
  "room-1": {
    title: "Vacances et évasions",
    bg: "url('/src/assets/bg-rooms/bg1.png') center/cover no-repeat"
  },
  "room-2": {
    title: "Aventures",
    bg: "url('/src/assets/bg-rooms/bg2.png') center/cover no-repeat"
  },
  "room-3": {
    title: "Explorations urbaines",
    bg: "url('/src/assets/bg-rooms/bg3.png') center/cover no-repeat"
  },
  "room-4": {
    title: "Moments drôles",
    bg: "url('/src/assets/bg-rooms/bg4.png') center/cover no-repeat"
  },
  "room-5": {
    title: "Gastronomies",
    bg: "url('/src/assets/bg-rooms/bg5.png') center/cover no-repeat"
  },
  "room-6": {
    title: "Destinations de rêves",
    bg: "url('/src/assets/bg-rooms/bg6.png') center/cover no-repeat"
  },
};
 
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
 
  computed: {
    currentRoomConfig() {
      return roomsConfig[this.$route.params.id] || {};
    },
    roomBackground() {
      return this.currentRoomConfig.bg || "linear-gradient(135deg, #ffecd2, #fcb69f)";
    },
    roomTitle() {
      return this.currentRoomConfig.title || "Salle de mémoires";
    }
  },
 
  methods: {
    goBack() {
      this.$router.push({ name: 'MuseumRooms' });
    },
    ajout() {
      this.$router.push({ name: 'Modal', params: { id: this.$route.params.id } });
    }
  }
};
</script>
 
<style scoped>
.room {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
 
.room-title {
  width: 100%;
  font-size: 2rem;
  margin: 0 0 0.8rem 0;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  text-align: left;
}
 
.bouton {
  width: 60px;
}
</style>
 