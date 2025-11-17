<template>
  <div class="gird">
    <div class="rooms-grid">
      <MuseumCard v-for="room in filteredRooms" :key="room.id" :room="room" @click="goToRoom(room.id)" />
    </div>
  </div>
</template>

<script>
import MuseumCard from "./MuseumCard.vue";
import roomsData from '@/data/museumrooms.json';

export default {
  name: "MuseumGrid",
  components: { MuseumCard },
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
     rooms: roomsData.rooms,
    };
  },

  computed: {
    filteredRooms() {
      let result = [...this.rooms];

      const search = this.filters.search?.trim().toLowerCase();
      const roomFilter = this.filters.room;
      const tagFilter = this.filters.tag;
      const sort = this.filters.sort;

      if (roomFilter && roomFilter !== "all") {
        result = result.filter((r) => r.id === roomFilter);
      }
      if (tagFilter && tagFilter !== "all") {
        result = result.filter((r) => r.tag === tagFilter);
      }
      if (search) {
        result = result.filter((r) =>
          r.name.toLowerCase().includes(search)
        );
      }
      if (sort === "asc") {
        result = result.sort(
          (a, b) => (a.memoriesCount || 0) - (b.memoriesCount || 0)
        );
      } else if (sort === "desc") {
        result = result.sort(
          (a, b) => (b.memoriesCount || 0) - (a.memoriesCount || 0)
        );
      }

      return result;
    },
  },

  methods: {
    goToRoom(roomId) {
      this.$router.push({
        name: "Room",
        params: { id: roomId },
      });
    },
  },
};
</script>

<style>
.gird {
  background: rgba(0, 0, 255, 0);
  padding: 3rem;
  width: 100%;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  justify-items: center;
}
</style>
