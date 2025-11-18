<template>
  <header class="app-header">
    <!-- Le titre du header -->
    <h1 class="headerTitle" :class="variantHeader">
      <slot name="title">
        <!-- Si aucun slot n’est fourni, on affiche le titre du prop -->
        {{ title }}
      </slot>
    </h1>

    <!-- Zone à droite du header (icône, bouton, etc.) -->
    <div class="headerEngrenage">
      <!-- Le slot permet au parent de remplacer ce contenu -->
      <slot name="right">
        <!-- Contenu par défaut : bouton avec une icône engrenage -->
      </slot>
    </div>
  </header>
</template>

<script>
import BaseButton from "@/components/common/BaseButton.vue";

export default {
  name: "AppHeader",
  components: { BaseButton },

  // Le titre peut être personnalisé via une prop
  props: {
    title: {
      type: String,
      default: "Musée",
    },
    variantHeader: {
      type: String,
      default: "Musée",
    },
  },
};
</script>

<style scoped>
/* Mise en page générale du header */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.8rem 0.9rem;
}

/* Style du titre */
.headerTitle {
  font-family: "Georgia", serif;
  font-size: 2rem;

}

.one {
  color: #000000;
}

.two {
  color: #ffffff;
}

/* Taille de l’icône engrenage si une image est utilisée */
.headerEngrenage img {
  width: 32px;
  height: 32px;
}
</style>
