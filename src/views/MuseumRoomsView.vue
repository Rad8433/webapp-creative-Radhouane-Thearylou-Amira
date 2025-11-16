<template>
  <main class="museum-rooms">
    <!-- Reusable header with customized title -->
    <div class="global">
      <MemoryForm />
    <AppHeader>
      <template #title>
        Salles du Musée
      </template>
    </AppHeader>

    <!-- Placeholder for cards grid -->
    <section class="cards-placeholder">
      <!-- Cards component will go here <MuseumCard />-->
      
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
  </main>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";
//import MuseumCard from '@/components/specific/MuseumCard.vue';
import MemoryForm from '@/components/specific/MemoryForm.vue';

export default {
  name: "MuseumRoomsView",
  components: {
    AppHeader,
    AppFooter,
    //MuseumCard,
    MemoryForm,
  },
};
</script>

<style scoped>
/* Using ::v-deep to target the child component's scoped class */
::v-deep .app-header__title {
  color: black;  /* Change title text color */
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
