<template>
  <main class="museum-rooms">
    <div class="global">
        <div class="header">
      <!-- En-tête avec titre personnalisé -->
      <AppHeader variantHeader="titleBlack" section sectionGrid="sectionMuseum" visibleCog="cogDisplay" endroit="home" title="Choissiez votre destination">
      </AppHeader>
    </div>
      <div class="filtre">
      <!-- Barre de filtres : recherche, salle, tri -->
      <OptionBar variant="dark" v-model:search="filters.search" v-model:room="filters.room"
        v-model:sort="filters.sort" :room-options="roomOptions" :showDate="false" />
      </div>
      <!-- Zone où les salles filtrées sont affichées -->
   
        <MuseumGrid :filters="filters" />
   

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

    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped>


/* Conteneur principal centré et avec marges internes */
.global {
  display: flex;
  flex-direction: column;
  width: 70vw;
  padding: 1.5rem 0 0 0;
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
.header{
 width: 100%;
}
.backButton{
  padding-top:1em;
  padding-left: 3em;
}
.filtre {
  display: flex;
  justify-content: flex-start; 
  flex-wrap: wrap; 
  gap: 1rem; 
  width: 100%;
 
}
.filtre > * {
  flex: 1 1 auto;
  max-width: 100%;
}


/* ================================
   Desktop (1200px - 1399px)
   ================================= */
@media (min-width: 1200px) and (max-width: 1399px) {
 

  .filtre {
  
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: -1rem;
  }
  .filtre > * {
  flex: 1 1 5000px; /* items shrink and wrap nicely */
}
}

/* ================================
   Desktop Medium (992px - 1199px)
   ================================= */
@media (min-width: 992px) and (max-width: 1199px) {

  .backButton {
    padding-left: 3em;
  }


}

/* ================================
   Tablet (≤992px)
   ================================= */
@media (max-width: 992px) {


  .backButton {
    padding-left: 2.5em;
    padding-top: 0.8em;
  }

 
  
}

/* ================================
   Tablet Vertical / Large Mobile (≤768px)
   ================================= */
@media (max-width: 768px) {

  .backButton {
    padding-left: 2em;
    padding-top: 0.5em;
    align-self: flex-start;
  }



}

/* ================================
   Mobile (≤0px)
   ================================= */
@media (max-width: 590px) {


  .backButton {
    padding-left: 2em;
    padding-top: 0.5em;
  
  }

 



}
</style>
