<template>
  <main class="memory-room" :style="{ background: roomBackground }">
    <div class="room">
      <!-- Header -->
      <div class="retour">
        <AppHeader 
          variantHeader="titleWhite" 
          sect 
          endroit="MuseumRooms" 
          sectionGrid="sectionRoom"
          visibleCog="cogDisplayN" 
          visibleBouton="cogDisplay" 
          :title="roomTitle"
        />
      </div>

      <!-- Filters -->
      <div class="filtre">
        <OptionBar 
          variant="light"
          :search="memoryStore.filters.search"
          :tag="memoryStore.filters.tag || 'all'"
          :date="memoryStore.filters.date || 'all'"
          @update:search="memoryStore.setSearch"
          @update:tag="memoryStore.setTag"
          @update:date="memoryStore.setDateOrder"
          :tag-options="tagOptions"
          :showRoom="false"
          :showSort="false"
        />
      </div>

      <!-- Memory cards -->
      <div class="carte">
        <MemorySwiper :room-id="$route.params.id" />
      </div>

      <!-- Add memory button -->
      <BaseButton variant="troisieme" @click="ajout">+</BaseButton>
    </div>
  </main>
</template>

<script>
import BaseButton from '@/components/common/BaseButton.vue';
import MemorySwiper from '@/components/specific/MemorySwiper.vue';
import OptionBar from "@/components/layout/OptionBar.vue";
import AppHeader from "@/components/common/AppHeader.vue";
import { useMemoryStore } from '@/stores/useMemoryStore';

const roomsConfig = {
  "room-1": { title: "Vacances et évasions", bg: "url('/src/assets/bg-rooms/bg1.png') center/cover no-repeat" },
  "room-2": { title: "Aventures", bg: "url('/src/assets/bg-rooms/bg2.png') center/cover no-repeat" },
  "room-3": { title: "Explorations urbaines", bg: "url('/src/assets/bg-rooms/bg3.png') center/cover no-repeat" },
  "room-4": { title: "Moments drôles", bg: "url('/src/assets/bg-rooms/bg4.png') center/cover no-repeat" },
  "room-5": { title: "Gastronomies", bg: "url('/src/assets/bg-rooms/bg5.png') center/cover no-repeat" },
  "room-6": { title: "Destinations de rêves", bg: "url('/src/assets/bg-rooms/bg6.png') center/cover no-repeat" },
};

export default {
  name: 'MemoryRoom',
  components: { MemorySwiper, BaseButton, OptionBar, AppHeader },

  setup() {
    const memoryStore = useMemoryStore();
    return { memoryStore };
  },

  data() {
    return {
      tagOptions: [
        { value: "#plage", label: "#plage" },
        { value: "#montagne", label: "#montagne" },
        { value: "#culture", label: "#culture" },
        { value: "#nature", label: "#nature" },
        { value: "#nuit", label: "#nuit" },
        { value: "#famille", label: "#famille" },
        { value: "#amis", label: "#amis" },
        { value: "#exploration", label: "#exploration" },
      ]
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
    ajout() {
      this.$router.push({ name: 'Modal', params: { id: this.$route.params.id } });
    }
  }
};
</script>
<style scoped>
h1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.room {
  min-width: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0 0 0;
  width: 100%;
  box-sizing: border-box;


}

.retour {

  width: 70vw;

}

.filtre {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  width: 70vw;
  margin-bottom: -1rem;

}

.filtre>* {
  flex: 1 1 auto;
  max-width: 100%;
}

.memory-room {
  min-height: 100vh;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
  box-sizing: border-box;
}

.room-title {
  width: 100%;
  font-size: 2rem;
  margin: 0 0 0.8rem 0;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  text-align: left;
}

.carte {
  width: 100%;
  height: 100%;

}
</style>
