<template>
  <div class="gird">
    <div class="rooms-grid">
      <MuseumCard v-for="room in filteredRooms" :key="room.id" :room="room" @click="goToRoom(room.id)" />
    </div>
  </div>
</template>

<script>
import MuseumCard from "./MuseumCard.vue";

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
      rooms: [
        {
          id: "room-1",
          url: "/src/assets/img-destination/evasions.jpg",
          name: "Vacances et évasions",
          description:
            "Soleil, plages, escapades reposantes et petits moments de pause loin du quotidien.",
          tag: "#vacances",
          memoriesCount: 3,
        },
        {
          id: "room-2",
          url: "/src/assets/img-destination/aventures.jpg",
          name: "Aventures",
          description:
            "Randonnées, défis, imprévus et adrénaline pour les voyageurs en quête d’action.",
          tag: "#aventure",
          memoriesCount: 3,
        },
        {
          id: "room-3",
          url: "/src/assets/img-destination/explorations_urbaines.jpg",
          name: "Explorations urbaines",
          description:
            "Ruelles cachées, architecture, graffitis et vie nocturne des grandes villes.",
          tag: "#urbain",
          memoriesCount: 3,
        },
        {
          id: "room-4",
          url: "/src/assets/img-destination/moments_droles.jpg",
          name: "Moments drôles",
          description:
            "Gaffes, quiproquos et souvenirs gênants qui finissent en fous rires.",
          tag: "#humour",
          memoriesCount: 3,
        },
        {
          id: "room-5",
          url: "/src/assets/img-destination/gastronomies.jpg",
          name: "Gastronomies",
          description:
            "Plats typiques, marchés locaux et découvertes culinaires aux quatre coins du monde.",
          tag: "#food",
          memoriesCount: 3,
        },
        {
          id: "room-6",
          url: "/src/assets/img-destination/reves.jpg",
          name: "Destinations de rêves",
          description:
            "Lieux mythiques, paysages irréels et voyages qu’on garde sur sa bucket list.",
          tag: "#rêve",
          memoriesCount: 3,
        },
      ],
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
