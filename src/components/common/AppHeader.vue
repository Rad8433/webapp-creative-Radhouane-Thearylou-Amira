<template>
  <header class="app-header">
    <section :class="sectionGrid">
      <!-- Bouton retour à gauche -->
      <div class="retour" :class="visibleBouton">
        <BaseButton variant="quatrieme" @click="goBackHome">
          <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Fleche du retoure en arriere d'une page.">
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

      <!--Bouton engrenage à droite, visible en fonction du prop visibleCog.-->
      <div class="headerEngrenage" :class="visibleCog">
        <!--Appel du composant bouton pour l’engrenage du stockage local.-->
        <BaseButton variant="cogPrimary" engrenage="cogVisible" @click="confirmDelete" />
      </div>
    </section>
  </header>
</template>

<script>
// Importation du composant BaseButton pour les boutons utilisés dans l’en-tête.
import BaseButton from "@/components/common/BaseButton.vue";
// Appel du composant bouton pour l’engrenage du stockage local.
export default {
  name: "AppHeader",
  components: { BaseButton },

  props: {
    title: {
      type: String,
      default: "Musée",// Controle du texte du titre affiché dans l’en-tête
    },
    variantHeader: {
      type: String,
      default: "", // Controle de la variante du style du titre
    },
    visibleBouton: {
      type: String,
      default: "", // Contrôle de la visibilité du bouton de retour
    },
    visibleCog: {
      type: String,
      default: "", // Contrôle de la visibilité de l’engrenage
    },
    endroit: {
      type: String,
      default: "", // Contrôle sur l’emplacement de retour du bouton Back.
    },
    sectionGrid: {
      type: String,
      default: "", // Contrôle de la disposition de la grille de l’en-tête.
    },
    justifySelf: {
      type: String,
      default: "", // Contrôle de l’alignement du titre dans l’en-tête.
    },
  },

  methods: {
    goBackHome() { // Méthode pour gérer le retour à une page spécifique en utilisant la props endroit.
      this.$router.push({ name: this.endroit });
    },
    confirmDelete() {
    if (confirm("Voulez-vous vraiment supprimer toutes les données ?")) {
      localStorage.clear();
      alert("Toutes les données ont été supprimées !");
      // Reload app if needed
      location.reload();
    }
  }
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

/* Layout avec 2 colonnes (retour / titre) */
.sectionHome {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Layout avec 3 colonnes (retour / titre / engrenage) */
.sectionMuseum {
  grid-template-columns: 1fr 8fr 1fr;
}

/* Layout pour room (si tu veux plus compact) */
.sectionRoom {
  grid-template-columns: 0.04fr 1fr 1fr;
}

/* Titre de base */
.headerTitle {
  font-size: 2rem;
  justify-self: center;
  font-weight: 500;
  white-space: nowrap;
}

/* Titre aligné à gauche dans le props justifySelf*/
.titleLeft {
  font-size: 3rem;
  justify-self: start;

}

/* Bouton retoure aligné à gauche dans sa classe.*/
.retour {
  justify-self: start;
}

/* Variantes de couleur du titre dans le props variant.*/
.titleBlack {
  color: #000000;
}

/* Variantes de couleur du titre dans le props variant.*/
.titleWhite {
  color: #ffffff;
}

/* Tablette */
@media (max-width: 700px) {

  .titleBlack {
    font-size: 1.7rem;
    white-space: nowrap;
  }

  .sectionMuseum {
   grid-template-columns: 1fr 1fr 1fr;
   grid-template-rows: 1fr 1fr;
  }

  .headerEngrenage {
    grid-column: 3;
    margin-right: 10px;
  }

  .headerTitle {
    width: 100%;
    grid-row: 3;
    grid-column: 2;
  }

  /* Mobile */
@media (min-width:400px) and (max-width: 450px) {
  .headerTitle {
    font-size: 1.5rem;
  }
}

@media (max-width:399px) {
  .headerTitle {
    font-size: 1.35rem;
  }
}

}

</style>
