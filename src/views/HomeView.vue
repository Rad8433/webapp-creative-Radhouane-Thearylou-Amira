<template>
  <main class="home">
    <section class="hero">
      <div class="hero-frame">

        <!-- Ligne du haut : titre + engrenage -->
        <div class="hero-top">
          <span class="hero-musee">Musée</span>

          <BaseButton variant="icon" class="hero-cog-btn">
            <img src="@/assets/cog.svg" alt="Paramètres" class="hero-cog" />
          </BaseButton>
        </div>

        <!-- Zone principale : texte à gauche, cartes à droite -->
        <div class="hero-content">
          <div class="hero-text">
            <p class="hero-small">Vos voyages en</p>
            <h1 class="hero-title"><span>mémoires</span></h1>

            <BaseButton variant="primary" @click="startExperience">
              Commencer
            </BaseButton>
          </div>

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

export default {
  name: "HomeView",
  components: { BaseButton },
  methods: {
    // action future quand on clique sur “Commencer”
    startExperience() {
      console.log("Start clicked");
    },
  },
};
</script>

<style scoped>
/* Fond général de la page */
.home {
  background: #111;
  padding: 2rem 0 3rem;
}

/* Centrer le bloc principal */
.hero {
  display: flex;
  justify-content: center;
}

/* Cadre principal avec l’image du lac */
.hero-frame {
  position: relative;
  width: min(1180px, 100% - 3rem);
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  background-image: url("@/assets/hero-bg.png");
  background-size: cover;
  background-position: center;
}

/* Léger assombrissement sur la partie gauche */
.hero-frame::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.28),
    rgba(0, 0, 0, 0.06)
  );
  z-index: 0;
}

/* Bande supérieure avec texte + engrenage */
.hero-top {
  position: relative;
  z-index: 2;
  padding: 1rem 1.8rem 0.9rem;
  border-bottom: 2px dashed rgba(255, 255, 255, 0.65);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-musee {
  font-family: "Georgia", serif;
  font-size: 1.25rem;
  color: #fff;
  font-style: italic;
}

/* Bouton engrenage */
.hero-cog-btn {
  padding: 0.35rem;
}

.hero-cog {
  width: 32px;
  height: 32px;
}

/* Zone avec le texte et les cartes (remontée vers le centre) */
.hero-content {
  position: relative;
  z-index: 2;
  height: calc(100% - 64px);
  padding: 1.8rem 2.2rem 1.6rem; /* moins de padding en bas pour tout remonter */
  display: flex;
  justify-content: space-between;
  align-items: center; /* centre verticalement texte + cartes */
}

/* Texte à gauche */
.hero-text {
  max-width: 42%;
  color: #fff;
}

.hero-small {
  margin: 0 0 0.2rem;
  font-size: 1.7rem;
  font-family: "Georgia", serif;
}

.hero-title {
  margin: 0 0 1.6rem;
  font-size: 3.8rem;
  line-height: 1.05;
  font-family: "Georgia", serif;
}

.hero-title span {
  text-decoration: underline;
}

/* Cartes à droite */
.hero-cards {
  display: flex;
  gap: 1.2rem;
  align-items: flex-end;
  padding-right: 0.5rem;
}

/* Style général d'une carte */
.hero-card {
  width: 155px;
  height: 290px;
  border-radius: 26px;
  background-size: cover;
  background-position: center;
}

/* Effet Figma : carte centrale plus haute */
.hero-card:nth-child(2) {
  transform: translateY(-12px);
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

/* Responsive léger */
@media (max-width: 900px) {
  .hero-frame {
    width: calc(100% - 2rem);
  }

  .hero-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
  }

  .hero-cards {
    align-self: center;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2.6rem;
  }

  .hero-small {
    font-size: 1.4rem;
  }

  .hero-card {
    width: 120px;
    height: 230px;
  }
}
</style>
