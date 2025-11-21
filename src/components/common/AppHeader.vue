<template>

  <header class="app-header">
    <section :class="sectionGrid">
      <div class="retour" :class="visibleBouton">
        <BaseButton variant="quatrieme" @click="goBackHome">
          <- </BaseButton>
      </div>
      <!-- Le titre du header -->
      <h1 class="headerTitle" :class="[justifySelf, variantHeader]">
          {{ title }}
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
    visibleBouton: {
      type: String,
      default: "",
    },
    endroit: {
      type: String,
      default: "",
    },
    sectionGrid: {
      type: String,
      default: "",
    },
    justifySelf: {
      type: String,
      default: "",
    },
    btnBackDestination: {
      type: Function,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    goBackHome() {
      this.$router.push({ name: this.endroit });
      console.log("retour accueil");
    },
    goBackRoom() {
      this.$router.push({ name: 'endroit' });
    },
  }
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

/* Mise en page générale du header */
.app-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

section {
  display: grid;
  padding: 1rem 0 1em 0;
  width: 100%;
}

.sectionHome {
  grid-template-columns: 1fr 1fr;
}
 
.sectionMuseum {
  grid-template-columns: 1fr 1fr 1fr;
}
 
.sectionRoom {
  grid-template-columns: 0.01fr 1fr;
}
 
/* Style du titre */
.headerTitle {
  font-family: "Georgia", serif;
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
</style>
