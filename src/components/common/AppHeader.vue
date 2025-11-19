<template>

  <header class="app-header">
    <section>
      <!-- Le titre du header -->
      <h1 class="headerTitle" :class="variantHeader">
        <slot name="title">
          <!-- Si aucun slot n’est fourni, on affiche le titre du prop -->
          {{ title }}
        </slot>
      </h1>

      <!-- Zone à droite du header (icône, bouton, etc.) -->
      <div class="headerEngrenage" :class="visibleCog">
        <BaseButton variant="cogPrimary" engrenage="cogVisible"></BaseButton>
      </div>
    </section>
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
    visibleCog: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.cogDisplay {
  display: block;
  width: 32px;
  height: 32px;
}

.cogDisplayN {
  display: none;
}

/* Mise en page générale du header */
.app-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.8rem 0.9rem;
  width: 95%;
}

/* Style du titre */
.headerTitle {
  font-family: "Georgia", serif;
  font-size: 2rem;
}

.titleBlack {
  color: #000000;
}

.titleWhite {
  color: #ffffff;
}
</style>
