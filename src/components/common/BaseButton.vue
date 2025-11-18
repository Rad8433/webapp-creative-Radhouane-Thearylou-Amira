<template>
  <!-- Bouton de base : applique une classe selon le variant et émet l’événement "click" -->
  <button class="base-button" :class="variant" @click="$emit('click')">
    <!-- Le contenu du bouton vient du slot -->
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",

  // Le bouton accepte une prop "variant" pour changer son style
  props: {
    variant: {
      type: String,
      default: "primary", // style par défaut
    }
  }
};
</script>

<style scoped>
/* Style général appliqué à tous les boutons */
.base-button {
  border: none;
  cursor: pointer;
  transition: 0.25s ease;
  font-family: inherit;
  font-size: 1rem;
}

/* --- BOUTON PRIMARY (ex: "Commencer") --- */
.primary {
  background: #000;
  color: #fff;
  padding: 0.9rem 2.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
}

.primary:hover {
  background: #ffffff;
  color: #000;
}

/* --- BOUTON SECONDARY (ex: bouton envoyer dans un formulaire) --- */
.secondary {
  background: #0F4C81;
  color: #fff;
  width: 100%;
  padding: 0.9rem 2.2rem;
  border-radius: 8px;
  font-size: 1.6rem;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
}

.secondary:hover {
  background: #a6d5ff;
  color: #000;
}

/* --- BOUTON TROISIÈME (ex: ajouter une mémoire) --- */
.troisieme {
  background: #0bac76;
  color: #fff;
  width: 90px;
  padding: 0.9rem 2.2rem;
  border-radius: 8px;
  font-size: 1.6rem;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
}

.troisieme:hover {
  background: #4de4b1;
  color: #000;
}

/* --- BOUTON QUATRIÈME (ex: bouton retour) --- */
.quatrieme {
  background: #e48e5c;
  color: #fff;
  width: 70px;
  padding: 0.6rem 0rem;
  border-radius: 8px;
  font-size: 1.5rem;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
}

.quatrieme:hover {
  background: #ffe6bf;
  color: #000;
}

/* --- BOUTON ICÔNE (ex: engrenage dans AppHeader) --- */
.icon {
  background: rgba(0, 0, 0, 0);
  padding: 0.45rem;
  border-radius: 999px;
  /* forme ronde */
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon:hover {
  background: rgba(0, 0, 0, 0.7);
}

/* Taille de l’image dans un bouton icône */
.icon img {
  width: 24px;
  height: 24px;
}
</style>
