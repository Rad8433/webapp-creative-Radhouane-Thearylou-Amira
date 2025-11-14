<template>
  <main class="home">
    <section class="hero">
      <div class="hero-frame">

        <!-- Header component -->
        <AppHeader />

        <!-- Main content: text left, cards right -->
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
import AppHeader from "@/components/common/AppHeader.vue";

export default {
  name: "HomeView",
  components: { BaseButton, AppHeader },
  methods: {
    startExperience() {
      this.$router.push({ name: 'MuseumRooms' });
    },
  },
};
</script>
<style scoped>
/* Apply Playfair Display to hero text */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&display=swap');

.home {
  background: #111;
}

.hero {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.hero-frame {
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url("@/assets/hero-bg.png");
  background-size: cover;
  background-position: center;
}

.hero-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 80%;
  width: 100%;
  place-items: center;
}

.hero-text {
  max-width: 42%;
  color: #fff;
}

.hero-small,
.hero-title {
  font-family: "Playfair Display", serif;
}

.hero-small {
  margin: 0 0 0.2rem;
  font-size: 1.7rem;
}

.hero-title {
  margin: 0 0 1.6rem;
  font-size: 3.8rem;
  line-height: 1.05;
}

.hero-title span {
  text-decoration: underline;
}

.hero-cards {
  display: flex;
  gap: 1.2rem;
  align-items: flex-end;
  padding-right: 0.5rem;
}

.hero-card {
  width: 200px;
  height: 400px;
  border-radius: 26px;
  background-size: cover;
  background-position: center;
}

.hero-card:nth-child(2) {
  transform: translateY(30px);
}

.card1 { background-image: url("@/assets/card1.png"); }
.card2 { background-image: url("@/assets/card2.png"); }
.card3 { background-image: url("@/assets/card3.png"); }

@media (max-width: 900px) {
  .hero-frame {
    width: calc(100% - 2rem);
  }

  .hero-content {
    display: flex;
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