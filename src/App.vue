<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <h1>Musée Mémoire</h1>
      <p>Projet temporaire – structure du site en cours.</p>

      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/about">À propos</RouterLink>
      </nav>
    </div>
  </header>

  <main class="content">
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  text-align: center;
  margin-top: 2rem;
}

.logo {
  display: block;
  margin: 0 auto 1rem;
}

.wrapper h1 {
  font-size: 2rem;
  margin: 0.25rem 0;
}

.wrapper p {
  font-size: 0.95rem;
  opacity: 0.8;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin-top: 1.5rem;
}

nav a {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: none;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  text-decoration: underline;
}

.content {
  margin-top: 2rem;
  text-align: center;
  font-size: 1.2rem;
  opacity: 0.7;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
