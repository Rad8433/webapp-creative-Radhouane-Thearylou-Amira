<template>
  <main class="museum-rooms">
    <header class="header">
      <h1>
        Choisissez votre <em>destination</em>
      </h1>
      <button class="settings-btn" aria-label="Paramètres">
        <img src="@/assets/cog.svg" alt="Paramètres" />
      </button>
    </header>

    <!-- Placeholder for cards grid -->
    <section class="cards-placeholder">
      <!-- Cards component will go here -->
    </section>

    <footer class="footer">
      <p>Fait par l'équipe voyageur® 2025</p>
    </footer>
  </main>
</template>

<script>
export default {
  name: "MuseumRoomsView",
};
</script>

<style scoped>
.museum-rooms {
  background-color: #f0e9de; /* beige background */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  box-sizing: border-box;
  font-family: Georgia, serif;
  color: #3a3a3a;
}

/* Header with title and settings icon */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: normal;
  text-decoration: underline;
  text-underline-offset: 0.3rem;
  font-style: normal;
  color: #1f1f1f;
  user-select: none;
}

.header h1 em {
  font-style: italic;
  font-weight: 600;
}

/* Settings button with cog icon */
.settings-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.settings-btn img {
  width: 32px;
  height: 32px;
  filter: invert(20%) sepia(0%) saturate(0%) hue-rotate(0deg)
    brightness(90%) contrast(85%);
  transition: filter 0.3s ease;
}

.settings-btn:hover img {
  filter: invert(50%) sepia(100%) saturate(500%) hue-rotate(30deg)
    brightness(100%) contrast(100%);
}

/* Placeholder section for the cards grid */
.cards-placeholder {
  flex-grow: 1;
  /* This is where you'll place the grid of cards later */
}

/* Footer style */
.footer {
  border-top: 1px solid #ccc;
  text-align: center;
  padding: 1rem 0;
  font-size: 0.9rem;
  color: #7a7a7a;
  user-select: none;
}
</style>
