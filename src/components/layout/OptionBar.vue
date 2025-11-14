<template>
  <header class="topbar">
    <h1 class="logo">Maison Douceur</h1>

    <nav class="options">
      <a href="#">Accueil</a>
      <a href="#">Produits</a>
      <a href="#">À propos</a>
      <a href="#">Contact</a>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      msg: "Bonjour!"
    };
  }
};
</script>

<style>
/* Make the header full width even inside a centered page */
.topbar {
  background: #222;
  color: white;
  padding: 1rem 1.5rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  /* 🔥 Fix centering problem */
  width: 100vw; /* full viewport width */
  margin-left: calc(50% - 50vw); /* cancels body centering */

  position: relative;
}

/* Logo */
.logo {
  margin: 0;
  font-size: 1.3rem;
}

/* Navigation links */
.options {
  display: flex;
  gap: 1rem;
}

.options a {
  color: white;
  text-decoration: none;
  padding: 0.3rem 0.5rem;
  transition: 0.25s;
}

.options a:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
