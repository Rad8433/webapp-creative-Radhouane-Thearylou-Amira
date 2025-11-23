<template>
  <section>
    <div class="form">
      <div class="formContenus">
        <BaseButton variant="cinquieme" @click="goBack"> <- </BaseButton>
        <h1>Détails de la mémoire</h1>

        <div class="form-group titre">
          <label>Titre</label>
          <p class="readonly">{{ memory.title }}</p>
        </div>

        <div class="image-upload">
          <img v-if="memory.image" :src="memory.image" class="preview-image" />
          <div v-else class="image-circle readonly">
            <span class="plus">+</span>
            <span class="text">Pas d'image</span>
          </div>
        </div>

        <div class="dateTags">
          <div class="form-group date">
            <label>Date</label>
            <p class="readonly">{{ memory.date }}</p>
          </div>

          <div class="form-group tags">
            <label>Tags</label>
            <p class="readonly">{{ memory.tags?.join(", ") }}</p>
          </div>
        </div>

        <div class="form-group description">
          <label>Courte description</label>
          <p class="readonly">{{ memory.caption }}</p>
        </div>

        <div class="form-group legende">
          <label>Légende</label>
          <p class="readonly">{{ memory.description }}</p>
        </div>

        <div class="form-group">
          <label>Numéro de mémoire</label>
          <p class="readonly">{{ memory.memoryNumber }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseButton from '../common/BaseButton.vue';
import { useMemoryStore } from '../../stores/useMemoryStore.js';

export default {
  name: "MemoryDetail",
  components: { BaseButton },
  computed: {
    memoryStore() {
      return useMemoryStore();
    },
    memory() {
      const id = this.$route.params.memoryId;
      return this.memoryStore.memories.find(m => m.id === id) || {};
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Room', params: { id: this.$route.params.id } });
    },
  }
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.form {
  background: rgb(43, 148, 143);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 15px 25px;
  border-radius: 15px;
  width: fit-content;
  max-width: 90%;
  box-sizing: border-box;
}

.formContenus h1 {
  font-size: 1.6em;
  margin-bottom: 15px;
}

.form-group {
  margin-top: 15px;
  font-size: 0.95em;
  width: 100%;
}

label {
  font-size: 0.85em;
  margin-bottom: 3px;
  display: block;
}

.readonly {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 6px;
  border-radius: 4px;
  min-height: 3vh;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 0.9em;
}

.image-upload {
  display: flex;
  justify-content: center;
  margin: 15px 0;
  width: 100%;
}

.image-circle {
  width: 100%;
  height: 12vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f3f3f3;
  color: black;
  font-size: 16px;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.dateTags {
  display: flex;
  gap: 10px;
  width: 100%;
}

.description,
.legende {
  min-height: auto;
  margin-bottom: 10px;
}

@media (max-width: 650px) {
  .form {
    padding: 15px 10px;
  }

  .image-circle {
    height: 18vh;
  }
}
</style>
