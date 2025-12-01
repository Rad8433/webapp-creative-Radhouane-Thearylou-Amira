<template>
  <!-- Conteneur principal avec le fond -->
  <main class="home">

    <!-- Cadre qui contient le header et le reste du héros -->
    <div class="hero-frame">

      <div class="header">
        <!-- Affiche composante header-->
        <AppHeader variantHeader="titleWhite" justifySelf="titleLeft" sectionGrid="sectionHome" visibleCog="cogDisplay"
          visibleBouton="cogDisplayN">
          <!-- Titre personnalisé via slot -->
          <template #title>
            Musée
          </template>
        </AppHeader>
      </div>

      <!-- Contenu principal du héros -->
      <div class="hero-content">

        <!-- Texte à gauche -->
        <div class="hero-text">
          <h1 class="hero-title">
            Vos voyages <br>
            <span>en mémoires</span>
          </h1>

          <!-- Bouton qui amène à la liste des salles -->
          <BaseButton variant="primary" @click="startExperience">
            Commencer
          </BaseButton>
        </div>

        <!-- Cartes décoratives à droite -->
        <div class="hero-cards">
          <div class="hero-card card1"></div>
          <div class="hero-card card2"></div>
          <div class="hero-card card3"></div>
        </div>

      </div>
    </div>

  </main>
</template>

<script>
import BaseButton from "@/components/common/BaseButton.vue";
import AppHeader from "@/components/common/AppHeader.vue";

export default {
  name: "HomeView", // Nom de la view

  components: { BaseButton, AppHeader }, // Composants utilisés

  methods: {
    // Redirige vers la page des salles
    startExperience() {
      this.$router.push({ name: "MuseumRooms" });
    },
  },
};
</script>

<style scoped>
/* Conteneur principal centré et avec marges internes */
.home {
  background: #111;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/hero-bg.png");
  background-size: cover;
  background-position: center;
}


/* Cadre qui contient le header et le reste du héros */
.hero-frame {
  position: relative;
  height: 100%;
  width: 70vw;
}

/* Contenu principal du héros */
.hero-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 80%;
  width: 100%;
  align-items: center;
  justify-items: start;
}

/* Texte à gauche */
.hero-text {
  max-width: 65%;
  width: 100%;
  color: #fff;
}

/* Titre principal */
.hero-title {
  margin: 0 0 1.6rem;
  font-size: 3rem;
  width: 100%;
  line-height: 1.05;
}

/* Souligne le mot "mémoires" */
.hero-title span {
  text-decoration: underline;
}

/* Cartes décoratives à droite */
.hero-cards {
  display: flex;
  gap: 1.2rem;
  align-items: flex-end;
}

/* Style des cartes */
.hero-card {
  width: 200px;
  aspect-ratio: 1/2;
  background-size: cover;
  background-position: 45% 50%;
}

/* Décalage des cartes pour effet superposé */
.hero-card:nth-child(2) {
  transform: translateY(30px);
}

/* Images des cartes */
.card1 {
  background-image: url("@/assets/card1.png");
}

.card2 {
  background-image: url("@/assets/card2.png");
}

.card3 {
  background-image: url("@/assets/card3.png");
}

/* Responsive 1200px */
@media (max-width: 1200px) {

  .header,
  .hero-content {
    padding: 0 8em;
  }

  .hero-title {
    font-size: 2.6rem;
  }

  .hero-card {
    width: 160px;
  }
}

/* Responsive 992px */
@media (max-width: 992px) {

  .header,
  .hero-content {
    padding: 0 5em;
  }

  /* Passe le layout en une colonne */
  .hero-content {
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    text-align: center;
  }

  .hero-text {
    max-width: 80%;
  }

  .hero-title {
    font-size: 2.4rem;
  }

  .hero-cards {
    justify-content: center;
  }
}

/* Responsive 768px */
@media (max-width: 768px) {

  .header,
  .hero-content {
    padding: 0 3em;
  }

  .hero-title {
    font-size: 2.3rem;
  }

  .hero-card {
    width: 140px;
  }
}

/* Responsive 600px */
@media (max-width: 600px) {

  /* Enlève les cartes */
  .hero-cards {
    display: none;
  }

  .header,
  .hero-content {
    padding: 0 2em;
  }

  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
    align-items: center;
    gap: 2.5rem;
  }

  .hero-title {
    font-size: 2.8rem;
    line-height: 1.15;
  }

  .hero-text {
    max-width: 100%;
  }

  /* Style du bouton sur mobile */
  .hero-text .base-button {
    padding: 1rem 2.2rem;
    font-size: 1.2rem;
    border-radius: 10px;
  }
}

/* Responsive 450px */
@media (max-width: 450px) {
  .hero-title {
    font-size: 2.4rem;
  }

  .hero-content {
    padding: 0 1.5em;
  }
}
</style>
