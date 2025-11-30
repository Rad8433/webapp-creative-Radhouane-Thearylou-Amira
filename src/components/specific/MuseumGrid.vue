<template>
  <div class="grid">
    <div class="rooms-grid">
      <MuseumCard
        v-for="room in filteredRooms"
        :key="room.id"
        :room="room"
        @click="() => goToRoom(room.id)"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMemoryStore } from '@/stores/useMemoryStore';
import MuseumCard from './MuseumCard.vue';
import roomsData from '@/data/museumrooms.json';

export default {
  name: 'MemoryGrid',
  components: { MuseumCard },

  props: {
    filters: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const memoryStore = useMemoryStore();
    const rooms = roomsData.rooms;

    const goToRoom = (roomId) => {
      router.push({ name: 'Room', params: { id: roomId } });
    };

    const filteredRooms = computed(() => {
      let result = [...rooms];

      const search = props.filters.search?.trim().toLowerCase();
      const roomFilter = props.filters.room;
      const tagFilter = props.filters.tag;
      const sort = props.filters.sort;

      // Add memoriesCount from memoryStore
      result = result.map((r) => ({
        ...r,
        memoriesCount: memoryStore.memories.filter(
          (m) => m.roomId === r.id
        ).length,
      }));

      // Filter by room
      if (roomFilter && roomFilter !== 'all') {
        result = result.filter((r) => r.id === roomFilter);
      }

      // Filter by tag
      if (tagFilter && tagFilter !== 'all') {
        result = result.filter((r) => r.tag === tagFilter);
      }

      // Search by name
      if (search) {
        result = result.filter((r) => r.name.toLowerCase().includes(search));
      }

      // Sort by memoriesCount
      if (sort === 'asc') {
        result.sort((a, b) => (a.memoriesCount || 0) - (b.memoriesCount || 0));
      } else if (sort === 'desc') {
        result.sort((a, b) => (b.memoriesCount || 0) - (a.memoriesCount || 0));
      }

      return result;
    });

    return { filteredRooms, goToRoom };
  },
};
</script>

<style>
/* Conteneur global de la grille */
.grid {
  background: rgba(0, 0, 255, 0);
  padding: 3em 0 5em 0 ;

  width: 100%;
}

/* Grille responsive pour les cartes */
.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

}



/* ================================
   Between 993px and 1183px → 2 columns
   ================================= */
@media (min-width: 993px) and (max-width: 1319px) {
  .rooms-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
   
  }
}

/* ================================
   Tablet (992px)
   ================================= */
@media (max-width: 992px) {
  .rooms-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    
  }
}

/* ================================
   Petit Tablet / Large Mobile (768px)
   ================================= */
@media (max-width: 768px) {
  .rooms-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.2rem;

  }
}

/* ================================
   Mobile (600px)
   ================================= */
@media (max-width: 600px) {
  .rooms-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
   
  }
}
</style>