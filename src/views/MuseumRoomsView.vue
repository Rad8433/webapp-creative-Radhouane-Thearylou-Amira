<template>
  <main class="museum-rooms">
    <div class="global">
      <AppHeader>
        <template #title>
          Salles du Musée
        </template>
      </AppHeader>

      <!-- BARRE DE FILTRES -->
      <OptionBar v-model:search="filters.search" v-model:room="filters.room" v-model:tag="filters.tag"
        v-model:sort="filters.sort" :room-options="roomOptions" :tag-options="tagOptions" />

      <!-- GRID DES SALLES (filtrée) -->
      <section class="cards-placeholder">
        <MuseumGrid :filters="filters" />
      </section>

      <AppFooter />
    </div>
  </main>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";
import MuseumGrid from "@/components/specific/MuseumGrid.vue";
import OptionBar from "@/components/layout/OptionBar.vue";

export default {
  name: "MuseumRoomsView",
  components: {
    AppHeader,
    AppFooter,
    MuseumGrid,
    OptionBar, // ✅ pas OptionBars
  },
  data() {
    return {
      filters: {
        search: "",
        room: "all",
        tag: "all",
        sort: "asc",
      },
      roomOptions: [
        { value: "room-1", label: "Vacances et évasions" },
        { value: "room-2", label: "Aventures" },
        { value: "room-3", label: "Explorations urbaines" },
        { value: "room-4", label: "Moments drôles" },
        { value: "room-5", label: "Gastronomies" },
        { value: "room-6", label: "Destinations de rêves" },
      ],

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
};
</script>

<style scoped>
::v-deep .app-header__right svg path {
  fill: black !important;
}

::v-deep .app-header__title {
  color: black;
}

.global {
  display: flex;
  flex-direction: column;
  width: 70vw;
  padding: 2rem 3rem;
  box-sizing: border-box;
  font-family: Georgia, serif;
  color: #3a3a3a;
}

.museum-rooms {
  background-color: #f0e9de;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cards-placeholder {
  flex-grow: 1;
}
</style>
