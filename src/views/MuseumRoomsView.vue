<template>
  <main class="museum-rooms">

    <!-- Reusable header -->
    <AppHeader>
      <template #title>
        Choisissez votre <em>destination</em>
      </template>

      <template #right>
        <button class="settings-btn" aria-label="Paramètres">
          <img src="@/assets/cog.svg" alt="Paramètres" />
        </button>
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

/* Settings button (custom for this page) */
.settings-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.settings-btn img {
  width: 32px;
  height: 32px;
  filter: invert(20%);
  transition: filter 0.3s ease;
}

.settings-btn:hover img {
  filter: invert(50%) sepia(100%) saturate(500%) hue-rotate(30deg)
    brightness(100%) contrast(100%);
}

.cards-placeholder {
  flex-grow: 1;
}
</style>
