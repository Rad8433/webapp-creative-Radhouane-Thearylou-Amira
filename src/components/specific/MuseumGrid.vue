<template>
  <div class="gird">
    <div class="rooms-grid">
      <!-- ⚠️ on boucle maintenant sur filteredRooms -->
      <MuseumCard v-for="room in filteredRooms" :key="room.id" :room="room" @click="goToRoom(room.id)" />
    </div>
  </div>
</template>

<script>
import MuseumCard from "./MuseumCard.vue";

export default {
  name: "MuseumGrid",
  components: { MuseumCard },

  // 👇 on reçoit les filtres depuis MuseumRoomsView
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
        },
        {
          id: "room-2",
          url: "/src/assets/img-destination/aventures.jpg",
          name: "Aventures",
          description:
            "Randonnées, défis, imprévus et adrénaline pour les voyageurs en quête d’action.",
          tag: "#aventure", // ✅ aligné avec l’OptionBar
        },
        {
          id: "room-3",
          url: "/src/assets/img-destination/explorations_urbaines.jpg",
          name: "Explorations urbaines",
          description:
            "Ruelles cachées, architecture, graffitis et vie nocturne des grandes villes.",
          tag: "#urbain",
        },
        {
          id: "room-4",
          url: "/src/assets/img-destination/moments_droles.jpg",
          name: "Moments drôles",
          description:
            "Gaffes, quiproquos et souvenirs gênants qui finissent en fous rires.",
          tag: "#humour",
        },
        {
          id: "room-5",
          url: "/src/assets/img-destination/gastronomies.jpg",
          name: "Gastronomies",
          description:
            "Plats typiques, marchés locaux et découvertes culinaires aux quatre coins du monde.",
          tag: "#food",
        },
        {
          id: "room-6",
          url: "/src/assets/img-destination/reves.jpg",
          name: "Destinations de rêves",
          description:
            "Lieux mythiques, paysages irréels et voyages qu’on garde sur sa bucket list.",
          tag: "#rêve",
        },
      ],
    };
  },

  computed: {
    // 💡 c'est ici que la magie des filtres se fait
    filteredRooms() {
      let result = this.rooms;

      const search = this.filters.search?.trim().toLowerCase();
      const roomFilter = this.filters.room;
      const tagFilter = this.filters.tag;

      // Filtre "Toutes les salles"
      if (roomFilter && roomFilter !== "all") {
        result = result.filter((r) => r.id === roomFilter);
      }

      // Filtre "Tous les tags"
      if (tagFilter && tagFilter !== "all") {
        result = result.filter((r) => r.tag === tagFilter);
      }

      // Filtre "Recherche"
      if (search) {
        result = result.filter((r) =>
          r.name.toLowerCase().includes(search)
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
