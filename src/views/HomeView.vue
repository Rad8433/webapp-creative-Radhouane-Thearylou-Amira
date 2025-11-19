<template>
  <main class="home">
      <div class="hero-frame">
        <div class="header">
        <!-- Affiche le composant d’en-tête du site -->
        <AppHeader variantHeader="titleWhite" visibleCog="cogDisplay">
          <template #title >
          Musée
        </template>
        </AppHeader>
        </div>

        <!-- Contenu principal : texte à gauche et cartes à droite -->
        <div class="hero-content">
          <div class="hero-text">
            <!-- Petit texte d’introduction -->
           <h1 class="hero-title">Vos voyages <br> <span>en mémoires</span></h1>
            <!-- Titre principal de la page -->
          

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
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/hero-bg.png");
  background-size: cover;
  background-position: center;
}


.header{


}
/* Conteneur principal avec l’image de fond */
.hero-frame {
  position: relative;
  height: 100%;
  width: 70vw;

}

/* Mise en page du contenu texte + cartes */
.hero-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
 
  height: 80%;
  width: 100%;
  align-items: center;
  justify-items: start;
}


/* Bloc du texte à gauche */
.hero-text {
  max-width: 65%;
  width: 100%;
  color: #fff;
}

/* Applique la police au petit texte et au titre */

.hero-title {
  font-family: "Playfair Display", serif;
}


/* Style du titre principal */
.hero-title {
  margin: 0 0 1.6rem;
  font-size: 3rem;
  width: 100%;
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
  
}

/* Style de base pour chaque carte */
.hero-card {
  width: 200px;
  aspect-ratio: 1/2;
  background-size: cover;
  background-position: 45% 50%;

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




/* ================================
   Desktop Medium (1200px)
   ================================= */
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


/* ================================
   Tablet (992px)
   ================================= */
@media (max-width: 992px) {
  .header,
  .hero-content {
    padding: 0 5em;
  }

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


/* ================================
   Tablet Vertical (768px)
   ================================= */
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


/* ================================
   Mobile Large (600px)
   ================================= */
@media (max-width: 600px) {

  /* Enleve les cartes */
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


  .hero-text button,
  .hero-text .base-button,
  .hero-text .btn {
    padding: 1rem 2.2rem;
    font-size: 1.2rem;
    border-radius: 10px;
  }
}


/* ================================
   Mobile Small (450px)
   ================================= */
@media (max-width: 450px) {

  .hero-title {
    font-size: 2.4rem;
  }

  .hero-text {
    max-width: 100%;
  }

  .hero-content {
    padding: 0 1.5em;
  }
}

</style>
