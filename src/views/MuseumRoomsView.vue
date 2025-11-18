<template>
  <main class="museum-rooms">
    <div class="global">
      <BaseButton variant="quatrieme" @click="goBack">
        <- 
      </BaseButton>
      <!-- En-tête avec titre personnalisé -->
      <AppHeader variantHeader="titleBlack">
        <template #title >
          Choissiez votre destination
        </template>
        
      </AppHeader>

      <!-- Barre de filtres : recherche, salle, tag, tri -->
      <OptionBar v-model:search="filters.search" v-model:room="filters.room" v-model:tag="filters.tag"
        v-model:sort="filters.sort" :room-options="roomOptions" :tag-options="tagOptions" :showDate="false" />

      <!-- Zone où les salles filtrées sont affichées -->
      <section class="cards-placeholder">
        <MuseumGrid :filters="filters" />
      </section>

      <!-- Pied de page -->
      <AppFooter />
    </div>
  </main>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";
import MuseumGrid from "@/components/specific/MuseumGrid.vue";
import OptionBar from "@/components/layout/OptionBar.vue";
import BaseButton from "@/components/common/BaseButton.vue";

export default {
  name: "MuseumRoomsView",
  components: {
    AppHeader,
    AppFooter,
    MuseumGrid,
    OptionBar,
    BaseButton,
  },
  data() {
    return {
      // Valeurs des filtres contrôlées par la barre OptionBar
      filters: {
        search: "",
        room: "all",
        tag: "all",
        sort: "asc",  // Tri par défaut (ascendant)
      },

      // Liste des salles disponibles dans le filtre
      roomOptions: [
        { value: "room-1", label: "Vacances et évasions" },
        { value: "room-2", label: "Aventures" },
        { value: "room-3", label: "Explorations urbaines" },
        { value: "room-4", label: "Moments drôles" },
        { value: "room-5", label: "Gastronomies" },
        { value: "room-6", label: "Destinations de rêves" },
      ],

      // Liste des tags disponibles dans le filtre
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
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style >
/* Change la couleur de l’icône dans l’en-tête */

/* Conteneur principal centré et avec marges internes */
.global {
  display: flex;
  flex-direction: column;
  width: 70vw;
  padding: 2rem 3rem;
  box-sizing: border-box;
  font-family: Georgia, serif;
  color: #3a3a3a;
}

/* Style général de la vue des salles du musée */
.museum-rooms {
  background-color: #f0e9de;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Zone où la grille peut s'étendre */
.cards-placeholder {
  flex-grow: 1;
}
</style>
