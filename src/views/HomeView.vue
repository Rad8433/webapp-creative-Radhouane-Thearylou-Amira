<template>
  <main class="home">
    <section class="hero">
      <div class="hero-frame">

        <!-- Affiche le composant d’en-tête du site -->
        <AppHeader variantHeader="titleWhite" visibleCog="cogDisplay">
          <template #title >
          Salles du Musée
        </template>
        </AppHeader>
        

        <!-- Contenu principal : texte à gauche et cartes à droite -->
        <div class="hero-content">
          <div class="hero-text">
            <!-- Petit texte d’introduction -->
            <p class="hero-small">Vos voyages en</p>

            <!-- Titre principal de la page -->
            <h1 class="hero-title"><span>mémoires</span></h1>

            <!-- Bouton pour commencer l’expérience -->
            <BaseButton variant="primary" @click="startExperience">
              Commencer
            </BaseButton>
          </div>

          <!-- Groupe de cartes visuelles dans le héros -->
          <div class="hero-cards">
            <div class="hero-card card1"></div>
            <div class="hero-card card2"></div>
            <div class="hero-card card3"></div>
          </div>
        </div>

      </div>
    </section>
  </main>
</template>

<script>
import BaseButton from "@/components/common/BaseButton.vue";
import AppHeader from "@/components/common/AppHeader.vue";

export default {
  name: "HomeView",
  components: { BaseButton, AppHeader },

  methods: {
    // Fonction déclenchée au clic pour changer de page
    startExperience() {
      this.$router.push({ name: 'MuseumRooms' });
    },
  },
};
</script>

<style scoped>
/* Importation de la police Playfair Display */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&display=swap');

/* Style général de la section d’accueil */
.home {
  background: #111;
}

/* Section principale centrée verticalement */
.hero {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

/* Conteneur principal avec l’image de fond */
.hero-frame {
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url("@/assets/hero-bg.png");
  background-size: cover;
  background-position: center;
}

/* Mise en page du contenu texte + cartes */
.hero-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 80%;
  width: 100%;
  place-items: center;
}

/* Bloc du texte à gauche */
.hero-text {
  max-width: 42%;
  color: #fff;
}

/* Applique la police au petit texte et au titre */
.hero-small,
.hero-title {
  font-family: "Playfair Display", serif;
}

/* Style du petit texte */
.hero-small {
  margin: 0 0 0.2rem;
  font-size: 1.7rem;
}

/* Style du titre principal */
.hero-title {
  margin: 0 0 1.6rem;
  font-size: 3.8rem;
  line-height: 1.05;
}

/* Souligne le mot à l’intérieur du titre */
.hero-title span {
  text-decoration: underline;
}

/* Conteneur des cartes à droite */
.hero-cards {
  display: flex;
  gap: 1.2rem;
  align-items: flex-end;
  padding-right: 0.5rem;
}

/* Style de base pour chaque carte */
.hero-card {
  width: 200px;
  height: 400px;
  border-radius: 26px;
  background-size: cover;
  background-position: center;
}

/* Décale légèrement la carte du milieu */
.hero-card:nth-child(2) {
  transform: translateY(30px);
}

/* Images des trois cartes */
.card1 {
  background-image: url("@/assets/card1.png");
}

.card2 {
  background-image: url("@/assets/card2.png");
}

.card3 {
  background-image: url("@/assets/card3.png");
}

/* Adaptation pour tablettes */
@media (max-width: 900px) {

  /* Réduit légèrement la largeur du cadre */
  .hero-frame {
    width: calc(100% - 2rem);
  }

  /* Passe en layout vertical */
  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
  }

  /* Centre les cartes en mode mobile/tablette */
  .hero-cards {
    align-self: center;
  }
}

/* Adaptation pour mobiles */
@media (max-width: 600px) {

  /* Réduit la taille du titre */
  .hero-title {
    font-size: 2.6rem;
  }

  /* Réduit la taille du sous-texte */
  .hero-small {
    font-size: 1.4rem;
  }

  /* Réduit la taille des cartes */
  .hero-card {
    width: 120px;
    height: 230px;
  }
}
</style>
