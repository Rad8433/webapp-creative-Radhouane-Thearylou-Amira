<template>
  <header class="app-header">
    <section :class="sectionGrid">
      <!-- Bouton retour à gauche -->
      <div class="retour" :class="visibleBouton">
        <BaseButton variant="quatrieme" @click="goBackHome">
          <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
              fill="#fff" />
          </svg>
        </BaseButton>
      </div>

      <!-- Titre au centre ou à gauche selon les classes -->
      <h1 class="headerTitle" :class="[justifySelf, variantHeader]">
        {{ title }}
      </h1>

      <!-- Bouton engrenage à droite -->
      <div class="headerEngrenage" :class="visibleCog">
        <BaseButton variant="cogPrimary" engrenage="cogVisible" />
      </div>
    </section>
  </header>
</template>

<script>
import BaseButton from "@/components/common/BaseButton.vue";

export default {
  name: "AppHeader",
  components: { BaseButton },

  props: {
    title: {
      type: String,
      default: "Musée",
    },
    variantHeader: {
      type: String,
      default: "", // ex: "titleWhite" ou "titleBlack"
    },
    visibleBouton: {
      type: String,
      default: "", // ex: "cogDisplay" ou "cogDisplayN"
    },
    visibleCog: {
      type: String,
      default: "", // ex: "cogDisplay" ou "cogDisplayN"
    },
    endroit: {
      type: String,
      default: "", // route de destination pour le back
    },
    sectionGrid: {
      type: String,
      default: "", // ex: "sectionHome", "sectionMuseum", "sectionRoom"
    },
    justifySelf: {
      type: String,
      default: "", // ex: "titleLeft"
    },
    btnBackDestination: {
      type: Function,
    },
  },

  methods: {
    goBackHome() {
      this.$router.push({ name: this.endroit });
      console.log("retour", this.endroit);
    },
    goBackRoom() {
      this.$router.push({ name: "endroit" });
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

.headerEngrenage {
  justify-self: flex-end;
}

.cogDisplayN {
  display: none;
}

/* Wrapper général du header */
.app-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grille de l’en-tête */
section {
  display: grid;
  padding: 1rem 0 1em 0;
  width: 100%;
}

/* Layout pour la home */
.sectionHome {
  grid-template-columns: 1fr 1fr;
}

/* Layout avec 3 colonnes (retour / titre / engrenage) */
.sectionMuseum {
  grid-template-columns: 1fr 8fr 1fr;
}

/* Layout pour room (si tu veux plus compact) */
.sectionRoom {
  grid-template-columns: 0.01fr 1fr 1fr;
}

/* Titre de base */
.headerTitle {
  font-size: 2rem;
  justify-self: center;
}

.titleMuseum {
  font-size: 2rem;
  justify-self: center;
}

.titleLeft {
  justify-self: start;
}

.retour {
  justify-self: start;
}

.titleBlack {
  color: #000000;
}

.titleWhite {
  color: #ffffff;
}

/* Mobile */
@media (max-width: 700px) {
  .titleBlack {
    font-size: 1.7rem;
    justify-self: flex-end;
    grid-row: 2;
    grid-column: 2;
    white-space: nowrap;
  }

  .sectionMuseum {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 2fr;
  }

  .headerEngrenage {
    grid-column: 3;
    margin-right: 10px;
  }
}

@media (max-width: 475px) {
  .titleBlack {
    font-size: 1.4rem;
    justify-self: flex-end;
  }

  .sectionRoom {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
