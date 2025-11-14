<template>
  <main class="museum-rooms">
    <!-- Reusable header with customized title -->
    <AppHeader>
      <template #title>
        Salles du Musée
      </template>
    </AppHeader>

    <!-- Placeholder for cards grid -->
    <section class="cards-placeholder">
      <!-- Cards component will go here -->
    </section>

    <!-- Footer -->
    <AppFooter />
  </main>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";

export default {
  name: "MuseumRoomsView",
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style scoped>
/* Using ::v-deep to target the child component's scoped class */
::v-deep .app-header__title {
  color: black;  /* Change title text color */
}

.museum-rooms {
  background-color: #f0e9de;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  box-sizing: border-box;
  font-family: Georgia, serif;
  color: #3a3a3a;
}

.cards-placeholder {
  flex-grow: 1;
}
</style>
